"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import {
  Shield, Eye, Users, FileText, X, Lock,
  ExternalLink, Activity, Wifi, Radar, Server, Download,
  Clock, ShieldAlert, School, Phone, LogOut
} from "lucide-react";
import * as XLSX from "xlsx";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setIsAuthorized(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin_baseline_secure") {
      setIsAuthorized(true);
      localStorage.setItem("admin_auth", "true");
    } else {
      alert("UNAUTHORIZED ACCESS DETECTED: INCIDENT REPORTED TO S.S.R.");
    }
  };

  const exportToExcel = () => {
    if (registrations.length === 0) return;

    const dataToExport = registrations.map(reg => ({
      FullName: reg.name,
      Email: reg.email,
      College: reg.college,
      Semester: reg.semester,
      WhatsApp: reg.whatsapp,
      TransactionID: reg.upiTransactionId,
      PaymentURL: reg.paymentScreenshotURL,
      RegistrationDate: reg.timestamp?.toDate ? reg.timestamp.toDate().toLocaleString() : "N/A"
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TacticalManifest");

    // Aesthetic Column Widths
    const wscols = [
      { wch: 30 }, { wch: 30 }, { wch: 30 }, { wch: 15 },
      { wch: 20 }, { wch: 25 }, { wch: 50 }, { wch: 25 }
    ];
    worksheet['!cols'] = wscols;

    XLSX.writeFile(workbook, `Vibe_Coding_Manifest_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth === "true") setIsAuthorized(true);
  }, []);

  useEffect(() => {
    if (!isAuthorized) return;

    const q = query(collection(db, "registrations"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRegistrations(data);
        setLoading(false);
        setError(""); // Clear any previous errors
      },
      (err) => {
        console.error("Firestore Error:", err);
        if (err.code === 'permission-denied') {
          setError("ACCESS REJECTED BY SERVER: UPDATE FIRESTORE SECURITY RULES IN CONSOLE");
        } else {
          setError("UPLINK FAILED: " + err.message);
        }
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [isAuthorized]);

  if (!isAuthorized) {
    return (
      <div className="admin-login-view section-padding">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="hud-panel login-vault"
        >
          <div className="vault-scanner">
            <Radar className="glowing-text pulse" size={48} />
          </div>
          <h2 className="stark-font glowing-text">IDENTITY VERIFICATION</h2>
          <p className="stark-font" style={{ fontSize: '0.7rem', opacity: 0.5, letterSpacing: '2px', marginBottom: '30px' }}>
            SECURE ACCESS UPLINK REQUIRED
          </p>

          <form onSubmit={handleLogin} className="vault-form">
            <div className="stark-input-container">
              <input
                type="password"
                placeholder="PROXIMITY KEY"
                className="stark-input"
                style={{ textAlign: 'center', letterSpacing: '5px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="stark-btn primary stark-font" style={{ width: '100%' }}>
              GAIN ACCESS
            </button>
          </form>
        </motion.div>

        <style jsx>{`
          .admin-login-view {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .login-vault {
            width: 100%;
            max-width: 450px;
            padding: 60px 40px;
            text-align: center;
            background: rgba(139, 0, 0, 0.05);
          }
          .vault-scanner { margin-bottom: 25px; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-view">
      {/* Tactical Header */}
      <div className="tactical-header">
        <div className="content-width">
          <div className="header-status">
            <div className="status-item">
              <Activity size={14} className="glowing-text pulse" />
              <span className="stark-font">SYSTEM: <span className="glowing-text">ACTIVE</span></span>
            </div>
            <div className="status-item">
              <Wifi size={14} style={{ color: '#00ff00' }} />
              <span className="stark-font">UPLINK: <span style={{ color: '#00ff00' }}>STABLE</span></span>
            </div>
            <div className="status-item">
              <Server size={14} className="glowing-text" />
              <span className="stark-font">DB: <span className="glowing-text">LOCKED</span></span>
            </div>
          </div>

          <div className="header-title-complex">
            <h1 className="stark-font" style={{ fontSize: '2rem' }}>TACTICAL <span className="glowing-text">HQ</span></h1>

            <div className="header-actions">
              <button
                onClick={exportToExcel}
                className="stark-btn primary stark-font"
                style={{ fontSize: '0.75rem', padding: '12px 25px' }}
                disabled={registrations.length === 0}
              >
                <Download size={16} /> EXPORT MANIFEST
              </button>
              <button
                onClick={handleLogout}
                className="stark-btn stark-font"
                style={{ fontSize: '0.75rem', padding: '12px 25px', borderColor: '#ff3333', color: '#ff3333' }}
              >
                <LogOut size={16} /> TERMINATE
              </button>
              <div className="reg-counter hud-panel">
                <Users size={16} />
                <span className="stark-font" style={{ fontSize: '1.2rem' }}>{registrations.length}</span>
                <span className="stark-font" style={{ fontSize: '0.6rem', opacity: 0.5 }}>RECRUITS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-width tactical-feed section-padding">
        {loading ? (
          <div className="stark-font text-center pulse" style={{ padding: '100px', letterSpacing: '5px' }}>
            SCANNING FOR INTEL...
          </div>
        ) : error ? (
          <div className="hud-panel error-terminal">
            <div className="error-header stark-font">
              <ShieldAlert size={20} className="pulse" /> SECURITY_BREACH_DETECTED
            </div>
            <p className="stark-font">{error}</p>
            <div className="error-hint">
              HINT: NAVIGATE TO FIREBASE CONSOLE &gt; FIRESTORE &gt; RULES AND SET TO 'ALLOW READ, WRITE: IF TRUE;'
            </div>
          </div>
        ) : (
          <div className="tactical-container">
            <div className="table-header-intel stark-font desktop-only">
              <ShieldAlert size={14} className="glowing-text" />
              ENCRYPTION ACTIVE: DISPLAYING {registrations.length} NODE(S)
            </div>

            {/* Desktop Table View */}
            <div className="hud-panel tactical-table-container desktop-only">
              <table className="tactical-table">
                <thead>
                  <tr>
                    <th className="stark-font">OPERATIVE</th>
                    <th className="stark-font">ORIGIN</th>
                    <th className="stark-font">COMMUNICATION</th>
                    <th className="stark-font">TXN ID</th>
                    <th className="stark-font">DATETIME</th>
                    <th className="stark-font">EVIDENCE</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((reg) => (
                    <tr key={reg.id} className="tactical-row">
                      <td>
                        <div className="operative-info">
                          <div className="op-name stark-font">{reg.name}</div>
                          <div className="op-email">{reg.email}</div>
                        </div>
                      </td>
                      <td>
                        <div className="stark-font" style={{ fontSize: '0.8rem' }}>{reg.college}</div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>SEM: {reg.semester}</div>
                      </td>
                      <td>
                        <div className="stark-font" style={{ fontSize: '0.8rem' }}>{reg.whatsapp}</div>
                      </td>
                      <td>
                        <code className="txn-code hud-panel">{reg.upiTransactionId}</code>
                      </td>
                      <td>
                        <div className="timestamp-cell">
                          <Clock size={12} opacity={0.5} />
                          <span>{reg.timestamp?.toDate ? reg.timestamp.toDate().toLocaleDateString() : 'N/A'}</span>
                        </div>
                      </td>
                      <td>
                        <button
                          className="stark-btn stark-font"
                          style={{ padding: '8px 15px', fontSize: '0.65rem' }}
                          onClick={() => setSelectedImage(reg.paymentScreenshotURL)}
                        >
                          <Eye size={12} /> OPEN INTEL
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="mobile-only tactical-card-list">
              {registrations.map((reg) => (
                <div key={reg.id} className="hud-panel tactical-op-card">
                  <div className="op-card-header">
                    <div className="op-name-block">
                      <span className="stark-font op-name">{reg.name}</span>
                      <span className="op-email">{reg.email}</span>
                    </div>
                    <button
                      className="stark-btn primary"
                      style={{ padding: '10px' }}
                      onClick={() => setSelectedImage(reg.paymentScreenshotURL)}
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                  <div className="op-card-details">
                    <div className="detail-line">
                      <School size={12} /> <span>{reg.college} (SEM {reg.semester})</span>
                    </div>
                    <div className="detail-line">
                      <Phone size={12} /> <span className="glowing-text">{reg.whatsapp}</span>
                    </div>
                    <div className="detail-line">
                      <FileText size={12} /> <code className="txn-mini">{reg.upiTransactionId}</code>
                    </div>
                    <div className="detail-line">
                      <Clock size={12} /> <span>{reg.timestamp?.toDate ? reg.timestamp.toDate().toLocaleString() : 'N/A'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Intel Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="intel-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="hud-panel intel-container"
              initial={{ scale: 0.8, y: 50, rotateX: 20 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="intel-header">
                <h3 className="stark-font glowing-text">PAYMENT EVIDENCE</h3>
                <button onClick={() => setSelectedImage(null)} className="close-intel">
                  <X />
                </button>
              </div>
              <div className="intel-frame hud-panel">
                <img src={selectedImage} alt="Evidence" className="intel-image" />
                <div className="image-scan-bar"></div>
              </div>
              <div className="intel-actions">
                <a href={selectedImage} target="_blank" rel="noopener noreferrer" className="stark-btn stark-font" style={{ fontSize: '0.7rem' }}>
                  EXPAND IN NEW NODE <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .tactical-header {
          background: rgba(10, 10, 10, 0.9);
          border-bottom: 1px solid rgba(255, 0, 0, 0.2);
          padding-top: 100px;
          padding-bottom: 30px;
        }
        .header-status {
          display: flex;
          gap: 30px;
          margin-bottom: 20px;
        }
        .status-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.65rem;
        }
        .header-title-complex {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .table-header-intel {
          padding: 15px 20px;
          background: rgba(0, 255, 102, 0.03);
          font-size: 0.6rem;
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid rgba(0, 255, 102, 0.1);
        }
        .timestamp-cell {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          color: var(--silver);
        }
        .reg-counter {
          padding: 12px 25px;
          background: rgba(0, 255, 102, 0.05);
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .tactical-table-container {
          background: rgba(10, 10, 10, 0.6);
          overflow-x: auto;
        }
        .tactical-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 900px;
        }
        th {
          padding: 20px;
          text-align: left;
          font-size: 0.7rem;
          background: rgba(255, 0, 0, 0.05);
          color: var(--stark-red);
          border-bottom: 1px solid rgba(255, 0, 0, 0.2);
        }
        td {
          padding: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .tactical-row:hover {
          background: rgba(255, 0, 0, 0.03);
        }
        .op-name { font-size: 1rem; color: white; }
        .op-email { font-size: 0.75rem; color: var(--silver); }
        .txn-code {
          padding: 5px 10px;
          font-family: monospace;
          color: var(--stark-red);
          font-size: 0.8rem;
          background: rgba(0,0,0,0.4);
        }

        .intel-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          backdrop-filter: blur(10px);
        }
        .intel-container {
          width: 90%;
          max-width: 700px;
          padding: 40px;
          background: #0a0a0a;
          border-color: var(--stark-red);
        }
        .intel-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 25px;
        }
        .close-intel {
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
        }
        .intel-frame {
          position: relative;
          background: #000;
          padding: 10px;
          overflow: hidden;
        }
        .intel-image {
          width: 100%;
          max-height: 60vh;
          object-fit: contain;
        }
        .image-scan-bar {
          position: absolute;
          width: 100%;
          height: 2px;
          background: var(--stark-red);
          top: 0;
          left: 0;
          box-shadow: 0 0 10px var(--stark-red);
          animation: scan 4s linear infinite;
        }
        .error-terminal {
          background: rgba(255, 0, 0, 0.05);
          border: 1px solid rgba(255, 0, 0, 0.3);
          padding: 40px;
          text-align: center;
          color: #ff4444;
          margin-top: 20px;
        }
        .error-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          font-size: 1.2rem;
          margin-bottom: 20px;
          color: #ff4444;
        }
        .error-hint {
          margin-top: 20px;
          font-size: 0.7rem;
          opacity: 0.6;
          border-top: 1px solid rgba(255, 0, 0, 0.1);
          padding-top: 20px;
          color: white;
        }
        .intel-actions {
          margin-top: 25px;
          display: flex;
          justify-content: center;
        }

        .mobile-only { display: none; }
        .desktop-only { display: block; }
        
        .tactical-op-card {
          padding: 20px;
          margin-bottom: 20px;
          border-left: 2px solid var(--primary-theme);
        }
        .op-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
        }
        .op-name-block {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .op-card-details {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .detail-line {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.8rem;
          opacity: 0.8;
        }
        .txn-mini {
          padding: 2px 6px;
          background: rgba(0, 255, 102, 0.1);
          color: var(--primary-theme);
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .desktop-only { display: none; }
          .mobile-only { display: block; }
          .tactical-header { padding-top: 80px; padding-bottom: 20px; }
          .header-status { display: none; }
          .header-title-complex { flex-direction: column; gap: 20px; text-align: center; }
          .header-actions { width: 100%; flex-direction: column; gap: 10px; }
          .header-actions .stark-btn { width: 100%; }
          .reg-counter { width: 100%; justify-content: center; }
          .intel-container { width: 95%; padding: 20px; }
          .intel-image { max-height: 50vh; }
        }
      `}</style>
    </div>
  );
}
