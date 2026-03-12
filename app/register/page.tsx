"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Upload, CheckCircle, Loader2, ArrowRight,
  QrCode, ShieldCheck, Terminal, User, Mail,
  School, Hash, Phone, Copy, Check, Fingerprint
} from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    semester: "",
    whatsapp: "",
    upiTransactionId: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const upiId = "navintom209@okhdfcbank";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("PAYMENT EVIDENCE MISSING: PLEASE UPLOAD SCREENSHOT");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // PHASE 1: UPLINK TO IMGBB PROTOCOL
      const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const imageData = new FormData();
      imageData.append("image", file);

      const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: "POST",
        body: imageData,
      });

      if (!imgbbResponse.ok) throw new Error("IMGBB UPLINK REJECTED");

      const imgbbData = await imgbbResponse.json();
      const downloadURL = imgbbData.data.url;

      // PHASE 2: SECURE DATA IN CENTRAL MANIFEST
      await addDoc(collection(db, "registrations"), {
        ...formData,
        paymentScreenshotURL: downloadURL,
        timestamp: serverTimestamp(),
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setError("TRANSMISSION ERROR: IMGBB UPLINK FAILED");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="register-container success-view section-padding">
        <motion.div
          className="hud-panel success-card"
          initial={{ scale: 0.8, opacity: 0, rotateX: 45 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <div className="auth-verification">
            <ShieldCheck size={80} className="glowing-text pulse" />
          </div>
          <h2 className="stark-font glowing-text" style={{ fontSize: '2.5rem' }}>AUTHORIZED</h2>
          <p style={{ opacity: 0.8, letterSpacing: '1px', fontSize: '1.1rem', fontWeight: 500 }}>
            REGISTRATION DATA SECURED IN DOOMDOM SERVERS
          </p>
          <div className="success-details hud-panel">
            <p className="stark-font" style={{ fontSize: '0.8rem' }}>MISSION: <span className="glowing-text">VIBE CODING WORKSHOP</span></p>
            <p className="stark-font" style={{ fontSize: '0.8rem' }}>STATUS: <span className="glowing-text">ENROLLED</span></p>
          </div>
          <button
            onClick={() => window.location.href = "/"}
            className="stark-btn primary stark-font"
            style={{ marginTop: '30px' }}
          >
            Return to Base
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="register-container section-padding">
      <div className="content-width">
        <div className="registration-grid">
          {/* Left Side: Instructions & QR */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="registration-intel"
          >
            <div className="intel-header">
              <Terminal className="glowing-text" size={32} />
              <h2 className="stark-font">PAYMENT <span className="glowing-text">PROTOCOLS</span></h2>
            </div>

            <div className="hud-panel qr-card">
              <div className="qr-viewport">
                <img
                  src="/qr.png"
                  alt="Payment QR"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <div className="qr-scan-line"></div>
              </div>
              <div className="qr-details">
                <p className="stark-font" style={{ fontSize: '1.2rem', marginBottom: '10px' }}>FEE: <span className="glowing-text">₹50</span></p>

                <div className="upi-copy-container hud-panel" onClick={copyToClipboard}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--silver)', fontWeight: 600 }}>{upiId}</p>
                  {copied ? <Check size={14} className="glowing-text" /> : <Copy size={16} />}
                </div>
                <p style={{ fontSize: '0.7rem', color: 'var(--silver)', marginTop: '10px', opacity: 0.6, letterSpacing: '1px' }}>TAP UPI ID TO COPY</p>
              </div>
            </div>

            <div className="instruction-bits">
              <div className="bit hud-panel">
                <ShieldCheck size={16} />
                <span>SECURE PAYMENT</span>
              </div>
              <div className="bit hud-panel">
                <Fingerprint size={16} />
                <span>VERIFY WITH TXN ID</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="registration-form-container"
          >
            <form className="glass-panel enrollment-form" onSubmit={handleSubmit}>
              <div className="form-head">
                <div className="head-badge stark-font">TACTICAL UPLINK</div>
                <h3 className="stark-font">NEW RECRUIT <span className="glowing-text">MANIFEST</span></h3>
                <div className="form-line"></div>
              </div>

              <div className="stark-input-grid">
                <div className="stark-input-container">
                  <label className="stark-label stark-font">FULL NAME</label>
                  <div className="input-wrapper">
                    <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="DOOM" className="stark-input" />
                    <User size={14} className="input-icon" />
                  </div>
                </div>
                <div className="stark-input-container">
                  <label className="stark-label stark-font">EMAIL IDENTIFIER</label>
                  <div className="input-wrapper">
                    <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="doom@latveria.com" className="stark-input" />
                    <Mail size={14} className="input-icon" />
                  </div>
                </div>
                <div className="stark-input-container">
                  <label className="stark-label stark-font">COLLEGE</label>
                  <div className="input-wrapper">
                    <input type="text" name="college" required value={formData.college} onChange={handleInputChange} placeholder="LATVERIA TECH" className="stark-input" />
                    <School size={14} className="input-icon" />
                  </div>
                </div>
                <div className="stark-input-container">
                  <label className="stark-label stark-font">SEMESTER</label>
                  <div className="input-wrapper">
                    <input type="text" name="semester" required value={formData.semester} onChange={handleInputChange} placeholder="FINAL" className="stark-input" />
                    <Hash size={14} className="input-icon" />
                  </div>
                </div>
                <div className="stark-input-container">
                  <label className="stark-label stark-font">WHATSAPP UPLINK</label>
                  <div className="input-wrapper">
                    <input type="text" name="whatsapp" required value={formData.whatsapp} onChange={handleInputChange} placeholder="+91 XXXXX" className="stark-input" />
                    <Phone size={14} className="input-icon" />
                  </div>
                </div>
                <div className="stark-input-container">
                  <label className="stark-label stark-font">UPI TRANSACTION ID</label>
                  <div className="input-wrapper">
                    <input type="text" name="upiTransactionId" required value={formData.upiTransactionId} onChange={handleInputChange} placeholder="T240319XXXXXX" className="stark-input" />
                    <Fingerprint size={14} className="input-icon" />
                  </div>
                </div>

                <div className="stark-input-container full-width">
                  <label className="stark-label stark-font">PAYMENT EVIDENCE (TECHNICAL SCAN)</label>
                  <div className="stark-file-upload">
                    <input type="file" id="file-upload" accept="image/*" onChange={handleFileChange} />
                    <label htmlFor="file-upload" className="file-box glass-panel">
                      <div className="uplink-ornament top-left"></div>
                      <div className="uplink-ornament bottom-right"></div>
                      {file ? (
                        <div className="file-ready">
                          <CheckCircle size={28} className="glowing-text" />
                          <div className="file-meta">
                            <span className="stark-font" style={{ fontSize: '0.9rem' }}>IMAGE DATA SECURED</span>
                            <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>{file.name}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="file-empty">
                          <div className="upload-icon-ring">
                            <Upload size={24} />
                          </div>
                          <div className="upload-text">
                            <span className="stark-font" style={{ fontSize: '0.8rem' }}>UPLINK MISSION EVIDENCE</span>
                            <span style={{ fontSize: '0.65rem', opacity: 0.5 }}>DROP SCAN OR CLICK TO BROWSE</span>
                          </div>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              {error && <div className="error-terminal stark-font">{error}</div>}

              <button
                type="submit"
                className={`stark-btn primary pulse-btn stark-font submit-btn ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? <Loader2 className="spinner" /> : <>INITIALIZE ENROLLMENT <ArrowRight size={20} /></>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .registration-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 60px;
          align-items: start;
        }
        .intel-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 30px;
        }
        .qr-card {
          padding: 30px;
          text-align: center;
          background: rgba(0, 255, 102, 0.05);
        }
        .qr-viewport {
          position: relative;
          background: white;
          padding: 15px;
          display: inline-block;
          margin-bottom: 20px;
          border-radius: 8px;
          overflow: hidden;
          max-width: 250px;
        }
        .qr-scan-line {
          position: absolute;
          width: 100%;
          height: 3px;
          background: var(--stark-red);
          top: 0;
          left: 0;
          animation: scan 3s linear infinite;
        }
        .upi-copy-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 10px;
          cursor: pointer;
          background: rgba(0, 0, 0, 0.4);
          transition: all 0.3s;
          border-radius: 4px;
          border: 1px solid transparent;
        }
        .upi-copy-container:hover {
          background: rgba(0, 255, 102, 0.1);
          border-color: var(--stark-red);
        }
        .instruction-bits {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-top: 30px;
        }
        .bit {
          padding: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 1px;
        }
        .enrollment-form {
          padding: 40px;
          background: rgba(5, 10, 5, 0.85);
        }
        .form-head {
          margin-bottom: 30px;
        }
        .form-line {
          height: 2px;
          background: linear-gradient(90deg, var(--stark-red), transparent);
          margin-top: 10px;
        }
        .registration-grid {
          display: grid;
          grid-template-columns: 1fr 1.8fr;
          gap: 40px;
          align-items: start;
        }
        .enrollment-form {
          padding: 25px 35px;
          border-radius: 8px;
        }
        .form-head {
          margin-bottom: 25px;
        }
        .head-badge {
          font-size: 7px;
          background: rgba(0, 255, 102, 0.15);
          color: var(--primary-theme);
          padding: 3px 10px;
          width: fit-content;
          margin-bottom: 10px;
          border-radius: 100px;
          border: 1px solid rgba(0, 255, 102, 0.3);
        }
        .stark-input-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px 20px;
        }
        .full-width { grid-column: 1 / -1; }
        .input-wrapper { position: relative; }
        .input-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.4;
          color: var(--primary-theme);
          pointer-events: none;
        }
        .file-box {
          padding: 25px;
          cursor: pointer;
          text-align: center;
          transition: all 0.3s;
          border-style: dashed !important;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 6px;
        }
        .file-box:hover {
          background: rgba(0, 255, 102, 0.05);
          border-color: var(--primary-theme) !important;
        }
        .upload-icon-ring {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 255, 102, 0.1);
          border: 1px solid rgba(0, 255, 102, 0.3);
          margin-bottom: 12px;
          margin-inline: auto;
        }
        .upload-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .file-ready {
          display: flex;
          align-items: center;
          gap: 15px;
          text-align: left;
        }
        .file-meta {
          display: flex;
          flex-direction: column;
        }
        .uplink-ornament {
          position: absolute;
          width: 8px;
          height: 8px;
          border-color: var(--primary-theme);
          border-style: solid;
          opacity: 0.6;
        }
        .top-left { top: 5px; left: 5px; border-width: 1px 0 0 1px; }
        .bottom-right { bottom: 5px; right: 5px; border-width: 0 1px 1px 0; }
        .submit-btn { 
          width: 100%; 
          margin-top: 15px;
          padding: 18px !important;
          font-size: 1rem !important;
          background: rgba(0, 255, 102, 0.15) !important;
          box-shadow: 0 0 20px rgba(0, 255, 102, 0.2) !important;
        }
        .submit-btn:hover {
          background: var(--primary-theme) !important;
          box-shadow: 0 0 40px rgba(0, 255, 102, 0.5) !important;
        }

        @media (max-width: 992px) {
          .registration-grid { grid-template-columns: 1fr; gap: 40px; }
          .registration-intel { order: 2; }
          .registration-form-container { order: 1; }
        }
        @media (max-width: 600px) {
          .stark-input-grid { grid-template-columns: 1fr; gap: 12px; }
          .enrollment-form { padding: 20px 15px; border-radius: 4px; }
          .qr-card { padding: 20px 15px; }
          .instruction-bits { grid-template-columns: 1fr; }
          .bit { padding: 12px; font-size: 0.7rem; }
          .submit-btn { padding: 15px !important; font-size: 0.9rem !important; }
          .registration-intel { padding-bottom: 40px; }
        }
        @media (max-width: 480px) {
          .qr-viewport { max-width: 100%; width: 100%; border-radius: 4px; }
          .head-badge { font-size: 6px; }
          .stark-font { letter-spacing: 2px !important; }
        }
      `}</style>
    </div>
  );
}
