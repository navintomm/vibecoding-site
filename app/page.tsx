"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Zap, Code, Terminal, Cpu, Globe,
  ArrowRight, Shield, Activity, Radio,
  Fingerprint, Mouse, ChevronDown, Clock, CheckCircle
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

        {/* HIGH-TECH SCROLL PROTOCOL */}
        <motion.div
          className="scroll-indicator-complex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <div className="scroll-visual-engine">
            <div className="mouse-capsule">
              <motion.div
                className="mouse-wheel-dot"
                animate={{
                  y: [0, 20, 0],
                  opacity: [1, 0, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="chevron-waterfall">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: [0, 10, 20]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "linear"
                  }}
                >
                  <ChevronDown size={18} className="glowing-text" />
                </motion.div>
              ))}
            </div>

            <div className="energy-ring-pulse"></div>
          </div>

          <div className="scroll-label-group">
            <div className="stark-font scroll-intel-text">INITIATE_SCROLL</div>
            <div className="scroll-status-line">
              <div className="status-bit-active"></div>
              <div className="status-text-mini">DATA_FLOW_STABLE</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- SESSION OVERVIEW --- */}
      <section className="intel-section section-padding" id="intel">
        <div className="content-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header text-center"
            style={{ marginBottom: '60px' }}
          >
            <h2 className="stark-font glowing-text">SESSION <span style={{ color: 'white' }}>OVERVIEW</span></h2>
            <div className="header-underline"></div>
          </motion.div>

          <div className="intel-grid">
            {[
              { icon: Zap, label: "EVENT DATE", value: "19 MARCH 2026" },
              { icon: Clock, label: "DURATION", value: "2 HOURS" },
              { icon: Globe, label: "MODE", value: "ONLINE SESSION" },
              { icon: Shield, label: "FEE", value: "₹50" },
              { icon: CheckCircle, label: "CERTIFICATES", value: "PROVIDED" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="hud-panel intel-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="card-glow-overlay"></div>
                <div className="card-scanline"></div>
                <item.icon className="glowing-text card-icon" size={28} />
                <span className="stark-font card-label">{item.label}</span>
                <h3 className="stark-font card-value">{item.value}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WORKFLOW SECTION --- */}
      <section className="workflow-section section-padding">
        <div className="content-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header text-center"
            style={{ marginBottom: '60px' }}
          >
            <h2 className="stark-font">WHAT YOU'LL DO <span className="glowing-text">IN THE SESSION</span></h2>
            <div className="header-underline"></div>
          </motion.div>

          <div className="workflow-grid">
            {[
              {
                step: "01",
                title: "IDEATION",
                desc: "Choose a lethal idea for a high-end app or website.",
                icon: Cpu
              },
              {
                step: "02",
                title: "FEATURE OPS",
                desc: "Plan the core features and tactical requirements.",
                icon: Radio
              },
              {
                step: "03",
                title: "WORKFLOW DESIGN",
                desc: "Map the basic user journey and data architecture.",
                icon: Activity
              },
              {
                step: "04",
                title: "PROTOTYPING",
                desc: "Build a working production-ready prototype.",
                icon: Terminal
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="workflow-card glass-panel"
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="step-badge stark-font">{item.step}</div>
                <div className="workflow-icon-box">
                  <item.icon size={24} className="glowing-text" />
                </div>
                <h3 className="stark-font">{item.title}</h3>
                <p>{item.desc}</p>
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
        .section-header { position: relative; }
        .header-underline {
          width: 80px;
          height: 3px;
          background: var(--primary-theme);
          margin: 15px auto 0;
          box-shadow: 0 0 15px var(--primary-theme);
        }
        .intel-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 15px;
        }
        .intel-card {
          padding: 35px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          background: rgba(0, 255, 102, 0.02);
          border-radius: 4px;
        }
        .intel-card:hover {
          background: rgba(0, 255, 102, 0.08);
          transform: translateY(-8px);
        }
        .card-glow-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(0, 255, 102, 0.15) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .intel-card:hover .card-glow-overlay { opacity: 1; }
        .card-icon { margin-bottom: 20px; }
        .card-label { font-size: 8px; opacity: 0.5; letter-spacing: 2px; }
        .card-value { font-size: 0.9rem; margin-top: 8px; }

        .workflow-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        .workflow-card {
          padding: 30px;
          border-radius: 8px;
          position: relative;
        }
        .step-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 2rem;
          font-weight: 900;
          color: rgba(0, 255, 102, 0.05);
        }
        .workflow-icon-box {
          width: 50px;
          height: 50px;
          background: rgba(0, 255, 102, 0.05);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 25px;
          border: 1px solid rgba(0, 255, 102, 0.1);
        }
        .workflow-card p {
          font-size: 0.85rem;
          opacity: 0.7;
          margin-top: 15px;
          line-height: 1.6;
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
        
        /* High-Tech Scroll Protocol */
        .scroll-indicator-complex {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          z-index: 10;
        }
        .scroll-visual-engine {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .mouse-capsule {
          width: 22px;
          height: 38px;
          border: 1px solid rgba(0, 255, 102, 0.3);
          border-radius: 15px;
          display: flex;
          justify-content: center;
          padding-top: 5px;
          background: rgba(0, 255, 102, 0.05);
          position: relative;
          z-index: 2;
        }
        .mouse-wheel-dot {
          width: 3px;
          height: 3px;
          background: var(--primary-theme);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--primary-theme);
        }
        .chevron-waterfall {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: -5px;
          height: 40px;
        }
        .energy-ring-pulse {
          position: absolute;
          width: 60px;
          height: 60px;
          border: 1px solid rgba(0, 255, 102, 0.1);
          border-radius: 50%;
          top: -10px;
          animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        .scroll-label-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }
        .scroll-intel-text {
          font-size: 9px;
          letter-spacing: 5px;
          color: var(--primary-theme);
          text-shadow: 0 0 10px var(--primary-theme);
          opacity: 0.8;
        }
        .scroll-status-line {
          display: flex;
          align-items: center;
          gap: 6px;
          opacity: 0.4;
        }
        .status-bit-active {
          width: 4px;
          height: 4px;
          background: var(--primary-theme);
          border-radius: 1px;
          animation: flicker 1s infinite;
        }
        .status-text-mini {
          font-size: 6px;
          letter-spacing: 1px;
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
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
          .intel-grid { grid-template-columns: repeat(2, 1fr); }
          .command-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 480px) {
          .intel-grid { grid-template-columns: 1fr; }
          .hero { padding-top: 120px; justify-content: flex-start; }
          .hero-content { padding-top: 40px; }
          .register-btn { min-width: 100%; }
          .scroll-indicator-container { bottom: 15px; }
          .scroll-text { display: none; }
          .hero-subtitle { letter-spacing: 4px; }
        }
      `}</style>
    </div>
  );
}
