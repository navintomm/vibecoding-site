"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Upload, CheckCircle, Loader2, ArrowRight,
  QrCode, ShieldCheck, Terminal, User, Mail,
  School, Hash, Phone, Copy, Check, Fingerprint,
  Instagram, Info, Home, RotateCcw
} from "lucide-react";

// --- Sub-components for Success View ---
const Particles = ({ count = 20 }: { count?: number }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // Reduce count on mobile for performance
  const finalCount = typeof window !== 'undefined' && window.innerWidth < 768 ? Math.min(count, 10) : count;

  return (
    <div className="sparks-container">
      {Array.from({ length: finalCount }).map((_, i) => (
        <motion.div
          key={i}
          className="spark"
          initial={{ 
            x: 0, 
            y: 0, 
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5 
          }}
          animate={{ 
            x: (Math.random() - 0.5) * 150,
            y: (Math.random() - 1) * 200,
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeOut"
          }}
          style={{ willChange: 'transform, opacity' }}
        />
      ))}
    </div>
  );
};

const SuccessScreen = ({ onHome, onReset }: { onHome: () => void, onReset: () => void }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 20,
      y: (clientY / innerHeight - 0.5) * 20,
    });
  };

  return (
    <div className="doom-success-screen" onMouseMove={handleMouseMove}>
      <motion.div 
        className="doom-background-layer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ willChange: 'opacity' }}
      >
        <Image 
          src="/doom-success.png" 
          alt="Dr Doom" 
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center 15%',
            transform: `translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)`,
            willChange: 'transform'
          }}
          className="doom-bg-img"
          priority
        />
        <div className="doom-gradient-overlay" />
      </motion.div>

      <div className="cinematic-content">
        {/* Top Section: Clear visibility for Doom's Face */}
        <div className="content-top-spacer" />

        {/* Middle Section: Ember and Particles */}
        <div className="content-middle">
          <div className="ember-focal-point">
            <motion.div 
              className="ember-glow-ring"
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <Particles count={25} />
          </div>
        </div>

        {/* Bottom Section: Structured Confirmation Card */}
        <div className="content-bottom">
          <motion.div 
            className="confirmation-card glass-panel-ultra"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="card-top-accent" />
            <div className="card-glitch-line" />
            
            <div className="success-header">
              <div className="check-ring-wrapper">
                <div className="check-ring-glow" />
                <div className="check-ring">
                  <CheckCircle size={32} className="glowing-text" />
                </div>
              </div>
              <div className="auth-stamp stark-font">✓ ENROLLMENT AUTHORIZED</div>
              <h2 className="stark-font title">REGISTRATION<br/>SUCCESSFUL</h2>
            </div>

            <div className="mission-status-report">
              <div className="report-header stark-font">TACTICAL REPORT</div>
              <div className="mission-data">
                <div className="data-row">
                  <span className="label stark-font">MISSION</span>
                  <span className="value glowing-text">Vibe Coding Workshop</span>
                </div>
                <div className="data-row">
                  <span className="label stark-font">STATUS</span>
                  <span className="value glowing-text">Personnel Enrolled</span>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button onClick={onHome} className="stark-btn primary cinematic-btn success-btn">
                <Home size={18} className="btn-icon-left" /> 
                <span className="stark-font">RETURN TO HQ</span>
              </button>
              <button onClick={onReset} className="stark-btn secondary-btn glass-panel-light">
                <RotateCcw size={18} className="btn-icon-left" /> 
                <span className="stark-font">NEW REGISTRATION</span>
              </button>
            </div>
            
            <div className="card-footer-bits">
              <span className="bit"></span>
              <span className="bit active"></span>
              <span className="bit"></span>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .doom-success-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 10000;
          background: #020802;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .doom-background-layer {
          position: absolute;
          inset: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
        }
        .doom-bg-img {
          width: 110%;
          height: 110%;
          transition: transform 0.1s ease-out;
        }
        .doom-gradient-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 30%, transparent 20%, rgba(0, 10, 0, 0.3) 60%, rgba(0, 0, 0, 0.8) 100%);
          z-index: 2;
        }
        .doom-bottom-mask {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 45%; /* Reduced height to reveal more image */
          background: linear-gradient(to top, #020802 0%, transparent 100%);
          z-index: 3;
        }
        .cinematic-content {
          position: relative;
          z-index: 10;
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-rows: 1fr 0.6fr 1.4fr;
          padding: 24px;
        }
        .content-top-spacer { height: 100%; }
        .content-middle { position: relative; display: flex; align-items: center; justify-content: center; }
        .content-bottom { display: flex; align-items: flex-start; justify-content: center; padding-top: 20px; }

        .ember-focal-point {
          position: relative;
          width: 60px;
          height: 60px;
          pointer-events: none;
        }
        .ember-glow-ring {
          position: absolute;
          inset: -40px;
          background: radial-gradient(circle, rgba(255, 85, 0, 0.4) 0%, transparent 70%);
          filter: blur(20px);
          border-radius: 50%;
        }
        .sparks-container {
          position: absolute;
          inset: 0;
        }
        :global(.spark) {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #ffaa00;
          border-radius: 50%;
          box-shadow: 0 0 10px #ff6600;
          filter: blur(0.5px);
        }
        .confirmation-card {
          width: 100%;
          max-width: 440px;
          background: rgba(4, 12, 4, 0.55); /* Increased transparency */
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 255, 102, 0.2) !important;
          padding: 45px 35px 35px;
          text-align: center;
          box-shadow: 0 0 100px rgba(0, 0, 0, 0.8);
          position: relative;
          border-radius: 2px;
          overflow: hidden;
        }
        .card-top-accent {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 160px;
          height: 3px;
          background: var(--primary-theme);
          box-shadow: 0 0 25px var(--primary-theme);
        }
        .card-glitch-line {
          position: absolute;
          top: 3px;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 102, 0.2), transparent);
          animation: scan-glitch 4s infinite linear;
        }
        @keyframes scan-glitch {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(400px); opacity: 0; }
        }

        .success-header { 
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 40px; 
        }
        .check-ring-wrapper {
          position: relative;
          width: 70px;
          height: 70px;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .check-ring-glow {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: var(--primary-theme);
          opacity: 0.15;
          filter: blur(15px);
          animation: ring-glow 3s infinite alternate;
        }
        @keyframes ring-glow {
          from { opacity: 0.1; transform: scale(0.8); }
          to { opacity: 0.25; transform: scale(1.1); }
        }
        .check-ring {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid rgba(0, 255, 102, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 255, 102, 0.05);
        }

        .auth-stamp {
          font-size: 0.7rem;
          color: var(--primary-theme);
          letter-spacing: 5px;
          margin-bottom: 15px;
          opacity: 0.8;
          font-weight: 800;
        }
        .title {
          font-size: 1.8rem;
          line-height: 1.1;
          color: #fff;
          margin: 0;
          letter-spacing: 1px;
          font-weight: 900;
        }
        .mission-status-report {
          margin-bottom: 40px;
          text-align: left;
        }
        .report-header {
          font-size: 0.6rem;
          letter-spacing: 4px;
          color: #fff; /* Changed to pure white */
          margin-bottom: 12px;
          padding-left: 5px;
          border-left: 2px solid var(--primary-theme);
          text-transform: uppercase;
          opacity: 0.9;
        }
        .mission-data {
          padding: 25px;
          background: rgba(0, 0, 0, 0.45);
          border: 1px solid rgba(0, 255, 102, 0.12);
          border-radius: 2px;
        }
        .data-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        .data-row:last-child { margin-bottom: 0; }
        .data-row .label { 
          font-size: 0.65rem; 
          color: #fff; /* Changed to white */
          opacity: 0.8; 
          letter-spacing: 2px; 
        }
        .data-row .value { font-size: 0.85rem; font-weight: 700; letter-spacing: 0.5px; }
        
        .card-actions {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .success-btn, .secondary-btn {
          width: 100%;
          padding: 20px !important;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-left: 30px !important;
          gap: 15px;
          font-size: 0.85rem !important;
          letter-spacing: 3px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .secondary-btn {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          color: rgba(255, 255, 255, 0.6);
        }
        .secondary-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.3) !important;
          color: #fff;
          transform: translateX(5px);
        }
        .success-btn:hover {
          padding-left: 40px !important;
        }
        .btn-icon-left {
          opacity: 0.7;
          transition: transform 0.3s;
        }
        .success-btn:hover .btn-icon-left {
          transform: scale(1.2);
          opacity: 1;
        }

        .card-footer-bits {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 40px;
        }
        .bit { 
          width: 5px; 
          height: 5px; 
          background: rgba(0, 255, 102, 0.15); 
          border-radius: 50%;
          transition: all 0.3s;
        }
        .bit.active {
          background: var(--primary-theme);
          box-shadow: 0 0 10px var(--primary-theme);
          transform: scale(1.3);
        }

        @media (max-width: 480px) {
          .cinematic-content { grid-template-rows: 0.6fr 0.6fr 1.8fr; padding: 20px; }
          .confirmation-card { padding: 40px 24px 30px; }
          .title { font-size: 1.5rem; }
          .auth-stamp { font-size: 0.65rem; letter-spacing: 3px; }
          .mission-data { padding: 20px; }
          .success-btn, .secondary-btn { 
            padding: 16px !important; 
            font-size: 0.75rem !important; 
            padding-left: 20px !important;
          }
          .success-btn:hover, .secondary-btn:hover { padding-left: 25px !important; transform: none; }
        }
      `}</style>
    </div>
  );
};

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
      <SuccessScreen 
        onHome={() => window.location.href = "/"} 
        onReset={() => {
          setSubmitted(false);
          setFormData({
            name: "",
            email: "",
            college: "",
            semester: "",
            whatsapp: "",
            upiTransactionId: "",
          });
          setFile(null);
          setError("");
        }} 
      />
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
              <ShieldCheck className="glowing-text" size={32} />
              <h2 className="stark-font">PAYMENT <span className="glowing-text">GATEWAY ACTIVE</span></h2>
            </div>

            <div className="hud-panel tactical-payment-vault">
              <div className="vault-header-intel">
                <span className="stark-font fee-badge">REGISTRATION FEE: <span className="glowing-text">₹50</span></span>
              </div>

              <div className="qr-container-outer glass-panel">
                <div className="qr-viewport-highres">
                  <Image
                    src="/qr.png"
                    alt="Tactical Payment QR"
                    width={220}
                    height={220}
                    style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px' }}
                  />
                  <div className="qr-scanning-grid"></div>
                  <div className="qr-corner-bracket tl"></div>
                  <div className="qr-corner-bracket tr"></div>
                  <div className="qr-corner-bracket bl"></div>
                  <div className="qr-corner-bracket br"></div>
                </div>
              </div>

              <div className="qr-tactical-details">
                <div className="upi-id-block hud-panel" onClick={copyToClipboard}>
                  <p className="stark-font label">UPI IDENTIFIER</p>
                  <div className="upi-display">
                    <code>{upiId}</code>
                    {copied ? <Check size={12} className="glowing-text" /> : <Copy size={12} />}
                  </div>
                </div>

                <div className="payment-instructions">
                  <Info size={14} className="glowing-text" />
                  <p>Scan using any UPI app and upload the payment screenshot during registration.</p>
                </div>
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
        .tactical-payment-vault {
          padding: 30px;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(0, 255, 102, 0.1);
          transition: all 0.4s ease;
          position: relative;
        }
        .tactical-payment-vault:hover {
          border-color: var(--primary-theme);
          box-shadow: 0 0 30px rgba(0, 255, 102, 0.15);
        }
        .vault-header-intel {
          margin-bottom: 25px;
          text-align: center;
        }
        .fee-badge {
          font-size: 0.9rem;
          background: rgba(0, 255, 102, 0.05);
          padding: 8px 20px;
          border-radius: 100px;
          border: 1px solid rgba(0, 255, 102, 0.2);
        }
        .qr-container-outer {
          padding: 20px;
          background: rgba(255, 255, 255, 0.02);
          margin-bottom: 25px;
          border-radius: 12px;
          display: flex;
          justify-content: center;
        }
        .qr-viewport-highres {
          position: relative;
          background: white;
          padding: 12px;
          border-radius: 8px;
          max-width: 220px;
          width: 100%;
        }
        .qr-scanning-grid {
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(rgba(0, 255, 102, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 102, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
          pointer-events: none;
          animation: qr-pulse 4s infinite;
        }
        @keyframes qr-pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
        .qr-corner-bracket {
          position: absolute;
          width: 15px;
          height: 15px;
          border-color: var(--primary-theme);
          border-style: solid;
        }
        .tl { top: -5px; left: -5px; border-width: 2px 0 0 2px; }
        .tr { top: -5px; right: -5px; border-width: 2px 2px 0 0; }
        .bl { bottom: -5px; left: -5px; border-width: 0 0 2px 2px; }
        .br { bottom: -5px; right: -5px; border-width: 0 2px 2px 0; }

        .upi-id-block {
          padding: 15px;
          background: rgba(0, 0, 0, 0.3);
          cursor: pointer;
          margin-bottom: 20px;
        }
        .upi-id-block .label { font-size: 8px; color: var(--silver); margin-bottom: 5px; }
        .upi-display { display: flex; align-items: center; justify-content: space-between; font-family: monospace; }
        .payment-instructions {
          display: flex;
          gap: 12px;
          font-size: 0.75rem;
          color: var(--silver);
          line-height: 1.5;
          margin-bottom: 25px;
          padding: 0 5px;
        }
        .instagram-protocol {
          background: linear-gradient(45deg, rgba(0, 255, 102, 0.05), transparent);
          text-align: center;
        }
        .insta-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px;
          text-decoration: none;
          color: white;
          font-size: 0.8rem;
          transition: all 0.3s;
        }
        .insta-link:hover {
          color: var(--primary-theme);
          letter-spacing: 2px;
          text-shadow: 0 0 10px var(--primary-theme);
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
