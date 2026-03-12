"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Zap, Code, Terminal, Cpu, Globe,
  ArrowRight, Shield, Activity, Radio,
  Fingerprint
} from "lucide-react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as any }
    }
  };

  return (
    <div className="home-container">
      {/* --- HERO SECTION --- */}
      <section className="hero section-padding">
        <motion.div
          className="hero-content content-width"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mission-id stark-font">
            <span className="glowing-text">// MISSION INTEL ACTIVE</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="hero-title stark-font"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            VIBE <span className="hero-coding-glow">CODING</span>
            <div className="hero-subtitle">
              <span>WORKSHOP</span>
              <span className="glowing-text">2026</span>
            </div>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-description h-fade-in">
            INITIATE HIGH-VELOCITY DEVELOPMENT SYSTEMS. <br className="desktop-only" />
            BUILD A PRODUCTION-READY APPLICATION IN 120 MINUTES.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-cta">
            <Link href="/register">
              <button className="stark-btn primary pulse-btn stark-font cta-main">
                REGISTER NOW <ArrowRight size={20} />
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* HUD Decorations & Avengers Emblem */}
        <div className="hud-decorations">
          <div className="hero-emblem-bg">
            <img src="/emblem.png" alt="Avengers Emblem" />
          </div>
          <div className="hud-circle"></div>
          <div className="hud-line-h"></div>
          <div className="hud-line-v"></div>
        </div>
      </section>

      {/* --- MISSION INTEL --- */}
      <section className="intel-section section-padding">
        <div className="content-width">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="stark-font text-center glowing-text"
            style={{ marginBottom: '60px' }}
          >
            MISSION PARAMETERS
          </motion.h2>

          <div className="intel-grid">
            {[
              { icon: Zap, label: "DATE", value: "19 MARCH 2026" },
              { icon: Radio, label: "TIME", value: "08:30 PM" },
              { icon: Globe, label: "MODE", value: "ONLINE" },
              { icon: Shield, label: "ACCESS", value: "₹50" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="hud-panel intel-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="card-scanline"></div>
                <item.icon className="glowing-text" size={32} />
                <span className="stark-font" style={{ fontSize: '0.6rem', opacity: 0.5, marginTop: '15px' }}>{item.label}</span>
                <h3 className="stark-font" style={{ marginTop: '5px' }}>{item.value}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- COMMAND HIERARCHY --- */}
      <section className="command-section section-padding">
        <div className="content-width">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="stark-font text-center glowing-text"
            style={{ marginBottom: '60px' }}
          >
            COMMAND HIERARCHY
          </motion.h2>

          <div className="command-grid">
            {[
              {
                rank: "LEAD ARCHITECT",
                name: "Ashvin P Kumar",
                intel: "Founder Obsidyne",
                desc: "Web & App Development Expert",
                status: "SESSION LEAD ACTIVE"
              },
              {
                rank: "EVENT COORDINATOR",
                name: "Navin Tom",
                intel: "S6 EL",
                desc: "Workshop Organizer",
                uplink: "+91 6282527929"
              }
            ].map((person, idx) => (
              <motion.div
                key={idx}
                className="personnel-card hud-panel"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <div className="personnel-header">
                  <div className="avatar-ring">
                    <Fingerprint size={24} className="glowing-text" />
                  </div>
                  <div className="personnel-id">
                    <span className="personnel-rank stark-font">{person.rank}</span>
                    <h3 className="stark-font personnel-name">{person.name}</h3>
                  </div>
                </div>

                <div className="personnel-data">
                  <div className="data-row">
                    <span className="stark-font label">UNIT:</span>
                    <span className="value">{person.intel}</span>
                  </div>
                  <p className="personnel-bio">{person.desc}</p>
                </div>

                <div className="personnel-divider"></div>

                <div className="personnel-footer">
                  {person.status ? (
                    <div className="status-indicator">
                      <span className="status-dot pulse"></span>
                      <span className="stark-font status-text">{person.status}</span>
                    </div>
                  ) : (
                    <div className="uplink-data">
                      <span className="stark-font label">UPLINK:</span>
                      <span className="value">{person.uplink}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- RECRUITMENT CALLOUT --- */}
      <section className="callout-section section-padding">
        <div className="content-width">
          <motion.div
            className="hud-panel recruitment-callout"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center' }}
          >
            <h2 className="stark-font" style={{ fontSize: 'clamp(1.8rem, 8vw, 3.5rem)', lineHeight: 1.1 }}>READY TO <span className="glowing-text">ASCEND?</span></h2>
            <p className="callout-desc">CERTIFICATES WILL BE ISSUED TO ALL ENROLLED PERSONNEL.</p>
            <Link href="/register">
              <button className="stark-btn primary stark-font register-btn">
                START REGISTRATION
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        .home-container {
          overflow-x: hidden;
        }
        .hero-description {
          max-width: 800px;
          margin: 30px auto;
          line-height: 1.8;
          font-size: clamp(0.9rem, 4vw, 1.1rem);
          opacity: 0.8;
          letter-spacing: 1px;
          font-weight: 400;
        }
        .mission-id {
          font-size: clamp(0.7rem, 3vw, 0.8rem);
          letter-spacing: 4px;
          margin-bottom: 20px;
        }
        .intel-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .intel-card {
          padding: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
        }
        .callout-desc {
          margin: 20px 0 40px; 
          opacity: 0.8; 
          font-size: clamp(0.85rem, 4vw, 1.1rem); 
          letter-spacing: 1px; 
          font-weight: 500;
          padding: 0 10px;
        }
        .register-btn {
          padding: 18px 40px !important;
          min-width: 280px;
        }
        .card-scanline {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: rgba(0, 255, 102, 0.2);
          animation: scan 4s linear infinite;
        }
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .hud-decorations {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 1;
        }
        .hud-circle {
          position: absolute;
          width: 80vw;
          max-width: 600px;
          aspect-ratio: 1/1;
          border: 1px dashed rgba(0, 255, 102, 0.1);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .hud-line-h {
          position: absolute;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 102, 0.05), transparent);
          top: 50%;
        }
        .hud-line-v {
          position: absolute;
          height: 100%;
          width: 1px;
          background: linear-gradient(180deg, transparent, rgba(0, 255, 102, 0.05), transparent);
          left: 50%;
        }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .nav-brand-container {
          display: flex;
          align-items: center;
          gap: 15px;
          text-decoration: none;
        }
        .avengers-logo-mini {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .avengers-logo-mini::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border: 1px solid var(--primary-theme);
          border-radius: 50%;
          animation: rotate 10s linear infinite;
          opacity: 0.3;
        }
        .emblem-img {
          width: 80%;
          height: 80%;
          object-fit: contain;
          filter: drop-shadow(0 0 10px var(--primary-theme));
        }
        .hero-emblem-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60vw;
          max-width: 500px;
          opacity: 0.08;
          z-index: 0;
          pointer-events: none;
          filter: brightness(0) invert(1) sepia(1) saturate(10000%) hue-rotate(90deg);
        }
        .hero-emblem-bg img {
          width: 100%;
          height: auto;
          animation: breathe 8s ease-in-out infinite;
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.08; }
          50% { transform: scale(1.05); opacity: 0.12; }
        }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .command-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 25px;
          justify-content: center;
        }
        .personnel-card {
          padding: 25px;
          background: rgba(0, 255, 102, 0.02);
          border: 1px solid rgba(0, 255, 102, 0.1);
          transition: all 0.4s ease;
        }
        .personnel-card:hover {
          background: rgba(0, 255, 102, 0.05);
          border-color: rgba(0, 255, 102, 0.4);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .personnel-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 25px;
        }
        .avatar-ring {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 1px solid rgba(0, 255, 102, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 255, 102, 0.05);
          position: relative;
        }
        .avatar-ring::after {
          content: '';
          position: absolute;
          width: 110%;
          height: 110%;
          border: 1px dashed rgba(0, 255, 102, 0.2);
          border-radius: 50%;
          animation: rotate-slow 20s linear infinite;
        }
        .personnel-id {
          display: flex;
          flex-direction: column;
        }
        .personnel-rank {
          font-size: 10px;
          color: var(--primary-theme);
          letter-spacing: 2px;
          margin-bottom: 4px;
          opacity: 0.8;
        }
        .personnel-name {
          font-size: 1.3rem;
          letter-spacing: 1px;
          margin: 0;
        }
        .personnel-data {
          margin-bottom: 20px;
        }
        .data-row {
          display: flex;
          gap: 8px;
          align-items: center;
          margin-bottom: 8px;
        }
        .data-row .label { font-size: 9px; opacity: 0.5; color: var(--silver); }
        .data-row .value { font-size: 11px; color: #fff; letter-spacing: 1px; }
        .personnel-bio {
          font-size: 13px;
          opacity: 0.7;
          line-height: 1.6;
          color: var(--silver);
        }
        .personnel-divider {
          height: 1px;
          background: linear-gradient(90deg, var(--primary-theme), transparent);
          margin: 20px 0;
          opacity: 0.15;
        }
        .personnel-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .status-indicator {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .status-dot { width: 6px; height: 6px; }
        .status-text { font-size: 9px; letter-spacing: 1px; opacity: 0.8; }
        .uplink-data { display: flex; align-items: center; gap: 8px; }
        .uplink-data .label { font-size: 9px; opacity: 0.5; }
        .uplink-data .value { font-size: 11px; color: var(--primary-theme); font-weight: 600; letter-spacing: 1px; }

        @media (max-width: 992px) {
          .command-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 480px) {
          .intel-grid { grid-template-columns: 1fr; }
          .hero { padding-top: 100px; }
          .register-btn { min-width: 100%; }
          .register-btn { min-width: 100%; }
          .command-grid { grid-template-columns: 1fr; }
          .personnel-card { padding: 20px; }
          .personnel-name { font-size: 1.1rem; }
        }
      `}</style>
    </div>
  );
}
