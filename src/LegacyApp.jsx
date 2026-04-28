/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import guideData from "./data/guides";
import destinations from "./data/destinations";

const theme = {
  bg: "#020617",
  surface: "#0f172a",
  card: "#1e293b",
  text: "#e2e8f0",
  muted: "#94a3b8",
  accent: "#22c55e",
  accentStrong: "#16a34a",
  accentSoft: "rgba(34,197,94,0.12)",
  border: "rgba(148,163,184,0.16)",
  glass: "rgba(15,23,42,0.72)",
  shadow: "0 10px 30px rgba(0,0,0,0.2)",
  shadowHover: "0 18px 40px rgba(0,0,0,0.28)",
  heroOverlay:
    "linear-gradient(135deg, rgba(2,6,23,0.84) 0%, rgba(15,23,42,0.58) 52%, rgba(34,197,94,0.22) 100%)",
  footerBg: "#03120a",
  footerText: "rgba(226,232,240,0.72)",
  footerHeading: "#f8fafc",
  inputBg: "#0b1220",
  inputBorder: "rgba(148,163,184,0.22)",
  ctaBg:
    "linear-gradient(135deg, rgba(3,18,10,0.98) 0%, rgba(15,23,42,0.98) 100%)",
  ctaText: "#f8fafc",
  ctaMuted: "rgba(226,232,240,0.72)",
  ctaGhostBorder: "rgba(226,232,240,0.22)",
  pillBg: "rgba(34,197,94,0.14)",
  pillText: "#bbf7d0",
  heroStatBg: "rgba(15,23,42,0.7)",
  heroStatText: "rgba(248,250,252,0.78)",
  ghostBg: "rgba(255,255,255,0.08)",
  ghostBorder: "rgba(255,255,255,0.18)",
  ghostText: "#f8fafc",
  modalBackdrop: "rgba(2,6,23,0.72)",
};

const heroImage =
  "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1800&auto=format&fit=crop";

const navLinks = [
  { label: "Home", to: "/", action: "home" },
  { label: "Destinations", to: "/destinations" },
  { label: "Guides", to: "/guides" },
  { label: "Contact", to: "/", action: "contact" },
];

const features = [
  {
    badge: "Local",
    title: "Hidden Local Spots",
    desc: "Skip the tour buses. Your guide knows the secret beaches, ancient temples, and viewpoints that are not on any tourist list.",
  },
  {
    badge: "Food",
    title: "Authentic Food Experiences",
    desc: "Eat where locals eat. From toddy shops to rooftop fish curries, you get the real Kerala on your plate.",
  },
  {
    badge: "Culture",
    title: "Cultural Insights",
    desc: "Understand what you are seeing. Every ritual, every craft, every face is explained with lived experience.",
  },
  {
    badge: "Trust",
    title: "Verified Safe Guides",
    desc: "Every guide is background checked, reviewed, and verified so you can focus on the experience instead of the risk.",
  },
];

const steps = [
  {
    num: "01",
    tag: "Browse",
    title: "Choose Your Destination",
    desc: "Browse Kerala's finest destinations, from Munnar's tea gardens to Kochi's colonial streets, and pick the kind of trip you want.",
  },
  {
    num: "02",
    tag: "Compare",
    title: "Select Your Guide",
    desc: "Filter by language, specialty, budget, and reviews so you can choose a guide that matches your travel style.",
  },
  {
    num: "03",
    tag: "Confirm",
    title: "Book Instantly",
    desc: "Confirm in seconds with secure payment, instant confirmation, and a direct line to your guide before the trip starts.",
  },
];


const guides = [
  {
    name: "Abishek Rajan",
    location: "Fort Kochi",
    langs: ["English", "Malayalam", "Hindi"],
    specialty: "Heritage and History",
  },
  {
    name: "Eldho Sibi",
    location: "Munnar",
    langs: ["English", "Malayalam", "Tamil"],
    specialty: "Nature and Wildlife",
  },
  {
    name: "Parvathy",
    location: "Alleppey",
    langs: ["English", "Malayalam"],
    specialty: "Backwaters and Villages",
  },
];

const trustItems = [
  {
    label: "BG",
    title: "Background Verified",
    desc: "Every guide goes through identity and background verification before they appear on Hirevoy.",
  },
  {
    label: "ID",
    title: "ID Authenticated",
    desc: "Government issued identity is reviewed so travelers always know who they are meeting.",
  },
  {
    label: "SSL",
    title: "Secure Booking",
    desc: "Encrypted payments, clear pricing, and transparent cancellation handling keep the booking flow safe.",
  },
  {
    label: "REV",
    title: "Ratings and Reviews",
    desc: "Every review comes from a real booking so trust signals stay useful instead of becoming noise.",
  },
];

const heroStats = [
  ["Launching Soon", "Local Guides"],
  ["Be the First", "Kerala Destinations"],
  ["Early Access", "Happy Travelers"],
  ["Building Trust", "Average Rating"],
];

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const openWhatsAppMessage = (text) => {
  const url = `https://wa.me/919778405403?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

const AppStyles = ({ theme }) => (
  <style>{`
    @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap");

    :root {
      --bg: ${theme.bg};
      --surface: ${theme.surface};
      --card: ${theme.card};
      --text: ${theme.text};
      --muted: ${theme.muted};
      --accent: ${theme.accent};
      --accent-strong: ${theme.accentStrong};
      --accent-soft: ${theme.accentSoft};
      --border: ${theme.border};
      --glass: ${theme.glass};
      --shadow: ${theme.shadow};
      --shadow-hover: ${theme.shadowHover};
      --hero-overlay: ${theme.heroOverlay};
      --footer-bg: ${theme.footerBg};
      --footer-text: ${theme.footerText};
      --footer-heading: ${theme.footerHeading};
      --input-bg: ${theme.inputBg};
      --input-border: ${theme.inputBorder};
      --cta-bg: ${theme.ctaBg};
      --cta-text: ${theme.ctaText};
      --cta-muted: ${theme.ctaMuted};
      --cta-ghost-border: ${theme.ctaGhostBorder};
      --pill-bg: ${theme.pillBg};
      --pill-text: ${theme.pillText};
      --hero-stat-bg: ${theme.heroStatBg};
      --hero-stat-text: ${theme.heroStatText};
      --ghost-bg: ${theme.ghostBg};
      --ghost-border: ${theme.ghostBorder};
      --ghost-text: ${theme.ghostText};
      --modal-backdrop: ${theme.modalBackdrop};
    }

    * {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      font-family: "DM Sans", sans-serif;
      background: var(--bg);
      color: var(--text);
      overflow-x: hidden;
      transition: background 0.3s ease, color 0.3s ease;
    }

    a,
    button,
    input,
    textarea {
      font: inherit;
    }

    button {
      cursor: pointer;
    }

    img {
      display: block;
      max-width: 100%;
    }

    ::selection {
      background: var(--accent);
      color: #ffffff;
    }

    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-thumb {
      background: var(--accent);
      border-radius: 999px;
    }

    .app-shell {
      min-height: 100vh;
      background: var(--bg);
      color: var(--text);
      transition: background 0.3s ease, color 0.3s ease;
    }

    .font-display {
      font-family: "Cormorant Garamond", serif;
    }

    .anchor-section,
    footer {
      scroll-margin-top: 110px;
    }

    .section {
      padding: 6rem 2rem;
      transition: background 0.3s ease, color 0.3s ease;
    }

    .section-inner {
      max-width: 1120px;
      margin: 0 auto;
    }

    .section-heading {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-line {
      width: 56px;
      height: 3px;
      margin: 0 auto 1.25rem;
      border-radius: 999px;
      background: linear-gradient(135deg, var(--accent), #86efac);
    }

    .section-title {
      margin: 0;
      font-size: clamp(2rem, 4vw, 3.2rem);
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -0.02em;
    }

    .section-copy {
      max-width: 560px;
      margin: 0.9rem auto 0;
      color: var(--muted);
      line-height: 1.75;
    }

    .glass-panel {
      background: var(--glass);
      border: 1px solid var(--border);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      box-shadow: var(--shadow);
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.55rem;
      border: 0;
      border-radius: 999px;
      padding: 0.95rem 1.5rem;
      font-weight: 600;
      letter-spacing: 0.01em;
      transition: all 0.3s ease;
      text-decoration: none;
    }

    .button:hover {
      transform: scale(1.05);
    }

    .button-primary {
      background: linear-gradient(135deg, var(--accent), var(--accent-strong));
      color: #ffffff;
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
    }

    .button-secondary {
      background: transparent;
      color: var(--text);
      border: 1px solid var(--border);
    }

    .button-ghost {
      background: var(--ghost-bg);
      color: var(--ghost-text);
      border: 1px solid var(--ghost-border);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }

    .button-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .lift-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease,
        border-color 0.3s ease, color 0.3s ease;
    }

    .lift-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-hover);
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.45rem 0.8rem;
      border-radius: 999px;
      background: var(--pill-bg);
      color: var(--pill-text);
      border: 1px solid var(--border);
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .reveal {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.65s ease, transform 0.65s ease;
    }

    .reveal.is-visible {
      opacity: 1;
      transform: translateY(0);
    }

    .delay-1 {
      transition-delay: 0.08s;
    }

    .delay-2 {
      transition-delay: 0.16s;
    }

    .delay-3 {
      transition-delay: 0.24s;
    }

    .nav-shell {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      padding: 1rem 1.25rem;
      transition: padding 0.3s ease;
    }

    .nav-shell.scrolled {
      padding-top: 0.8rem;
      padding-bottom: 0.8rem;
    }

    .nav-bar {
      max-width: 1180px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 0.85rem 1.1rem 0.85rem 1.25rem;
      border-radius: 24px;
    }

    .nav-brand {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      gap: 0.85rem;
      text-decoration: none;
      color: inherit;
      min-width: 0;
    }

    .logo-mark {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      flex: 0 0 auto;
      background: linear-gradient(135deg, var(--accent-strong), var(--accent));
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
    }

    .nav-brand__name {
      font-size: 1.45rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      white-space: nowrap;
    }

    .nav-main {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
      min-width: 0;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 1.35rem;
      margin-left: 1rem;
      min-width: 0;
    }

    .nav-link {
      color: var(--text);
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 500;
      opacity: 0.88;
      transition: color 0.3s ease, opacity 0.3s ease;
    }

    .nav-link:hover {
      color: var(--accent);
      opacity: 1;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      margin-left: auto;
      flex: 0 0 auto;
    }


    .nav-mobile-actions {
      display: none;
      align-items: center;
      gap: 0.7rem;
    }

    .hamburger {
      width: 46px;
      height: 46px;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;
      border-radius: 16px;
      border: 1px solid var(--border);
      background: var(--surface);
      transition: all 0.3s ease;
    }

    .hamburger span {
      display: block;
      width: 20px;
      height: 2px;
      border-radius: 999px;
      background: var(--text);
      transition: all 0.3s ease;
    }

    .hamburger.open span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }

    .hamburger.open span:nth-child(2) {
      opacity: 0;
    }

    .hamburger.open span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }

    .mobile-menu {
      display: none;
      max-width: 1180px;
      margin: 0.7rem auto 0;
      border-radius: 24px;
      padding: 0.8rem;
    }

    .mobile-menu.open {
      display: none;
    }

    .mobile-menu__links {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }

    .mobile-link {
      display: block;
      padding: 0.95rem 1rem;
      border-radius: 16px;
      color: var(--text);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .mobile-link:hover {
      background: var(--accent-soft);
      color: var(--accent);
    }

    .mobile-menu__cta {
      margin-top: 0.75rem;
      width: 100%;
    }

    .hero {
      position: relative;
      min-height: 100vh;
      padding: 8.5rem 1.5rem 8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .hero-background {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      transform: scale(1.06);
      animation: heroZoom 18s ease-in-out infinite alternate;
    }

    .hero-overlay {
      position: absolute;
      inset: 0;
      background: var(--hero-overlay);
    }

    .hero-noise {
      position: absolute;
      inset: 0;
      opacity: 0.05;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    }

    .hero-inner {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
    }

    .hero-content {
      max-width: 820px;
      margin: 0 auto;
      text-align: center;
    }

    .hero-title {
      margin: 1.2rem 0 1rem;
      font-size: clamp(2rem, 6vw, 4rem);
      font-weight: 600;
      line-height: 1.06;
      letter-spacing: -0.03em;
      color: #ffffff;
      overflow-wrap: anywhere;
    }

    .hero-title em {
      color: #bbf7d0;
      font-style: italic;
    }

    .hero-copy {
      max-width: 620px;
      margin: 0 auto 2.1rem;
      font-size: clamp(1rem, 2vw, 1.15rem);
      line-height: 1.75;
      color: rgba(248, 250, 252, 0.8);
    }

    .hero-scroll {
      width: 1px;
      height: 46px;
      margin: 3.25rem auto 0;
      background: linear-gradient(to bottom, rgba(255,255,255,0.55), transparent);
    }

    .hero-stats-wrap {
      position: absolute;
      left: 1.5rem;
      right: 1.5rem;
      bottom: 1.35rem;
      z-index: 1;
    }

    .hero-stats {
      max-width: 1120px;
      margin: 0 auto;
      padding: 1.1rem 1.25rem;
      border-radius: 24px;
      background: var(--hero-stat-bg);
    }

    .hero-stats-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 1rem;
      text-align: center;
    }

    .hero-stat__value {
      color: #bbf7d0;
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: -0.01em;
    }

    .hero-stat__label {
      margin-top: 0.2rem;
      color: var(--hero-stat-text);
      font-size: 0.76rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .cards-grid {
      display: grid;
      gap: 1.5rem;
    }

    .features-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .steps-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .places-grid,
    .guides-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .split-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
    }

    .trust-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }

    .card {
      border-radius: 24px;
      border: 1px solid var(--border);
      background: var(--card);
      box-shadow: var(--shadow);
    }

    .feature-card,
    .step-card,
    .guide-card,
    .trust-card {
      padding: 1.6rem;
    }

    .feature-badge,
    .step-tag,
    .trust-label {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 52px;
      padding: 0.35rem 0.7rem;
      border-radius: 999px;
      background: var(--accent-soft);
      color: var(--accent);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .feature-title,
    .step-title,
    .guide-name,
    .trust-title {
      margin: 1rem 0 0.55rem;
      font-size: 1.08rem;
      font-weight: 700;
    }

    .feature-copy,
    .step-copy,
    .guide-copy,
    .trust-copy,
    .place-copy {
      color: var(--muted);
      line-height: 1.75;
      font-size: 0.94rem;
    }

    .step-number-row {
      display: flex;
      align-items: center;
      gap: 0.9rem;
      margin-bottom: 1.25rem;
    }

    .step-number {
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 1;
      color: var(--accent);
      letter-spacing: -0.04em;
    }

    .place-card {
      overflow: hidden;
    }

    .place-media {
      position: relative;
      height: 220px;
      overflow: hidden;
    }

    .place-media img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }

    .place-card:hover .place-media img {
      transform: scale(1.06);
    }

    .place-media::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(2,6,23,0.78), rgba(2,6,23,0.08));
    }

    .place-chip,
    .place-count {
      position: absolute;
      z-index: 1;
      border-radius: 999px;
      padding: 0.4rem 0.8rem;
      font-size: 0.76rem;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }

    .place-chip {
      top: 1rem;
      left: 1rem;
      color: #ffffff;
      border: 1px solid rgba(255,255,255,0.22);
      background: rgba(255,255,255,0.12);
    }

    .place-count {
      right: 1rem;
      bottom: 1rem;
      color: rgba(248,250,252,0.84);
      background: rgba(2,6,23,0.42);
    }

    .place-body {
      padding: 1.5rem;
    }

    .place-name {
      margin: 0 0 0.55rem;
      font-size: 1.55rem;
      font-weight: 700;
      letter-spacing: -0.03em;
    }

    .guide-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.55rem;
      margin-top: 0.8rem;
    }

    .meta-tag {
      display: inline-flex;
      align-items: center;
      padding: 0.35rem 0.7rem;
      border-radius: 999px;
      background: var(--surface);
      color: var(--muted);
      border: 1px solid var(--border);
      font-size: 0.76rem;
    }

    .guide-topline {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .guide-verification {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.76rem;
      color: var(--accent);
      font-weight: 600;
      letter-spacing: 0.03em;
    }

    .guide-location,
    .guide-subtext {
      color: var(--muted);
      font-size: 0.9rem;
    }

    .guide-action {
      margin-top: 1.35rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .price-note {
      color: var(--accent);
      font-weight: 700;
    }

    .cta-section {
      position: relative;
      overflow: hidden;
      text-align: center;
      background: var(--cta-bg);
      color: var(--cta-text);
    }

    .cta-orb {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle, rgba(34,197,94,0.22) 0%, transparent 70%);
    }

    .cta-orb--large {
      width: 520px;
      height: 520px;
      left: 50%;
      top: -160px;
      transform: translateX(-50%);
    }

    .cta-orb--small {
      width: 220px;
      height: 220px;
      right: -70px;
      bottom: -70px;
    }

    .cta-copy {
      max-width: 640px;
      margin: 0.9rem auto 2rem;
      color: var(--cta-muted);
      line-height: 1.75;
    }

    .cta-ghost {
      background: transparent;
      color: var(--cta-text);
      border: 1px solid var(--cta-ghost-border);
    }

    .footer {
      background: var(--footer-bg);
      color: var(--footer-text);
    }

    .footer-grid {
      display: grid;
      grid-template-columns: minmax(220px, 1.2fr) repeat(3, minmax(140px, 1fr));
      gap: 2rem;
      margin-bottom: 2.5rem;
    }

    .footer-heading {
      margin: 0 0 0.95rem;
      color: var(--footer-heading);
      font-size: 0.95rem;
      font-weight: 700;
    }

    .footer-link {
      color: inherit;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .footer-link:hover {
      color: var(--accent);
    }

    .footer-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border);
      flex-wrap: wrap;
      font-size: 0.84rem;
    }

    .footer-legal {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      flex-wrap: wrap;
    }

    .modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 200;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      background: var(--modal-backdrop);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }

    .modal-card {
      width: min(100%, 460px);
      padding: 1.6rem;
      border-radius: 24px;
      background: var(--card);
      border: 1px solid var(--border);
      box-shadow: var(--shadow-hover);
    }

    .modal-title {
      margin: 0 0 0.45rem;
      font-size: 1.4rem;
      font-weight: 700;
    }

    .modal-copy {
      margin: 0 0 1.2rem;
      color: var(--muted);
      line-height: 1.65;
      font-size: 0.94rem;
    }

    .field-stack {
      display: grid;
      gap: 0.85rem;
    }

    .field-input {
      width: 100%;
      padding: 0.95rem 1rem;
      border-radius: 16px;
      border: 1px solid var(--input-border);
      background: var(--input-bg);
      color: var(--text);
      outline: none;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }

    .field-input:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 4px var(--accent-soft);
    }

    .field-input::placeholder {
      color: var(--muted);
    }

    .field-input--textarea {
      min-height: 120px;
      resize: vertical;
    }

    .modal-error {
      margin: 0.25rem 0 0;
      color: #ef4444;
      font-size: 0.9rem;
    }

    .modal-actions {
      display: flex;
      gap: 0.8rem;
      margin-top: 1.2rem;
    }

    .button-block {
      width: 100%;
    }

    .button-disabled,
    .button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .whatsapp-fab {
      position: fixed;
      right: 1.25rem;
      bottom: 1.25rem;
      z-index: 120;
      width: 62px;
      height: 62px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      color: #ffffff;
      background: linear-gradient(135deg, #25d366, #1fa955);
      box-shadow: 0 14px 32px rgba(37, 211, 102, 0.32);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      animation: whatsappPulse 2.5s infinite;
    }

    .whatsapp-fab:hover {
      transform: translateY(-3px) scale(1.04);
      box-shadow: 0 18px 38px rgba(37, 211, 102, 0.4);
    }

    @keyframes heroZoom {
      from {
        transform: scale(1.06);
      }
      to {
        transform: scale(1.14);
      }
    }

    @keyframes whatsappPulse {
      0% {
        box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.36);
      }
      70% {
        box-shadow: 0 0 0 18px rgba(37, 211, 102, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
      }
    }

    @media (max-width: 1024px) {
      .features-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .places-grid,
      .guides-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .hero-stats-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .footer-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 767px) {
      .section {
        padding: 4rem 1rem;
      }

      .nav-main {
        display: none;
      }

      .nav-mobile-actions {
        display: flex;
      }

      .mobile-menu.open {
        display: block;
      }

      .hero {
        min-height: auto;
        padding: 7.5rem 1rem 2.5rem;
      }

      .hero-copy,
      .section-copy,
      .section-heading,
      .split-copy,
      .footer-brand,
      .guide-action,
      .guide-topline,
      .footer-meta {
        text-align: center;
      }

      .hero-stats-wrap {
        position: static;
        left: auto;
        right: auto;
        bottom: auto;
        margin-top: 2rem;
      }

      .hero-stats {
        padding: 1rem;
      }

      .button-row,
      .modal-actions {
        flex-direction: column;
        align-items: stretch;
      }

      .button-row > *,
      .modal-actions > * {
        width: 100%;
      }

      .features-grid,
      .steps-grid,
      .places-grid,
      .guides-grid,
      .split-grid,
      .trust-grid,
      .footer-grid,
      .hero-stats-grid {
        grid-template-columns: 1fr;
      }

      .guide-topline,
      .guide-action {
        justify-content: center;
      }

      .footer-legal {
        justify-content: center;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation: none !important;
        transition: none !important;
        scroll-behavior: auto !important;
      }

      .reveal {
        opacity: 1;
        transform: none;
      }
    }
  `}</style>
);

const LogoMark = () => (
  <div className="logo-mark" aria-hidden="true">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        fill="white"
      />
      <circle cx="12" cy="9" r="2.5" fill="#16a34a" />
    </svg>
  </div>
);


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleNavClick = (link, event) => {
    closeMenu();

    if (link.action === "home" && location.pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (link.action === "contact") {
      setTimeout(() => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <nav className={`nav-shell ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-bar glass-panel">
        <Link
          to="/"
          className="nav-brand"
          onClick={(event) =>
            handleNavClick({ label: "Home", to: "/", action: "home" }, event)
          }
        >
          <LogoMark />
          <span className="font-display nav-brand__name">Hirevoy</span>
        </Link>

        <div className="nav-main">
          <div className="nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="nav-link"
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={(event) => handleNavClick(link, event)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="nav-actions">

            <button
              type="button"
              className="button button-primary"
              onClick={() => navigate("/guides")}
            >
              Start Exploring
            </button>
          </div>
        </div>

        <div className="nav-mobile-actions">

          <button
            type="button"
            className={`hamburger ${menuOpen ? "open" : ""}`}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`mobile-menu glass-panel ${menuOpen ? "open" : ""}`}>
        <div className="mobile-menu__links">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="mobile-link"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={(event) => handleNavClick(link, event)}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button
          type="button"
          className="button button-primary mobile-menu__cta"
          onClick={() => {
            closeMenu();
            navigate("/guides");
          }}
        >
          Start Exploring
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="hero anchor-section">
      <div
        className="hero-background"
        style={{ backgroundImage: `url("${heroImage}")` }}
      />
      <div className="hero-overlay" />
      <div className="hero-noise" />

      <div className="hero-inner">
        <div className="hero-content reveal is-visible">
          <div className="pill">Early Access Kerala</div>
          <h1 className="font-display hero-title">
            Do Not Just Visit.
            <br />
            <em>Experience It</em> With a Local.
          </h1>
          <p className="hero-copy">
            Book trusted local guides and discover hidden places tourists miss,
            from backwater villages to misty hilltop trails.
          </p>
          <div className="button-row">
            <button
              type="button"
              className="button button-primary"
              onClick={() => navigate("/guides")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Find a Guide
            </button>
            <button
              type="button"
              className="button button-ghost"
              onClick={() => scrollToSection("contact")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Become a Guide
            </button>
          </div>
          <p style={{ marginTop: "1rem", color: "#94a3b8" }}>
            Browse verified local guides across Kerala
          </p>
          <div className="hero-scroll" />
        </div>

        <div className="hero-stats-wrap">
          <div className="hero-stats glass-panel reveal delay-2" data-reveal>
            <div className="hero-stats-grid">
              {heroStats.map(([value, label]) => (
                <div key={label}>
                  <div className="font-display hero-stat__value">{value}</div>
                  <div className="hero-stat__label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => (
  <section className="section" style={{ background: "var(--bg)", paddingTop: 0 }}>
    <div className="section-inner">
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
          Trusted by 100+ travelers
        </p>

        <p style={{ color: "#94a3b8" }}>
          “Had an amazing experience exploring Kochi with a local guide!”
        </p>

        <p style={{ color: "#94a3b8" }}>
          “Much better than typical tourist trips — highly recommend.”
        </p>
      </div>
    </div>
  </section>
);

const PopularGuidesPreview = () => {
  const navigate = useNavigate();

  return (
    <section className="section" style={{ background: "var(--bg)" }}>
      <div className="section-inner">
        <div className="section-container">
          <h2 style={{ marginBottom: "20px" }}>Popular Guides</h2>

          <div className="guides-grid">
            {guideData.slice(0, 3).map((guide) => (
              <div key={guide.id} className="card">
                <h3 className="card-title">{guide.name}</h3>
                <p>{guide.location}</p>

                <button
                  className="primary-btn"
                  style={{ width: "100%", marginTop: "14px" }}
                  onClick={() => navigate(`/guides/${guide.id}`)}
                >
                  View Guide
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ValueProp = () => (
  <section
    className="section anchor-section"
    style={{ background: "var(--surface)" }}
  >
    <div className="section-inner">
      <div className="section-heading reveal" data-reveal>
        <div className="section-line" />
        <h2 className="font-display section-title">Skip the Tourist Traps</h2>
        <p className="section-copy">
          Real travel is messy, unplanned, and deeply human. Hirevoy connects
          you to people who live it every day.
        </p>
      </div>

      <div className="cards-grid features-grid">
        {features.map((feature, index) => (
          <article
            key={feature.title}
            className={`card feature-card lift-card reveal delay-${(index % 3) + 1}`}
            data-reveal
          >
            <span className="feature-badge">{feature.badge}</span>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-copy">{feature.desc}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section
    className="section"
    style={{
      background: "linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%)",
    }}
  >
    <div className="section-inner">
      <div className="section-heading reveal" data-reveal>
        <div className="section-line" />
        <h2 className="font-display section-title">How It Works</h2>
        <p className="section-copy">
          Three simple steps from your couch to a more human Kerala adventure.
        </p>
      </div>

      <div className="cards-grid steps-grid">
        {steps.map((step, index) => (
          <article
            key={step.num}
            className={`card step-card lift-card reveal delay-${(index % 3) + 1}`}
            data-reveal
          >
            <div className="step-number-row">
              <span className="font-display step-number">{step.num}</span>
              <span className="step-tag">{step.tag}</span>
            </div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-copy">{step.desc}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const ExplorePlaces = () => {
  const navigate = useNavigate();

  return (
    <section id="destinations" className="section anchor-section">
      <div className="section-inner">
        <div className="section-heading reveal" data-reveal>
          <div className="section-line" />
          <h2 className="font-display section-title">Explore Places</h2>
          <p className="section-copy">
            Kerala's most unforgettable destinations, handpicked for a great
            Hirevoy experience.
          </p>
        </div>

        <div className="cards-grid places-grid">
          {destinations.map((place) => (
            <div key={place.id} className="destination-card">
              <img src={place.image} alt={place.name} />

              <div className="card-content">
                <span className="destination-tag">{place.tag}</span>
                <h3>{place.name}</h3>
                <p>{place.description}</p>

                <button
                  className="primary-btn"
                  onClick={() => navigate(`/guides?location=${place.name}`)}
                >
                  Explore with a Guide
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedGuides = ({ onBookNow }) => (
  <section
    id="guides"
    className="section anchor-section"
    style={{
      background: "linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%)",
    }}
  >
    <div className="section-inner">
      <div className="section-heading reveal" data-reveal>
        <div className="section-line" />
        <h2 className="font-display section-title">Meet Your Guides</h2>
        <p className="section-copy">
          Our first cohort of early access guides is ready to show you Kerala
          before the crowds arrive.
        </p>
      </div>

      <div className="cards-grid guides-grid">
        {guides.map((guide, index) => (
          <article
            key={guide.name}
            className={`card guide-card lift-card reveal delay-${(index % 3) + 1}`}
            data-reveal
          >
            <div className="guide-topline">
              <div>
                <h3 className="guide-name">{guide.name}</h3>
                <div className="guide-location">{guide.location}</div>
              </div>
              <span className="guide-verification">Verified Identity</span>
            </div>

            <span className="pill" style={{ fontSize: "0.72rem" }}>
              {guide.specialty}
            </span>

            <div className="guide-meta">
              <span className="meta-tag">Early Guide</span>
              <span className="meta-tag">Recently Joined</span>
            </div>

            <p className="guide-copy" style={{ marginTop: "1rem" }}>
              Languages: {guide.langs.join(", ")}
            </p>

            <div className="guide-action">
              <span className="price-note">Contact to know pricing</span>
              <button
                type="button"
                className="button button-primary"
                onClick={onBookNow}
              >
                Chat with Guide
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const TrustSection = () => (
  <section
    className="section"
    style={{ background: "var(--surface)" }}
  >
    <div className="section-inner split-grid">
      <div className="reveal" data-reveal>
        <div className="section-line" style={{ marginLeft: 0 }} />
        <h2 className="font-display section-title">Your Safety Matters to Us</h2>
        <p className="section-copy" style={{ marginLeft: 0 }}>
          We do not just list guides. We vet them. Every person on Hirevoy is
          reviewed before launch so travelers can focus on the experience.
        </p>
        <div style={{ marginTop: "1.6rem" }}>
          <button type="button" className="button button-primary">
            Learn About Our Safety Process
          </button>
        </div>
      </div>

      <div className="trust-grid">
        {trustItems.map((item, index) => (
          <article
            key={item.title}
            className={`card trust-card lift-card reveal delay-${(index % 3) + 1}`}
            data-reveal
          >
            <span className="trust-label">{item.label}</span>
            <h3 className="trust-title">{item.title}</h3>
            <p className="trust-copy">{item.desc}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="section cta-section">
      <div className="cta-orb cta-orb--large" />
      <div className="cta-orb cta-orb--small" />

      <div className="section-inner" style={{ position: "relative" }}>
        <div className="reveal" data-reveal>
          <div className="pill">Ready to explore</div>
          <h2
            className="font-display"
            style={{
              margin: "1.15rem 0 0",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 600,
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
            }}
          >
            Ready to explore Kerala?
            <br />
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
              Go With a Local
            </em>
          </h2>
          <p className="cta-copy">
            We are just getting started. Be among the first travelers to
            experience Kerala through the eyes of a local guide.
          </p>
          <div className="button-row">
            <button
              type="button"
              className="button button-primary"
              onClick={() => navigate("/guides")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Browse Guides
            </button>
            <button
              type="button"
              className="button cta-ghost"
              onClick={() => navigate("/destinations")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Browse Destinations
            </button>
          </div>
          <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>
            Limited guides available per location
          </p>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <div
    id="contact"
    style={{
      marginTop: "4rem",
      padding: "3rem 2rem",
      background: "#020617",
      color: "white",
      borderTop: "1px solid rgba(255,255,255,0.08)",
    }}
  >
    <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "1rem" }}>Contact Hirevoy</h2>

      <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
        Looking for a local guide or have questions? Reach out directly.
      </p>

      <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
        Connecting travelers with verified local guides across Kerala
      </p>

      <div style={{ marginBottom: "1.5rem" }}>
        <p>📞 +91 9778405403</p>
        <p>📍 Kerala, India</p>
      </div>

      <button
        type="button"
        onClick={() => {
          const confirm = window.confirm(
            "Continue to WhatsApp to chat with Hirevoy?"
          );

          if (!confirm) return;

          const msg = "Hi! I found Hirevoy and want to know more.";
          window.open(
            `https://wa.me/919778405403?text=${encodeURIComponent(msg)}`
          );
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.transform = "scale(1)";
        }}
        style={{
          padding: "12px 18px",
          background: "linear-gradient(135deg, #22c55e, #16a34a)",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 6px 20px rgba(34,197,94,0.3)",
          transition: "transform 0.2s ease",
        }}
      >
        Chat on WhatsApp
      </button>

      <p style={{ marginTop: "1rem", color: "#94a3b8", fontSize: "0.85rem" }}>
        Usually responds within minutes ⚡
      </p>

      <div
        style={{
          marginTop: "2rem",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "1rem",
          fontSize: "0.85rem",
          color: "#94a3b8",
        }}
      >
        © 2026 Hirevoy — Explore Kerala with local guides
      </div>
    </div>
  </div>
);

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    message: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    const nodes = document.querySelectorAll("[data-reveal]");
    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  const isFormValid = formData.name.trim() && formData.location.trim();

  const handleInputChange = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
    if (error) {
      setError("");
    }
  };

  const handleGuideSubmit = () => {
    if (!isFormValid) {
      setError("Please fill in your name and location.");
      return;
    }

    const confirm = window.confirm(
      "Continue to WhatsApp to chat with Hirevoy?"
    );

    if (!confirm) return;

    const text = `Hi! I found Hirevoy 👋

I'm interested in booking a local guide.

📍 Location: ${formData.location}
👤 Guide: Local guide recommendation
💰 Budget: To be discussed
Name: ${formData.name}
Message: ${formData.message || "A local guide recommendation."}

Can you share details and availability?`;

    openWhatsAppMessage(text);
    setShowForm(false);
    setFormData({ name: "", location: "", message: "" });
    setError("");
  };

  return (
    <div
      className="app-shell"
      style={{
        background: theme.bg,
        color: theme.text,
        minHeight: "100vh",
        transition: "all 0.3s ease",
      }}
    >
      <AppStyles theme={theme} />

      <Navbar />

      <main>
        <Hero />
        <SocialProof />
        <PopularGuidesPreview />
        <ValueProp />
        <HowItWorks />
        <ExplorePlaces />
        <FeaturedGuides onBookNow={() => setShowForm(true)} />
        <TrustSection />
        <FinalCTA />
      </main>

      <Footer />

      <a
        href={`https://wa.me/919778405403?text=${encodeURIComponent(
          `Hi! I found Hirevoy 👋

I'm interested in booking a local guide.

📍 Location: Kerala
👤 Guide: Local guide recommendation
💰 Budget: To be discussed

Can you share details and availability?`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        onClick={(event) => {
          const confirm = window.confirm(
            "Continue to WhatsApp to chat with Hirevoy?"
          );

          if (!confirm) {
            event.preventDefault();
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="28"
          height="28"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16 .5C7.4.5.5 7.4.5 16c0 2.8.7 5.4 2.1 7.7L.5 31.5l8-2.1c2.2 1.2 4.6 1.8 7.1 1.8 8.6 0 15.5-6.9 15.5-15.5S24.6.5 16 .5zm0 28.3c-2.3 0-4.5-.6-6.5-1.7l-.5-.3-4.7 1.2 1.3-4.6-.3-.5c-1.2-2-1.9-4.3-1.9-6.7C3.4 8.6 9.6 2.4 16 2.4S28.6 8.6 28.6 16 22.4 28.8 16 28.8zm7.5-9.3c-.4-.2-2.4-1.2-2.8-1.3-.4-.2-.6-.2-.9.2s-1 1.3-1.2 1.6c-.2.2-.4.3-.8.1-2.3-1.1-3.8-2-5.3-4.5-.4-.7.4-.6 1.1-2 .1-.2.1-.5 0-.7-.1-.2-.9-2.2-1.2-3-.3-.8-.6-.7-.9-.7h-.7c-.2 0-.7.1-1 .5s-1.4 1.4-1.4 3.4 1.5 4 1.7 4.3c.2.3 3 4.6 7.4 6.5 1 .4 1.8.6 2.4.8 1 .3 1.9.2 2.6.1.8-.1 2.4-1 2.8-1.9.3-.9.3-1.7.2-1.9-.1-.2-.3-.3-.7-.5z" />
        </svg>
      </a>

      {showForm && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h2 className="modal-title">Request a Guide</h2>
            <p className="modal-copy">
              Tell us where you are coming from and what you want to explore.
              We will open WhatsApp with your request ready to send.
            </p>

            <div className="field-stack">
              <input
                className="field-input"
                placeholder="Your name"
                value={formData.name}
                onChange={(event) =>
                  handleInputChange("name", event.target.value)
                }
              />
              <input
                className="field-input"
                placeholder="Your location"
                value={formData.location}
                onChange={(event) =>
                  handleInputChange("location", event.target.value)
                }
              />
              <textarea
                className="field-input field-input--textarea"
                placeholder="Tell us what you want to explore"
                value={formData.message}
                onChange={(event) =>
                  handleInputChange("message", event.target.value)
                }
              />
              {error ? <p className="modal-error">{error}</p> : null}
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className={`button button-primary button-block ${!isFormValid ? "button-disabled" : ""
                  }`}
                disabled={!isFormValid}
                onClick={handleGuideSubmit}
              >
                Submit on WhatsApp
              </button>
              <button
                type="button"
                className="button button-secondary button-block"
                onClick={() => setShowForm(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
