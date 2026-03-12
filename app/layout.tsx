"use client";

import { useEffect, useState } from "react";
import { Outfit, Orbitron } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, ArrowLeft, MoreVertical } from "lucide-react";
import { usePathname } from "next/navigation";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

// Particle Component for Background
const BackgroundParticles = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const p = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 5,
    }));
    setParticles(p);
  }, []);

  return (
    <div className="particles-container">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: ["0vh", "100vh", "0vh"],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <html lang="en">
      <body className={`${outfit.variable} ${orbitron.variable}`}>
        <BackgroundParticles />

        {/* Persistent Cinematic Background */}
        <div className="cinematic-bg">
          <div className="energy-field"></div>
        </div>

        {/* Global Navigation */}
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
          {/* Green Scroll Progress Line */}
          <motion.div
            className="scroll-progress-nav"
            style={{ scaleX, transformOrigin: "0%" }}
          />

          <div className="nav-container">
            <Link href="/" className="nav-brand-container">
              <div className="avengers-logo-mini">
                <img src="/emblem.png" alt="A" className="emblem-img" />
              </div>
              <div className="brand-text stark-font glowing-text">
                VIBE <span style={{ color: 'white' }}>CODING</span>
              </div>
            </Link>

            <div className="nav-controls">
              <div className="nav-links">
                <Link href="/" className="nav-link stark-font">
                  HOME
                  <div className="nav-glow-bar"></div>
                </Link>
                <Link href="/register" className="nav-link stark-font">
                  REGISTER
                  <div className="nav-glow-bar"></div>
                </Link>
                <Link href="/admin" className="nav-link stark-font">
                  ADMIN
                  <div className="nav-glow-bar"></div>
                </Link>
              </div>

              {/* Mobile Hamburger Menu (3 lines) */}
              <div className={`mobile-menu-trigger ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
              </div>
            </div>
          </div>

        </nav>

        {/* Tactical Mobile Overlay (Full Screen) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Tactical Background Overlay */}
              <motion.div
                className="mobile-overlay-dim"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Slide-In Side Drawer */}
              <motion.div
                className="mobile-side-drawer"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 100, damping: 22 }}
              >
                <div className="drawer-header">
                  <div className="nav-brand-container">
                    <div className="avengers-logo-mini">
                      <img src="/emblem.png" alt="A" className="emblem-img" />
                    </div>
                    <span className="stark-font glowing-text" style={{ fontSize: '1rem' }}>VIBE CODING</span>
                  </div>
                  <div className="drawer-close" onClick={() => setMobileMenuOpen(false)}>
                    <Menu size={24} style={{ transform: 'rotate(90deg)' }} />
                  </div>
                </div>

                <div className="drawer-content">
                  <div className="drawer-links">
                    <Link href="/" className="drawer-link stark-font" onClick={() => setMobileMenuOpen(false)}>
                      HOME
                      <div className="drawer-link-indicator"></div>
                    </Link>
                    <Link href="/register" className="drawer-link stark-font" onClick={() => setMobileMenuOpen(false)}>
                      REGISTER
                      <div className="drawer-link-indicator"></div>
                    </Link>
                    <Link href="/admin" className="drawer-link stark-font" onClick={() => setMobileMenuOpen(false)}>
                      ADMIN
                      <div className="drawer-link-indicator"></div>
                    </Link>
                  </div>
                </div>

                <div className="drawer-footer stark-font">
                  <p>TRYDAN PROTOCOL v1.0</p>
                  <p className="glowing-text">SECURE ACCESS GRANTED</p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Page Content with Transitions */}
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {children}
          </motion.main>
        </AnimatePresence>

        <footer className="stark-footer">
          <div className="content-width">
            <div className="footer-grid">
              <div className="footer-brand">
                <h2 className="stark-font footer-logo">TRYDAN</h2>
                <p className="stark-font footer-tagline">The Doomsday Techfest</p>
              </div>

              <div className="footer-network">
                <h4 className="stark-font network-title">NETWORK</h4>
                <a href="https://www.instagram.com/trydan.mbcet?igsh=MTI4bnBzaGlzbWNvMw==" target="_blank" rel="noopener noreferrer" className="social-link-wrapper">
                  <div className="social-icon-ring">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </div>
                </a>
              </div>
            </div>

            <div className="footer-divider"></div>

            <div className="footer-bottom">
              <p className="copyright-text stark-font">© 2026 TRYDAN Protocol. All rights reserved.</p>
            </div>
          </div>
        </footer>

        <style jsx>{`
          .stark-footer {
            padding: 80px 0 40px;
            background: linear-gradient(to top, rgba(2, 8, 2, 1), transparent);
            border-top: 1px solid rgba(0, 255, 102, 0.05);
            margin-top: 100px;
          }
          .footer-grid {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 60px;
          }
          .footer-logo {
            font-size: 2.5rem;
            letter-spacing: 12px;
            margin-bottom: 10px;
            color: #fff;
          }
          .footer-tagline {
            font-size: 0.8rem;
            opacity: 0.6;
            letter-spacing: 2px;
            color: var(--silver);
          }
          .network-title {
            font-size: 0.75rem;
            letter-spacing: 5px;
            margin-bottom: 20px;
            opacity: 0.9;
            text-align: right;
          }
          .social-link-wrapper {
            display: flex;
            justify-content: flex-end;
            text-decoration: none;
            color: #fff;
            transition: 0.3s;
          }
          .social-icon-ring {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            border: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background: rgba(255, 255, 255, 0.02);
          }
          .social-link-wrapper:hover .social-icon-ring {
            border-color: var(--primary-theme);
            box-shadow: 0 0 20px var(--primary-theme);
            color: var(--primary-theme);
            transform: translateY(-5px);
          }
          .footer-divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(0, 255, 102, 0.2), transparent);
            margin-bottom: 30px;
          }
          .footer-bottom {
            text-align: center;
          }
          .copyright-text {
            font-size: 0.7rem;
            opacity: 0.5;
            letter-spacing: 2px;
          }

          @media (max-width: 768px) {
            .footer-grid { flex-direction: column; gap: 50px; text-align: center; }
            .network-title { text-align: center; }
            .social-link-wrapper { justify-content: center; }
            .footer-logo { font-size: 2rem; }
          }
          .nav-controls {
            display: flex;
            align-items: center;
            gap: 20px;
          }
          .nav-links {
            display: flex;
            gap: 50px;
            align-items: center;
          }
          .nav-link {
            position: relative;
            padding: 10px 0;
            font-size: 13px;
            letter-spacing: 3px;
            color: rgba(255, 255, 255, 0.7);
            transition: color 0.3s ease;
          }
          .nav-link:hover {
            color: var(--primary-theme);
          }
          .nav-glow-bar {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--primary-theme);
            box-shadow: 0 0 15px var(--primary-theme);
            transition: width 0.3s ease;
          }
          .nav-link:hover .nav-glow-bar {
            width: 100%;
          }
          .mobile-menu-trigger {
            display: none;
            width: 30px;
            height: 22px;
            flex-direction: column;
            justify-content: space-between;
            cursor: pointer;
            z-index: 100000; /* Ensure trigger is ABOVE the panel */
            position: relative;
          }
          .hamburger-line {
            width: 100%;
            height: 2px;
            background: var(--primary-theme);
            box-shadow: 0 0 8px var(--primary-theme);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .mobile-menu-trigger.active .hamburger-line:nth-child(1) { transform: translateY(9px) rotate(45deg); }
          .mobile-menu-trigger.active .hamburger-line:nth-child(2) { opacity: 0; }
          .mobile-menu-trigger.active .hamburger-line:nth-child(3) { transform: translateY(-9px) rotate(-45deg); }

          .mobile-overlay-dim {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(8px);
            z-index: 99998;
          }
          .mobile-side-drawer {
            position: fixed;
            top: 0;
            left: 0;
            width: 80vw;
            height: 100vh;
            background: rgba(2, 5, 2, 0.98);
            border-right: 1px solid rgba(0, 255, 102, 0.2);
            z-index: 99999;
            padding: 30px 25px;
            display: flex;
            flex-direction: column;
            box-shadow: 20px 0 50px rgba(0, 0, 0, 0.5);
          }
          .drawer-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(0, 255, 102, 0.1);
            flex-shrink: 0;
          }
          .drawer-content {
            flex: 1;
            padding-top: 10px;
          }
          .drawer-close {
            color: var(--primary-theme);
            cursor: pointer;
          }
          .drawer-links {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          .drawer-link {
            font-family: 'Orbitron', sans-serif !important;
            font-size: 1.5rem !important;
            letter-spacing: 4px !important;
            color: white !important;
            text-decoration: none !important;
            transition: all 0.3s ease;
            position: relative;
            padding: 10px 0;
            text-align: left;
            display: block;
            width: fit-content;
          }
          .drawer-link:hover {
            color: var(--primary-theme) !important;
            text-shadow: 0 0 20px var(--primary-theme);
            letter-spacing: 5px !important;
          }
          .drawer-link-indicator {
            position: absolute;
            left: -15px;
            top: 50%;
            width: 4px;
            height: 0;
            background: var(--primary-theme);
            box-shadow: 0 0 10px var(--primary-theme);
            transform: translateY(-50%);
            transition: height 0.3s ease;
          }
          .drawer-link:hover .drawer-link-indicator {
            height: 60%;
          }
          .drawer-footer {
            margin-top: auto;
            padding-top: 20px;
            border-top: 1px solid rgba(0, 255, 102, 0.1);
            font-size: 0.6rem;
            opacity: 0.5;
            letter-spacing: 2px;
            line-height: 2;
            flex-shrink: 0;
          }

          @media (max-width: 992px) {
            .nav-links { display: none; }
            .mobile-menu-trigger { display: flex; }
            .nav-container { padding: 0 25px; }
            .navbar { padding: 15px 0 !important; }
          }
          @media (max-width: 480px) {
            .drawer-link { font-size: 1.2rem !important; }
            .nav-container :global(.stark-font) { font-size: 1.1rem !important; }
          }
        `}</style>
      </body>
    </html>
  );
}
