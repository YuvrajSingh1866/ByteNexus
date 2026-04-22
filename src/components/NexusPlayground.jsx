import { useState, useEffect } from "react";

const glowKeyframes = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.4), 0 0 60px rgba(99, 102, 241, 0.1); }
  50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.8), 0 0 100px rgba(99, 102, 241, 0.3); }
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
@keyframes scan-line {
  0% { top: 0%; }
  100% { top: 100%; }
}
@keyframes flicker {
  0%, 98%, 100% { opacity: 1; }
  99% { opacity: 0.6; }
}
@keyframes data-flow {
  0% { transform: translateY(-100%); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
}
@keyframes border-dance {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes appear {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes count-up {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}
`;

const aiChallenges = [
  { icon: "⚡", title: "Speed Run", desc: "Solve problems faster than the AI's benchmark time", color: "#f59e0b" },
  { icon: "🧠", title: "AI Tutor Mode", desc: "Get real-time hints and explanations as you code", color: "#6366f1" },
  { icon: "🎯", title: "Precision Duel", desc: "Match the AI's optimal solution approach", color: "#10b981" },
  { icon: "🔥", title: "Endless Arena", desc: "Progressively harder problems with no ceiling", color: "#ef4444" },
];

const langColors = {
  Python: "#3b82f6", "C++": "#8b5cf6", JavaScript: "#f59e0b", Java: "#ef4444",
};

const diffColors = {
  Easy: "#10b981", Medium: "#f59e0b", Hard: "#ef4444",
};

export default function NexusPlayground() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const p = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    setParticles(p);
  }, []);

  const styles = {
    root: {
      fontFamily: "Syne,sans-serif",
      background: "transparent",
      minHeight: "100vh",
      color: "#e2e8f0",
      position: "relative",
      overflow: "hidden",
    },
    bg: {
      position: "fixed", inset: 0, zIndex: 0,
      /*background: "radial-gradient(ellipse at 20% 20%, rgba(99,102,241,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(16,185,129,0.06) 0%, transparent 50%)",*/
      pointerEvents: "none",
    },
    grid: {
      position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
      backgroundImage: "linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    },
    container: { position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "40px 24px" },

    // Header
    header: { textAlign: "center", marginBottom: 56, animation: "appear 0.8s ease forwards" },
    eyebrow: {
      display: "inline-flex", alignItems: "center", gap: 8,
      background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)",
      borderRadius: 999, padding: "4px 16px", fontSize: 12, color: "#818cf8",
      letterSpacing: 2, textTransform: "uppercase", marginBottom: 20, fontFamily: "'Orbitron', monospace",
    },
    title: {
      fontFamily: "'Orbitron', monospace", fontSize: "clamp(36px, 6vw, 64px)",
      fontWeight: 900, lineHeight: 1.1, marginBottom: 16,
      background: "linear-gradient(135deg, #fff 0%, #a5b4fc 40%, #34d399 100%)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    },
    subtitle: { fontSize: 18, color: "#64748b", maxWidth: 520, margin: "0 auto 36px", fontWeight: 400 },

    // Stats row
    statsRow: { display: "flex", justifyContent: "center", gap: 40, marginBottom: 16, flexWrap: "wrap" },
    stat: { textAlign: "center", animation: "count-up 0.6s ease forwards" },
    statNum: { fontFamily: "'Orbitron', monospace", fontSize: 28, fontWeight: 700, color: "#a5b4fc" },
    statLabel: { fontSize: 11, color: "#475569", textTransform: "uppercase", letterSpacing: 1.5 },

    // Tabs
    tabBar: {
      display: "flex", gap: 4, background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12,
      padding: 4, width: "fit-content", margin: "0 auto 48px",
    },
    tab: (active) => ({
      padding: "10px 28px", borderRadius: 8, border: "none", cursor: "pointer",
      fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: 15,
      letterSpacing: 1, textTransform: "uppercase", transition: "all 0.2s",
      background: active ? "linear-gradient(135deg, #6366f1, #4f46e5)" : "transparent",
      color: active ? "#fff" : "#475569",
      boxShadow: active ? "0 4px 20px rgba(99,102,241,0.4)" : "none",
    }),

    // Section heading
    sectionHead: {
      display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24,
    },
    sectionTitle: { fontFamily: "'Orbitron', monospace", fontSize: 20, color: "#e2e8f0", fontWeight: 700 },

    // Create room btn
    createBtn: {
      display: "flex", alignItems: "center", gap: 8,
      background: "linear-gradient(135deg, #6366f1, #4f46e5)",
      border: "none", borderRadius: 8, padding: "10px 22px",
      color: "#fff", fontFamily: "'Rajdhani', sans-serif",
      fontWeight: 700, fontSize: 14, cursor: "pointer", letterSpacing: 1,
      boxShadow: "0 4px 20px rgba(99,102,241,0.4)", transition: "all 0.2s",
    },

    // Room cards
    roomsGrid: { display: "flex", flexDirection: "column", gap: 14 },
    roomCard: (hovered) => ({
      background: hovered ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.02)",
      border: `1px solid ${hovered ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.07)"}`,
      borderRadius: 14, padding: "20px 24px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: 16, cursor: "pointer", transition: "all 0.25s",
      boxShadow: hovered ? "0 0 40px rgba(99,102,241,0.12)" : "none",
      flexWrap: "wrap",
    }),
    roomLeft: { display: "flex", flexDirection: "column", gap: 6, flex: 1 },
    roomName: { fontFamily: "'Orbitron', monospace", fontSize: 16, fontWeight: 700, color: "#e2e8f0" },
    roomMeta: { display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" },
    badge: (color) => ({
      background: `${color}18`, border: `1px solid ${color}40`,
      borderRadius: 6, padding: "2px 10px", fontSize: 12,
      color, fontWeight: 600, letterSpacing: 0.5,
    }),
    roomHost: { fontSize: 13, color: "#475569" },

    roomRight: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 },
    playerCount: { fontFamily: "'Orbitron', monospace", fontSize: 13, color: "#64748b" },
    statusDot: (status) => ({
      display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600,
      color: status === "Waiting" ? "#10b981" : "#f59e0b",
    }),
    joinBtn: {
      background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.35)",
      borderRadius: 8, padding: "8px 20px",
      color: "#a5b4fc", fontFamily: "'Rajdhani', sans-serif",
      fontWeight: 700, fontSize: 13, cursor: "pointer", letterSpacing: 1,
      transition: "all 0.2s",
    },

    // Join by code
    joinCodeBox: {
      background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 14, padding: "24px 28px", marginBottom: 32,
      display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
    },
    codeInput: {
      flex: 1, minWidth: 180,
      background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.25)",
      borderRadius: 8, padding: "12px 18px",
      color: "#e2e8f0", fontFamily: "'Orbitron', monospace",
      fontSize: 16, letterSpacing: 4, outline: "none",
    },
    codeLabel: { fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, color: "#475569", fontSize: 14, whiteSpace: "nowrap" },
    codeJoinBtn: {
      background: "linear-gradient(135deg, #10b981, #059669)",
      border: "none", borderRadius: 8, padding: "12px 28px",
      color: "#fff", fontFamily: "'Rajdhani', sans-serif",
      fontWeight: 700, fontSize: 15, cursor: "pointer", letterSpacing: 1,
      boxShadow: "0 4px 20px rgba(16,185,129,0.35)",
    },

    // AI Section
    aiGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 18, marginBottom: 40 },
    aiCard: (color) => ({
      background: `${color}08`, border: `1px solid ${color}25`,
      borderRadius: 16, padding: "28px 22px", cursor: "pointer",
      transition: "all 0.25s", position: "relative", overflow: "hidden",
    }),
    aiIcon: { fontSize: 32, marginBottom: 14 },
    aiTitle: { fontFamily: "'Orbitron', monospace", fontSize: 15, fontWeight: 700, marginBottom: 8, color: "#e2e8f0" },
    aiDesc: { fontSize: 13, color: "#64748b", lineHeight: 1.6 },
    aiBadge: (color) => ({
      display: "inline-block", marginTop: 16,
      background: `${color}20`, border: `1px solid ${color}40`,
      borderRadius: 6, padding: "4px 12px", fontSize: 11,
      color, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
    }),

    // AI match area
    aiMatch: {
      background: "rgba(255,255,255,0.02)", border: "1px solid rgba(99,102,241,0.2)",
      borderRadius: 16, padding: "32px",
    },
    aiMatchTitle: { fontFamily: "'Orbitron', monospace", fontSize: 18, fontWeight: 700, marginBottom: 8, color: "#a5b4fc" },
    aiMatchDesc: { color: "#64748b", fontSize: 14, marginBottom: 24, lineHeight: 1.7 },
    aiStartBtn: {
      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
      border: "none", borderRadius: 10, padding: "14px 36px",
      color: "#fff", fontFamily: "'Orbitron', monospace",
      fontWeight: 700, fontSize: 14, cursor: "pointer", letterSpacing: 1,
      boxShadow: "0 6px 30px rgba(99,102,241,0.5)", animation: "pulse-glow 2s ease-in-out infinite",
    },
    featRow: { display: "flex", gap: 24, marginBottom: 28, flexWrap: "wrap" },
    feat: { display: "flex", alignItems: "center", gap: 10 },
    featIcon: { fontSize: 18 },
    featText: { fontSize: 14, color: "#94a3b8" },

    // Modal overlay
    overlay: {
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    },
    modal: {
      background: "#0a1120", border: "1px solid rgba(99,102,241,0.3)",
      borderRadius: 20, padding: "36px 32px", width: "100%", maxWidth: 440,
      boxShadow: "0 0 80px rgba(99,102,241,0.2)",
    },
    modalTitle: { fontFamily: "'Orbitron', monospace", fontSize: 20, fontWeight: 700, marginBottom: 24, color: "#a5b4fc" },
    formGroup: { marginBottom: 20 },
    label: { display: "block", fontSize: 12, color: "#475569", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8, fontWeight: 600 },
    input: {
      width: "100%", background: "rgba(99,102,241,0.07)",
      border: "1px solid rgba(99,102,241,0.25)", borderRadius: 8,
      padding: "12px 16px", color: "#e2e8f0",
      fontFamily: "'Rajdhani', sans-serif", fontSize: 15, outline: "none",
      boxSizing: "border-box",
    },
    select: {
      width: "100%", background: "#0a1120",
      border: "1px solid rgba(99,102,241,0.25)", borderRadius: 8,
      padding: "12px 16px", color: "#e2e8f0",
      fontFamily: "'Rajdhani', sans-serif", fontSize: 15, outline: "none",
    },
    modalBtns: { display: "flex", gap: 12, marginTop: 28 },
    cancelBtn: {
      flex: 1, background: "transparent",
      border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
      padding: "12px", color: "#475569",
      fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
      fontSize: 14, cursor: "pointer",
    },
    confirmBtn: {
      flex: 1, background: "linear-gradient(135deg, #6366f1, #4f46e5)",
      border: "none", borderRadius: 8, padding: "12px",
      color: "#fff", fontFamily: "'Rajdhani', sans-serif",
      fontWeight: 700, fontSize: 14, cursor: "pointer",
      boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
    },
  };

   return (
    <>
      <style>{glowKeyframes}</style>
      <div style={styles.root}>
        <div style={styles.bg} />
        <div style={styles.grid} />

        {/* Floating particles */}
        {particles.map(p => (
          <div
            key={p.id}
            style={{
              position: "fixed",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background:
                p.id % 3 === 0
                  ? "#6366f1"
                  : p.id % 3 === 1
                  ? "#10b981"
                  : "#8b5cf6",
              opacity: p.opacity,
              pointerEvents: "none",
              zIndex: 0,
              animation: `float ${3 + p.speed}s ease-in-out infinite`,
              animationDelay: `${p.id * 0.3}s`,
            }}
          />
        ))}

        <div style={styles.container}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.eyebrow}>
              <span>◈</span> NEXUS PLAYGROUND
            </div>

            <h1 style={styles.title}>Compete. Practice. Dominate.</h1>

            <p style={styles.subtitle}>
              Create private rooms to battle friends or go head-to-head against our AI engine.
              The arena is live.
            </p>

           
          </div>

          <div style={{ animation: "appear 0.5s ease forwards" }}>
            <div style={{ marginBottom: 28 }}>
              <span style={styles.sectionTitle}>🤖 AI Practice Modes</span>
            </div>

            <div style={styles.aiGrid}>
              {aiChallenges.map((c) => (
                <div
                  key={c.title}
                  style={styles.aiCard(c.color)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = `0 12px 40px ${c.color}25`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={styles.aiIcon}>{c.icon}</div>
                  <div style={styles.aiTitle}>{c.title}</div>
                  <div style={styles.aiDesc}>{c.desc}</div>
                  <div style={styles.aiBadge(c.color)}>Start Now</div>
                </div>
              ))}
            </div>

              

            
          </div>
        </div>
      </div>
    </>
  );
}