import { useState, useEffect } from "react";

const injectStyles = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');

@keyframes appear {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(99,102,241,0.4); }
  70% { box-shadow: 0 0 0 10px rgba(99,102,241,0); }
  100% { box-shadow: 0 0 0 0 rgba(99,102,241,0); }
}
@keyframes bar-fill {
  from { width: 0%; }
  to { width: var(--target-width); }
}
@keyframes tag-pop {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}
`;

const courses = [
  {
    id: 1,
    tag: "Most Popular",
    tagColor: "#f59e0b",
    icon: "🧠",
    title: "Data Structures & Algorithms",
    subtitle: "From Zero to Interview-Ready",
    desc: "Master arrays, linked lists, trees, graphs, and dynamic programming with 60+ problems mapped to real interview questions from top tech companies.",
    topics: ["Arrays & Strings", "Trees & Graphs", "Dynamic Programming", "Sorting & Searching"],
    lessons: 42,
    hours: "18h 30m",
    students: "2.1K",
    level: "Intermediate",
    levelColor: "#f59e0b",
    progress: 0,
    accent: "#6366f1",
    accentSoft: "rgba(99,102,241,0.08)",
    accentBorder: "rgba(99,102,241,0.35)",
    gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  },
  {
    id: 2,
    tag: "New",
    tagColor: "#10b981",
    icon: "⚙️",
    title: "System Design Fundamentals",
    subtitle: "Build Scalable, Real-World Systems",
    desc: "Learn how to design distributed systems, databases, caches, and APIs. Covers load balancing, microservices, CAP theorem, and more with case studies.",
    topics: ["Distributed Systems", "Database Design", "Caching Strategies", "API Architecture"],
    lessons: 28,
    hours: "12h 15m",
    students: "890",
    level: "Advanced",
    levelColor: "#ef4444",
    progress: 0,
    accent: "#10b981",
    accentSoft: "rgba(16,185,129,0.08)",
    accentBorder: "rgba(16,185,129,0.35)",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  },
  {
    id: 3,
    tag: "Beginner Friendly",
    tagColor: "#6366f1",
    icon: "🐍",
    title: "Python for Competitive Coding",
    subtitle: "Write Faster, Smarter Solutions",
    desc: "Master Python's standard library, built-in data structures, and tricks for competitive programming. Solve problems 3x faster with Pythonic patterns.",
    topics: ["Python STL & Libraries", "List Comprehensions", "Recursion & Backtracking", "Bit Manipulation"],
    lessons: 35,
    hours: "14h 00m",
    students: "3.4K",
    level: "Beginner",
    levelColor: "#10b981",
    progress: 0,
    accent: "#3b82f6",
    accentSoft: "rgba(59,130,246,0.08)",
    accentBorder: "rgba(59,130,246,0.35)",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
  },
  {
    id: 4,
    tag: "Hot 🔥",
    tagColor: "#ef4444",
    icon: "🌐",
    title: "Full Stack Web Development",
    subtitle: "React + Node + MongoDB Bootcamp",
    desc: "Build and deploy complete web applications from scratch. Covers React hooks, REST APIs, authentication, database modeling, and cloud deployment.",
    topics: ["React & Tailwind", "Node.js & Express", "MongoDB & Mongoose", "Auth & Deployment"],
    lessons: 58,
    hours: "26h 45m",
    students: "1.7K",
    level: "Intermediate",
    levelColor: "#f59e0b",
    progress: 0,
    accent: "#f59e0b",
    accentSoft: "rgba(245,158,11,0.08)",
    accentBorder: "rgba(245,158,11,0.35)",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
  },
];

const filters = ["All", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [particles, setParticles] = useState([]);
  const [enrolled, setEnrolled] = useState({});

  useEffect(() => {
    const p = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.35 + 0.05,
      color: ["#6366f1", "#10b981", "#f59e0b", "#3b82f6"][i % 4],
    }));
    setParticles(p);
  }, []);

  const filtered =
    activeFilter === "All"
      ? courses
      : courses.filter((c) => c.level === activeFilter);

  return (
    <>
      <style>{injectStyles}</style>
      <div
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          minHeight: "100vh",
          color: "#e2e8f0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background layers */}
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
            background:
              "radial-gradient(ellipse at 15% 30%, rgba(99,102,241,0.07) 0%, transparent 55%), radial-gradient(ellipse at 85% 70%, rgba(16,185,129,0.05) 0%, transparent 50%)",
          }}
        />
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: "fixed",
              left: `${p.x}%`, top: `${p.y}%`,
              width: p.size, height: p.size,
              borderRadius: "50%",
              background: p.color,
              opacity: p.opacity,
              pointerEvents: "none", zIndex: 0,
              animation: `float ${3 + p.speed}s ease-in-out infinite`,
              animationDelay: `${p.id * 0.25}s`,
            }}
          />
        ))}

        {/* Page content */}
        <div
          style={{
            position: "relative", zIndex: 1,
            maxWidth: 1100, margin: "0 auto", padding: "40px 24px",
          }}
        >
          {/* ── Header ── */}
          <div
            style={{
              textAlign: "center", marginBottom: 52,
              animation: "appear 0.7s ease forwards",
            }}
          >
            <h1
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "clamp(32px, 5.5vw, 58px)",
                fontWeight: 900, lineHeight: 1.1, marginBottom: 16,
                background: "linear-gradient(135deg, #fff 0%, #a5b4fc 45%, #34d399 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}
            >
              Learn. Build. Level Up.
            </h1>
            <p
              style={{
                fontSize: 17, color: "#64748b",
                maxWidth: 500, margin: "0 auto 36px",
                fontWeight: 400, lineHeight: 1.7,
              }}
            >
              Structured courses built for CSE students — from fundamentals to
              placement prep, all in one place.
            </p>
          </div>

          {/* ── Filter Bar ── */}
          <div
            style={{
              display: "flex", gap: 8, justifyContent: "center",
              marginBottom: 44, flexWrap: "wrap",
            }}
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: "8px 22px", borderRadius: 8,
                  border:
                    activeFilter === f
                      ? "1px solid rgba(99,102,241,0.5)"
                      : "1px solid rgba(255,255,255,0.07)",
                  background:
                    activeFilter === f
                      ? "rgba(99,102,241,0.18)"
                      : "rgba(255,255,255,0.02)",
                  color: activeFilter === f ? "#a5b4fc" : "#475569",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700, fontSize: 14,
                  cursor: "pointer", letterSpacing: 1,
                  transition: "all 0.2s",
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* ── Course Cards ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(480px, 1fr))",
              gap: 22,
            }}
          >
            {filtered.map((course, i) => {
              const hovered = hoveredCard === course.id;
              const isEnrolled = enrolled[course.id];

              return (
                <div
                  key={course.id}
                  onMouseEnter={() => setHoveredCard(course.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    /* ── PLAN-TINTED BACKGROUND ── */
                    background: hovered
                      ? `linear-gradient(145deg, ${course.accent}22 0%, rgba(6,12,28,0.97) 65%)`
                      : `linear-gradient(145deg, ${course.accent}0f 0%, rgba(6,12,28,0.94) 60%)`,

                    border: `1px solid ${hovered ? course.accentBorder : `${course.accent}20`}`,
                    borderRadius: 18,
                    padding: "28px 28px 24px",
                    transition: "all 0.3s",
                    transform: hovered ? "translateY(-4px)" : "translateY(0)",
                    boxShadow: hovered
                      ? `0 16px 60px ${course.accent}28, inset 0 1px 0 ${course.accent}18`
                      : `inset 0 1px 0 ${course.accent}0a`,
                    animation: "appear 0.6s ease forwards",
                    animationDelay: `${i * 0.1}s`,
                    opacity: 0,
                    position: "relative", overflow: "hidden",
                  }}
                >
                  {/* Top accent line */}
                  <div
                    style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: 3,
                      background: course.gradient,
                      opacity: hovered ? 1 : 0.4,
                      transition: "opacity 0.3s",
                    }}
                  />

                  {/* Card header */}
                  <div
                    style={{
                      display: "flex", justifyContent: "space-between",
                      alignItems: "flex-start", marginBottom: 18,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      {/* Icon bubble */}
                      <div
                        style={{
                          width: 52, height: 52, borderRadius: 14,
                          background: `${course.accent}18`,
                          border: `1px solid ${course.accent}30`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 24, flexShrink: 0,
                        }}
                      >
                        {course.icon}
                      </div>

                      <div>
                        {/* Tag pill */}
                        <div
                          style={{
                            display: "inline-block",
                            background: `${course.tagColor}18`,
                            border: `1px solid ${course.tagColor}35`,
                            borderRadius: 6, padding: "2px 10px",
                            fontSize: 11, color: course.tagColor,
                            fontWeight: 700, letterSpacing: 1, marginBottom: 6,
                            animation: "tag-pop 0.4s ease forwards",
                          }}
                        >
                          {course.tag}
                        </div>

                        {/* Title */}
                        <div
                          style={{
                            fontFamily: "'Orbitron', monospace",
                            fontSize: 15, fontWeight: 700,
                            color: "#e2e8f0", lineHeight: 1.3,
                          }}
                        >
                          {course.title}
                        </div>
                      </div>
                    </div>

                    {/* Level badge */}
                    <div
                      style={{
                        background: `${course.levelColor}18`,
                        border: `1px solid ${course.levelColor}30`,
                        borderRadius: 6, padding: "3px 10px",
                        fontSize: 11, color: course.levelColor,
                        fontWeight: 700, letterSpacing: 1,
                        flexShrink: 0, marginLeft: 8,
                      }}
                    >
                      {course.level}
                    </div>
                  </div>

                  {/* Subtitle */}
                  <div
                    style={{
                      fontSize: 13, color: course.accent,
                      fontWeight: 600, marginBottom: 6, letterSpacing: 0.5,
                    }}
                  >
                    {course.subtitle}
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: 14, color: "#64748b",
                      lineHeight: 1.7, marginBottom: 20,
                    }}
                  >
                    {course.desc}
                  </p>

                  {/* Topic tags */}
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}
                  >
                    {course.topics.map((t) => (
                      <span
                        key={t}
                        style={{
                          background: `${course.accent}10`,
                          border: `1px solid ${course.accent}25`,
                          borderRadius: 6, padding: "3px 12px",
                          fontSize: 12, color: "#94a3b8", fontWeight: 500,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Meta row */}
                  <div
                    style={{
                      display: "flex", gap: 20, alignItems: "center",
                      paddingTop: 18,
                      borderTop: `1px solid ${course.accent}15`,
                      marginBottom: 20, flexWrap: "wrap",
                    }}
                  >
                    {[
                      ["📖", `${course.lessons} Lessons`],
                      ["⏱", course.hours],
                      ["👥", `${course.students} Students`],
                    ].map(([icon, val]) => (
                      <div
                        key={val}
                        style={{
                          display: "flex", alignItems: "center",
                          gap: 6, fontSize: 13, color: "#64748b",
                        }}
                      >
                        <span>{icon}</span>
                        <span>{val}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA button */}
                  <button
                    onClick={() =>
                      setEnrolled((prev) => ({ ...prev, [course.id]: true }))
                    }
                    style={{
                      width: "100%", padding: "13px",
                      background: isEnrolled
                        ? "rgba(16,185,129,0.15)"
                        : course.gradient,
                      border: isEnrolled
                        ? "1px solid rgba(16,185,129,0.4)"
                        : "none",
                      borderRadius: 10, cursor: "pointer",
                      fontFamily: "'Orbitron', monospace",
                      fontWeight: 700, fontSize: 13, letterSpacing: 1,
                      color: isEnrolled ? "#34d399" : "#fff",
                      boxShadow: isEnrolled
                        ? "none"
                        : `0 6px 24px ${course.accent}40`,
                      transition: "all 0.25s",
                    }}
                  >
                    {isEnrolled
                      ? "✓ Enrolled — Continue Learning →"
                      : "Enroll for Free →"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}