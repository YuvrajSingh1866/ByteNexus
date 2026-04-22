<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Subjects — ByteNexus</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;700&display=swap" rel="stylesheet">
<style>
/* ===== ROOT VARIABLES ===== */
:root {
  --bg-primary: #020617;
  --bg-secondary: #0a0f1e;
  --bg-card: rgba(13, 20, 40, 0.85);
  --bg-card-hover: rgba(18, 28, 55, 0.95);
  --accent-green: #22c55e;
  --accent-green-dim: rgba(34, 197, 94, 0.12);
  --accent-green-border: rgba(34, 197, 94, 0.25);
  --accent-blue: #38bdf8;
  --accent-purple: #a78bfa;
  --accent-cyan: #22d3ee;
  --text-primary: #f1f5f9;
  --text-secondary: #64748b;
  --text-muted: #334155;
  --border: rgba(148, 163, 184, 0.08);
  --border-hover: rgba(34, 197, 94, 0.3);
  --shadow-card: 0 4px 24px rgba(0,0,0,0.4);
  --shadow-hover: 0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(34,197,94,0.08);
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
  font-family: 'Syne', sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  overflow-x: hidden;
  cursor: none;
  min-height: 100vh;
}

/* ===== CURSOR ===== */
#cursor, #cursor-ring {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  will-change: transform;
  backface-visibility: hidden;
  top: 0; left: 0;
}
#cursor {
  width: 10px; height: 10px;
  background: var(--accent-green);
  z-index: 99999;
  box-shadow: 0 0 12px var(--accent-green), 0 0 24px rgba(34,197,94,0.4);
  transition: width .2s ease, height .2s ease, background .2s ease;
}
#cursor-ring {
  width: 36px; height: 36px;
  border: 1.5px solid rgba(34,197,94,0.5);
  z-index: 99998;
  transition: width .2s ease, height .2s ease, border-color .2s ease;
}
body.hovering #cursor { width: 18px; height: 18px; background: var(--accent-cyan); box-shadow: 0 0 20px var(--accent-cyan); }
body.hovering #cursor-ring { width: 52px; height: 52px; border-color: rgba(34,197,94,0.3); }

/* ===== BACKGROUND ===== */
#bg-canvas {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 0;
  pointer-events: none;
}

.blob {
  position: fixed;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  animation: blobFloat 10s ease-in-out infinite;
}
.blob-1 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(34,197,94,0.15), rgba(56,189,248,0.08)); top: -150px; left: -100px; opacity: 0.6; }
.blob-2 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(167,139,250,0.1), rgba(34,197,94,0.06)); bottom: 5%; right: -100px; opacity: 0.5; animation-delay: -4s; }
.blob-3 { width: 300px; height: 300px; background: radial-gradient(circle, rgba(34,211,238,0.08), transparent); top: 50%; left: 45%; opacity: 0.4; animation-delay: -7s; }

@keyframes blobFloat {
  0%, 100% { transform: translate(0,0) scale(1); }
  33% { transform: translate(20px,-25px) scale(1.04); }
  66% { transform: translate(-15px,15px) scale(0.97); }
}

/* ===== NAVBAR ===== */
nav {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 1200px;
  z-index: 1000;
  background: rgba(2,6,23,0.75);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 0 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  transition: background 0.3s ease;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  cursor: none;
}

.nav-logo-svg {
  width: 36px; height: 36px;
  flex-shrink: 0;
  filter: drop-shadow(0 0 7px rgba(56,189,248,0.5)) drop-shadow(0 0 18px rgba(167,139,250,0.3));
  transition: filter 0.3s ease;
}
.nav-logo:hover .nav-logo-svg {
  filter: drop-shadow(0 0 13px rgba(56,189,248,0.8)) drop-shadow(0 0 28px rgba(167,139,250,0.5));
}

.nav-logo-text { display: flex; flex-direction: column; line-height: 1; }
.nav-logo-main {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: -0.03em;
  background: linear-gradient(110deg, #38bdf8 0%, #a78bfa 55%, #22d3ee 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.nav-logo-sub {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.44rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #64748b;
  -webkit-text-fill-color: #64748b;
  margin-top: 1px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
}
.nav-links a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 7px 13px;
  border-radius: 10px;
  transition: all 0.2s ease;
  cursor: none;
}
.nav-links a:hover { color: var(--text-primary); background: rgba(34,197,94,0.07); }
.nav-links a.active {
  color: var(--accent-green);
  background: rgba(34,197,94,0.08);
  border: 1px solid rgba(34,197,94,0.15);
}

.nav-cta {
  background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple)) !important;
  color: white !important;
  -webkit-text-fill-color: white !important;
  padding: 7px 18px !important;
  border-radius: 10px !important;
  font-weight: 600 !important;
  box-shadow: 0 0 20px rgba(56,189,248,0.15);
}
.nav-cta:hover { box-shadow: 0 0 30px rgba(56,189,248,0.35) !important; transform: translateY(-1px); }

/* ===== MAIN CONTENT ===== */
main {
  position: relative;
  z-index: 1;
  padding-top: 110px;
}

/* ===== HERO / HEADER ===== */
.page-hero {
  padding: 60px 20px 50px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: var(--text-secondary);
  margin-bottom: 28px;
  letter-spacing: 0.05em;
}
.page-breadcrumb span { color: var(--accent-green); }
.page-breadcrumb .sep { opacity: 0.4; }

.page-title {
  font-size: clamp(2.8rem, 6vw, 5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.05;
  margin-bottom: 16px;
  animation: fadeInUp 0.7s ease both;
}

.page-title .highlight {
  background: linear-gradient(135deg, var(--accent-green), #86efac, var(--accent-cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200%;
  animation: gradShift 4s ease infinite;
}

@keyframes gradShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.page-subtitle {
  font-size: 1.05rem;
  color: var(--text-secondary);
  max-width: 560px;
  line-height: 1.7;
  margin-bottom: 40px;
  animation: fadeInUp 0.7s ease 0.1s both;
}

/* ===== SEARCH BAR ===== */
.search-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  animation: fadeInUp 0.7s ease 0.2s both;
}

.search-box {
  flex: 1;
  min-width: 280px;
  max-width: 520px;
  position: relative;
}

.search-box input {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 14px 18px 14px 48px;
  font-family: 'Syne', sans-serif;
  font-size: 0.925rem;
  color: var(--text-primary);
  outline: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(12px);
}
.search-box input::placeholder { color: var(--text-secondary); }
.search-box input:focus {
  border-color: var(--accent-green-border);
  background: rgba(34,197,94,0.04);
  box-shadow: 0 0 0 3px rgba(34,197,94,0.08);
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  font-size: 1rem;
  pointer-events: none;
  transition: color 0.3s ease;
}
.search-box input:focus ~ .search-icon { color: var(--accent-green); }

.search-clear {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: none;
  font-size: 1rem;
  display: none;
  padding: 2px 6px;
  border-radius: 6px;
  transition: all 0.2s ease;
}
.search-clear:hover { color: var(--text-primary); background: rgba(255,255,255,0.06); }
.search-clear.visible { display: flex; }

.btn-filter {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 22px;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  border-radius: 14px;
  color: var(--text-secondary);
  font-family: 'Syne', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(12px);
  white-space: nowrap;
}
.btn-filter:hover {
  border-color: var(--accent-green-border);
  color: var(--accent-green);
  background: var(--accent-green-dim);
}
.btn-filter.active {
  border-color: var(--accent-green);
  color: var(--accent-green);
  background: var(--accent-green-dim);
  box-shadow: 0 0 16px rgba(34,197,94,0.12);
}

.result-count {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  color: var(--text-secondary);
  padding: 6px 0;
  letter-spacing: 0.03em;
  align-self: center;
}
.result-count strong { color: var(--accent-green); font-weight: 700; }

/* ===== FILTER PANEL ===== */
.filter-panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.23,1,0.32,1), opacity 0.3s ease;
  opacity: 0;
  margin-top: 0;
}
.filter-panel.open {
  max-height: 200px;
  opacity: 1;
  margin-top: 16px;
}

.filter-inner {
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: var(--text-secondary);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-right: 4px;
}

.filter-chip {
  padding: 6px 14px;
  border-radius: 100px;
  border: 1px solid var(--border);
  background: rgba(255,255,255,0.03);
  color: var(--text-secondary);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  cursor: none;
  transition: all 0.25s ease;
}
.filter-chip:hover { border-color: var(--accent-green-border); color: var(--accent-green); background: var(--accent-green-dim); }
.filter-chip.active { border-color: var(--accent-green); color: var(--accent-green); background: var(--accent-green-dim); box-shadow: 0 0 12px rgba(34,197,94,0.1); }

/* ===== DIVIDER ===== */
.page-divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(34,197,94,0.15), transparent);
  max-width: 1200px;
  margin: 10px auto 0;
}

/* ===== SUBJECTS CONTENT ===== */
.subjects-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 20px 80px;
}

/* ===== YEAR SECTION ===== */
.year-section { margin-bottom: 64px; }
.year-section.hidden { display: none; }

.year-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
}

.year-heading {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text-primary);
}

.year-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--accent-green-dim);
  border: 1px solid var(--accent-green-border);
  border-radius: 100px;
  padding: 4px 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: var(--accent-green);
  font-weight: 600;
  letter-spacing: 0.05em;
}

.year-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--border), transparent);
}

/* ===== SUBJECTS GRID ===== */
.subjects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

/* ===== SUBJECT CARD ===== */
.subject-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 20px 22px;
  display: flex;
  align-items: center;
  gap: 18px;
  cursor: none;
  position: relative;
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
  backdrop-filter: blur(16px);
  animation: cardIn 0.5s ease both;
}

.subject-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 0% 0%, rgba(34,197,94,0.06), transparent 60%);
  opacity: 0;
  transition: opacity 0.35s ease;
  border-radius: 18px;
}

.subject-card:hover::before { opacity: 1; }

.subject-card:hover {
  transform: translateY(-6px);
  border-color: var(--border-hover);
  background: var(--bg-card-hover);
  box-shadow: var(--shadow-hover);
}

.subject-card.hidden { display: none; }

@keyframes cardIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Icon box */
.subject-icon-box {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(34,197,94,0.07);
  border: 1px solid rgba(34,197,94,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
  transition: all 0.35s ease;
  position: relative;
}

.subject-card:hover .subject-icon-box {
  background: rgba(34,197,94,0.12);
  border-color: rgba(34,197,94,0.3);
  box-shadow: 0 0 20px rgba(34,197,94,0.15);
  transform: scale(1.08) rotate(-3deg);
}

/* Subject info */
.subject-info { flex: 1; min-width: 0; }

.subject-name {
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  margin-bottom: 4px;
  line-height: 1.35;
  transition: color 0.2s ease;
}
.subject-card:hover .subject-name { color: #f8fafc; }

.subject-year-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  color: var(--text-secondary);
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 6px;
}
.subject-year-tag::before {
  content: '';
  width: 4px; height: 4px;
  border-radius: 50%;
  background: var(--accent-green);
  opacity: 0.6;
  flex-shrink: 0;
}

/* View link */
.subject-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--accent-green);
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid rgba(34,197,94,0.18);
  background: rgba(34,197,94,0.06);
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.25s ease;
  cursor: none;
  opacity: 0;
  transform: translateX(6px);
}
.subject-card:hover .subject-link {
  opacity: 1;
  transform: translateX(0);
  border-color: rgba(34,197,94,0.35);
  background: rgba(34,197,94,0.1);
  box-shadow: 0 0 14px rgba(34,197,94,0.12);
}

/* Arrow animation */
.subject-link .arrow {
  transition: transform 0.25s ease;
  display: inline-block;
}
.subject-link:hover .arrow { transform: translateX(3px); }

/* ===== NO RESULTS ===== */
.no-results {
  display: none;
  text-align: center;
  padding: 80px 20px;
  grid-column: 1 / -1;
}
.no-results.visible { display: block; }
.no-results-icon { font-size: 3rem; margin-bottom: 16px; opacity: 0.5; }
.no-results h3 { font-size: 1.3rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; }
.no-results p { color: var(--text-secondary); font-size: 0.9rem; }

/* ===== ANIMATIONS ===== */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ===== SCROLLBAR ===== */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg-primary); }
::-webkit-scrollbar-thumb { background: rgba(34,197,94,0.25); border-radius: 2px; }

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .subjects-grid { grid-template-columns: 1fr; }
  .nav-links { display: none; }
  .search-wrap { flex-direction: column; align-items: stretch; }
  .search-box { max-width: 100%; }
  .page-title { font-size: 2.5rem; }
}
@media (max-width: 480px) {
  .subject-card { flex-wrap: wrap; }
  .subject-link { opacity: 1; transform: none; }
}
</style>
</head>
<body>

<!-- CURSOR -->
<div id="cursor"></div>
<div id="cursor-ring"></div>

<!-- BACKGROUND -->
<div class="blob blob-1"></div>
<div class="blob blob-2"></div>
<div class="blob blob-3"></div>
<canvas id="bg-canvas"></canvas>

<!-- ===== NAVBAR ===== -->
<nav id="navbar">
  <a class="nav-logo" href="bytenexus.html">
    <svg class="nav-logo-svg" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="nlg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stop-color="#38bdf8"/>
          <stop offset="50%"  stop-color="#a78bfa"/>
          <stop offset="100%" stop-color="#22d3ee"/>
        </linearGradient>
        <linearGradient id="nlg2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stop-color="#22d3ee" stop-opacity="0.7"/>
          <stop offset="100%" stop-color="#a78bfa" stop-opacity="0.7"/>
        </linearGradient>
        <linearGradient id="nlg3" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%"   stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#a78bfa"/>
        </linearGradient>
        <filter id="nglow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <path d="M21 2 L37 11 L37 31 L21 40 L5 31 L5 11 Z" stroke="url(#nlg1)" stroke-width="1.5" fill="none" opacity="0.7"/>
      <path d="M21 8 L31 14 L31 28 L21 34 L11 28 L11 14 Z" fill="url(#nlg1)" opacity="0.04" stroke="url(#nlg2)" stroke-width="0.8"/>
      <line x1="21" y1="2"  x2="21" y2="8"  stroke="url(#nlg3)" stroke-width="1.2" opacity="0.8"/>
      <line x1="37" y1="11" x2="31" y2="14" stroke="url(#nlg3)" stroke-width="1.2" opacity="0.8"/>
      <line x1="37" y1="31" x2="31" y2="28" stroke="url(#nlg3)" stroke-width="1.2" opacity="0.8"/>
      <line x1="21" y1="40" x2="21" y2="34" stroke="url(#nlg3)" stroke-width="1.2" opacity="0.8"/>
      <line x1="5"  y1="31" x2="11" y2="28" stroke="url(#nlg3)" stroke-width="1.2" opacity="0.8"/>
      <line x1="5"  y1="11" x2="11" y2="14" stroke="url(#nlg3)" stroke-width="1.2" opacity="0.8"/>
      <path d="M16 14 L16 28 L22.5 28 C25.5 28 27.5 26.5 27.5 24.2 C27.5 22.5 26.4 21.2 24.7 20.7 C26.1 20.1 27 18.9 27 17.4 C27 15.1 25.2 14 22.2 14 Z M18.2 15.9 L21.5 15.9 C23.3 15.9 24.7 16.7 24.7 18.2 C24.7 19.6 23.5 20.5 21.5 20.5 L18.2 20.5 Z M18.2 22.2 L22 22.2 C24 22.2 25.2 23.1 25.2 24.3 C25.2 25.6 24.1 26.3 22 26.3 L18.2 26.3 Z"
            fill="url(#nlg1)" filter="url(#nglow)"/>
      <circle cx="21" cy="2"  r="2.5" fill="url(#nlg3)" opacity="0.95"/>
      <circle cx="37" cy="11" r="2.0" fill="url(#nlg1)" opacity="0.85"/>
      <circle cx="37" cy="31" r="2.0" fill="url(#nlg2)" opacity="0.85"/>
      <circle cx="21" cy="40" r="2.5" fill="url(#nlg3)" opacity="0.95"/>
      <circle cx="5"  cy="31" r="1.7" fill="url(#nlg1)" opacity="0.7"/>
      <circle cx="5"  cy="11" r="1.7" fill="url(#nlg2)" opacity="0.7"/>
    </svg>
    <div class="nav-logo-text">
      <span class="nav-logo-main">ByteNexus</span>
      <span class="nav-logo-sub">Dev Platform</span>
    </div>
  </a>
  <ul class="nav-links">
    <li><a href="bytenexus.html">Main</a></li>
    <li><a href="#" class="active">Academic ▾</a></li>
    <li><a href="#">Community</a></li>
    <li><a href="#">Updates</a></li>
    <li><a href="#" class="nav-cta">Login →</a></li>
  </ul>
</nav>

<!-- ===== MAIN ===== -->
<main>

  <!-- HERO -->
  <div class="page-hero">
    <div class="page-breadcrumb">
      <span>ByteNexus</span>
      <span class="sep">/</span>
      <span>Academic</span>
      <span class="sep">/</span>
      <span style="color: var(--text-primary);">Subjects</span>
    </div>

    <h1 class="page-title">
      <span class="highlight">Subjects</span>
    </h1>
    <p class="page-subtitle">Browse and search through our comprehensive collection of academic resources</p>

    <div class="search-wrap">
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input type="text" id="searchInput" placeholder="Search subjects…" autocomplete="off"/>
        <button class="search-clear" id="clearBtn" title="Clear">✕</button>
      </div>
      <button class="btn-filter" id="filterBtn">
        <span>⚙ Filters</span>
      </button>
      <p class="result-count" id="resultCount">Showing all <strong>28</strong> subjects</p>
    </div>

    <!-- FILTER PANEL -->
    <div class="filter-panel" id="filterPanel">
      <div class="filter-inner">
        <span class="filter-label">Year:</span>
        <button class="filter-chip active" data-filter="all">All Years</button>
        <button class="filter-chip" data-filter="year1">1st Year</button>
        <button class="filter-chip" data-filter="year2">2nd Year</button>
        <button class="filter-chip" data-filter="year3">3rd Year</button>
      </div>
    </div>
  </div>

  <div class="page-divider"></div>

  <!-- SUBJECTS -->
  <div class="subjects-content">

    <!-- YEAR 1 -->
    <div class="year-section" id="section-year1">
      <div class="year-header">
        <h2 class="year-heading">1st Year</h2>
        <span class="year-badge">● 9 subjects</span>
        <div class="year-line"></div>
      </div>
      <div class="subjects-grid" id="grid-year1">

        <div class="subject-card" data-year="year1" data-name="calculus and statistics">
          <div class="subject-icon-box">📐</div>
          <div class="subject-info">
            <div class="subject-name">Calculus and Statistics</div>
            <div class="subject-year-tag">CSE – 1st Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

        <div class="subject-card" data-year="year1" data-name="differential equations and transformation">
          <div class="subject-icon-box">∂</div>
          <div class="subject-info">
            <div class="subject-name">Differential Equations and Transformation</div>
            <div class="subject-year-tag">CSE – 1st Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

        <div class="subject-card" data-year="year1" data-name="digital electronics and computer architecture">
          <div class="subject-icon-box">⚡</div>
          <div class="subject-info">
            <div class="subject-name">Digital Electronics and Computer Architecture</div>
            <div class="subject-year-tag">CSE – 1st Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

        <div class="subject-card" data-year="year1" data-name="front end engineering">
          <div class="subject-icon-box">🎨</div>
          <div class="subject-info">
            <div class="subject-name">Front End Engineering</div>
            <div class="subject-year-tag">CSE – 1st Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

        <div class="subject-card" data-year="year1" data-name="fundamentals of computer science">
          <div class="subject-icon-box">💻</div>
          <div class="subject-info">
            <div class="subject-name">Fundamentals of Computer Science</div>
            <div class="subject-year-tag">CSE – 1st Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

        <div class="subject-card" data-year="year1" data-name="modern and computational physics">
          <div class="subject-icon-box">⚛️</div>
          <div class="subject-info">
            <div class="subject-name">Modern and Computational Physics</div>
            <div class="subject-year-tag">CSE – 1st Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

        <div class="subject-card" data-year="year1" data-name="operating system">
          <div class="subject-icon-box">🖥️</div>
          <div class="subject-info">
            <div class="subject-name">Operating System</div>
            <div class="subject-year-tag">CSE – 1st Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

        <div class="subject-card" data-year="year1" data-name="python programming">
          <div class="subject-icon-box">🐍</div>
          <div class="subject-info">
            <div class="subject-name">Python Programming</div>
            <div class="subject-year-tag">CSE – 1st Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

        <div class="subject-card" data-year="year1" data-name="source code management">
          <div class="subject-icon-box">🌿</div>
          <div class="subject-info">
            <div class="subject-name">Source Code Management</div>
            <div class="subject-year-tag">CSE – 1st Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

      </div>
    </div>

    <!-- YEAR 2 -->
    <div class="year-section" id="section-year2">
      <div class="year-header">
        <h2 class="year-heading">2nd Year</h2>
        <span class="year-badge">● 11 subjects</span>
        <div class="year-line"></div>
      </div>
      <div class="subjects-grid" id="grid-year2">

        <div class="subject-card" data-year="year2" data-name="artificial intelligence and machine learning">
          <div class="subject-icon-box">🤖</div>
          <div class="subject-info">
            <div class="subject-name">Artificial Intelligence and Machine Learning</div>
            <div class="subject-year-tag">CSE – 2nd Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

        <div class="subject-card" data-year="year2" data-name="computer networks">
          <div class="subject-icon-box">🌐</div>
          <div class="subject-info">
            <div class="subject-name">Computer Networks</div>
            <div class="subject-year-tag">CSE – 2nd Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

        <div class="subject-card" data-year="year2" data-name="computer organization and architecture">
          <div class="subject-icon-box">🔧</div>
          <div class="subject-info">
            <div class="subject-name">Computer Organization and Architecture</div>
            <div class="subject-year-tag">CSE – 2nd Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

        <div class="subject-card" data-year="year2" data-name="data structures and algorithms">
          <div class="subject-icon-box">🧩</div>
          <div class="subject-info">
            <div class="subject-name">Data Structures and Algorithms</div>
            <div class="subject-year-tag">CSE – 2nd Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

        <div class="subject-card" data-year="year2" data-name="database management system">
          <div class="subject-icon-box">🗄️</div>
          <div class="subject-info">
            <div class="subject-name">Database Management System</div>
            <div class="subject-year-tag">CSE – 2nd Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

        <div class="subject-card" data-year="year2" data-name="discrete structures">
          <div class="subject-icon-box">🔢</div>
          <div class="subject-info">
            <div class="subject-name">Discrete Structures</div>
            <div class="subject-year-tag">CSE – 2nd Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

        <div class="subject-card" data-year="year2" data-name="embedded system and internet of things">
          <div class="subject-icon-box">📡</div>
          <div class="subject-info">
            <div class="subject-name">Embedded System and Internet of Things</div>
            <div class="subject-year-tag">CSE – 2nd Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

        <div class="subject-card" data-year="year2" data-name="front end engineering ii">
          <div class="subject-icon-box">⚡</div>
          <div class="subject-info">
            <div class="subject-name">Front End Engineering II</div>
            <div class="subject-year-tag">CSE – 2nd Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

        <div class="subject-card" data-year="year2" data-name="linux">
          <div class="subject-icon-box">🐧</div>
          <div class="subject-info">
            <div class="subject-name">Linux</div>
            <div class="subject-year-tag">CSE – 2nd Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

        <div class="subject-card" data-year="year2" data-name="object oriented software engineering">
          <div class="subject-icon-box">🔷</div>
          <div class="subject-info">
            <div class="subject-name">Object Oriented Software Engineering</div>
            <div class="subject-year-tag">CSE – 2nd Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

        <div class="subject-card" data-year="year2" data-name="software testing">
          <div class="subject-icon-box">✅</div>
          <div class="subject-info">
            <div class="subject-name">Software Testing</div>
            <div class="subject-year-tag">CSE – 2nd Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

      </div>
    </div>

    <!-- YEAR 3 -->
    <div class="year-section" id="section-year3">
      <div class="year-header">
        <h2 class="year-heading">3rd Year</h2>
        <span class="year-badge">● 8 subjects</span>
        <div class="year-line"></div>
      </div>
      <div class="subjects-grid" id="grid-year3">

        <div class="subject-card" data-year="year3" data-name="compiler design">
          <div class="subject-icon-box">⚙️</div>
          <div class="subject-info">
            <div class="subject-name">Compiler Design</div>
            <div class="subject-year-tag">CSE – 3rd Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

        <div class="subject-card" data-year="year3" data-name="computer graphics">
          <div class="subject-icon-box">🖼️</div>
          <div class="subject-info">
            <div class="subject-name">Computer Graphics</div>
            <div class="subject-year-tag">CSE – 3rd Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

        <div class="subject-card" data-year="year3" data-name="cryptography and network security">
          <div class="subject-icon-box">🔐</div>
          <div class="subject-info">
            <div class="subject-name">Cryptography and Network Security</div>
            <div class="subject-year-tag">CSE – 3rd Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

        <div class="subject-card" data-year="year3" data-name="distributed systems">
          <div class="subject-icon-box">🕸️</div>
          <div class="subject-info">
            <div class="subject-name">Distributed Systems</div>
            <div class="subject-year-tag">CSE – 3rd Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

        <div class="subject-card" data-year="year3" data-name="system design">
          <div class="subject-icon-box">🏗️</div>
          <div class="subject-info">
            <div class="subject-name">System Design</div>
            <div class="subject-year-tag">CSE – 3rd Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

        <div class="subject-card" data-year="year3" data-name="cloud computing">
          <div class="subject-icon-box">☁️</div>
          <div class="subject-info">
            <div class="subject-name">Cloud Computing</div>
            <div class="subject-year-tag">CSE – 3rd Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

        <div class="subject-card" data-year="year3" data-name="software project management">
          <div class="subject-icon-box">📋</div>
          <div class="subject-info">
            <div class="subject-name">Software Project Management</div>
            <div class="subject-year-tag">CSE – 3rd Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

        <div class="subject-card" data-year="year3" data-name="natural language processing">
          <div class="subject-icon-box">🗣️</div>
          <div class="subject-info">
            <div class="subject-name">Natural Language Processing</div>
            <div class="subject-year-tag">CSE – 3rd Year</div>
          </div>
          <a href="#" class="subject-link">View Page <span class="arrow">→</span></a>
        </div>

      </div>
    </div>

    <!-- NO RESULTS -->
    <div class="no-results" id="noResults">
      <div class="no-results-icon">🔍</div>
      <h3>No subjects found</h3>
      <p>Try a different search term or clear the filters</p>
    </div>

  </div>
</main>

<script>
// ===== CURSOR =====
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = window.innerWidth/2, my = window.innerHeight/2;
let rx = mx, ry = my;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, {passive:true});

(function animCursor() {
  cursor.style.transform = `translate(${mx-5}px,${my-5}px)`;
  rx += (mx-rx)*0.15; ry += (my-ry)*0.15;
  ring.style.transform = `translate(${rx-18}px,${ry-18}px)`;
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a,button,.subject-card,.filter-chip').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// ===== PARTICLES =====
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
resize(); window.addEventListener('resize', resize);
const pts = Array.from({length:80}, () => ({
  x: Math.random()*innerWidth, y: Math.random()*innerHeight,
  vx:(Math.random()-.5)*.25, vy:(Math.random()-.5)*.25,
  c:['#22c55e','#38bdf8','#a78bfa','#22d3ee'][Math.floor(Math.random()*4)],
  o: Math.random()*.35+.08
}));
(function animPts() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  pts.forEach(p => {
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0) p.x=canvas.width; if(p.x>canvas.width) p.x=0;
    if(p.y<0) p.y=canvas.height; if(p.y>canvas.height) p.y=0;
    ctx.beginPath(); ctx.arc(p.x,p.y,1.2,0,Math.PI*2);
    ctx.fillStyle=p.c+(Math.floor(p.o*255).toString(16).padStart(2,'0'));
    ctx.fill();
    pts.forEach(q => {
      const d=Math.hypot(p.x-q.x,p.y-q.y);
      if(d<110){ ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y);
        ctx.strokeStyle=`rgba(34,197,94,${.025*(1-d/110)})`; ctx.lineWidth=.5; ctx.stroke(); }
    });
  });
  requestAnimationFrame(animPts);
})();

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.background =
    scrollY > 20 ? 'rgba(2,6,23,0.96)' : 'rgba(2,6,23,0.75)';
});

// ===== SEARCH & FILTER =====
const searchInput = document.getElementById('searchInput');
const clearBtn    = document.getElementById('clearBtn');
const filterBtn   = document.getElementById('filterBtn');
const filterPanel = document.getElementById('filterPanel');
const resultCount = document.getElementById('resultCount');
const filterChips = document.querySelectorAll('.filter-chip');
const allCards    = document.querySelectorAll('.subject-card');
const noResults   = document.getElementById('noResults');

let activeFilter = 'all';
let searchQuery  = '';

// Toggle filter panel
filterBtn.addEventListener('click', () => {
  filterPanel.classList.toggle('open');
  filterBtn.classList.toggle('active');
});

// Filter chips
filterChips.forEach(chip => {
  chip.addEventListener('click', () => {
    filterChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeFilter = chip.dataset.filter;
    applyFilters();
  });
});

// Search input
searchInput.addEventListener('input', () => {
  searchQuery = searchInput.value.trim().toLowerCase();
  clearBtn.classList.toggle('visible', searchQuery.length > 0);
  applyFilters();
});

// Clear search
clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  searchQuery = '';
  clearBtn.classList.remove('visible');
  searchInput.focus();
  applyFilters();
});

function applyFilters() {
  let visible = 0;
  const sections = { year1:0, year2:0, year3:0 };

  allCards.forEach(card => {
    const year = card.dataset.year;
    const name = card.dataset.name;
    const matchYear   = activeFilter === 'all' || activeFilter === year;
    const matchSearch = !searchQuery || name.includes(searchQuery);
    const show = matchYear && matchSearch;
    card.classList.toggle('hidden', !show);
    if(show) { visible++; sections[year]++; }
  });

  // Show/hide year sections
  ['year1','year2','year3'].forEach(y => {
    const sec = document.getElementById(`section-${y}`);
    if(sec) sec.classList.toggle('hidden', sections[y] === 0);
  });

  // Update count
  resultCount.innerHTML = `Showing <strong>${visible}</strong> subject${visible!==1?'s':''}`;
  noResults.classList.toggle('visible', visible === 0);

  // Stagger re-animate visible cards
  let i = 0;
  allCards.forEach(card => {
    if(!card.classList.contains('hidden')) {
      card.style.animationDelay = `${i * 0.04}s`;
      card.style.animation = 'none';
      void card.offsetWidth; // reflow
      card.style.animation = '';
      i++;
    }
  });
}

// Card hover tilt
allCards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y*4}deg) rotateY(${x*6}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
</script>
</body>
</html>
