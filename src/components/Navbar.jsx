import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const LogoSvg = () => {
  return (
    <svg
      className="nav-logo-svg"
      width="38"
      height="38"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoStroke" x1="12" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="0.55" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="logoStrokeMorning" x1="12" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f59e0b" />
          <stop offset="0.55" stopColor="#ea580c" />
          <stop offset="1" stopColor="#fcd34d" />
        </linearGradient>
      </defs>

      {/* Strokes */}
      <path
        d="M12 34 C 20 14, 36 14, 52 34"
        stroke="url(#logoStroke)"
        strokeWidth="3"
        strokeLinecap="round"
        className="logo-stroke"
      />
      <path
        d="M18 40 C 26 28, 38 28, 46 40"
        stroke="#22d3ee"
        strokeOpacity="0.85"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="logo-stroke"
      />

      {/* Nodes */}
      <circle className="logo-node" cx="16" cy="30" r="3" fill="#38bdf8" />
      <circle className="logo-node" cx="32" cy="16" r="2.5" fill="#a78bfa" />
      <circle className="logo-node" cx="48" cy="30" r="3" fill="#22d3ee" />
      <circle className="logo-node" cx="32" cy="46" r="2.5" fill="#a78bfa" />

      {/* Morning overrides via CSS variables (applied by html.morning class) */}
      <style>{`
        html.morning .nav-logo-svg .logo-stroke { stroke: url(#logoStrokeMorning) !important; }
        html.morning .nav-logo-svg circle.logo-node:nth-child(1) { fill: #f59e0b !important; }
        html.morning .nav-logo-svg circle.logo-node:nth-child(2) { fill: #ea580c !important; }
        html.morning .nav-logo-svg circle.logo-node:nth-child(3) { fill: #fcd34d !important; }
        html.morning .nav-logo-svg circle.logo-node:nth-child(4) { fill: #ea580c !important; }
      `}</style>
    </svg>
  );
};

const Navbar = () => {

  const [activeDropdown, setActiveDropdown] = useState(null);
  const timeoutRef = useRef(null);
  const { isLight, toggleTheme } = useTheme();

  // ✅ SESSION USER STATE
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ GET USER FROM SESSION (/me)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          credentials: "include", // 🔥 REQUIRED
        });

        const data = await res.json();

        if (res.ok) { 
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ LOGOUT (SESSION)
  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/users/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    navigate("/login");
  };

  const courseSubjects = [
    { name: "Web Development", icon: "🌐", link: "/courses/web-dev" },
    { name: "Data Structures & Algo", icon: "🧩", link: "/courses/dsa" },
    { name: "Machine Learning", icon: "🤖", link: "/courses/ml" },
    { name: "System Design", icon: "🏗️", link: "/courses/system-design" },
    { name: "Database Management", icon: "🗄️", link: "/courses/dbms" },
    { name: "Operating Systems", icon: "💻", link: "/courses/os" },
  ];

  const tutorialTopics = [
    { name: "React.js", icon: "⚛️", link: "/tutorials/react" },
    { name: "Node.js", icon: "🟢", link: "/tutorials/node" },
    { name: "Python Basics", icon: "🐍", link: "/tutorials/python" },
    { name: "Git & GitHub", icon: "🔀", link: "/tutorials/git" },
    { name: "Docker & DevOps", icon: "🐳", link: "/tutorials/docker" },
    { name: "REST APIs", icon: "🔌", link: "/tutorials/apis" },
  ];

  const navLinks = [
    { name: "Home", link: "/" },
    { name: "Nexus Playground", link: "/PlaygroundPage" },
    { name: "Courses", link: "/Courses", dropdown: courseSubjects },
    { name: "Tutorials", link: "#tutorial", dropdown: tutorialTopics },
    { name: "Community", link: "#community" },
    { name: "Notes", link: "/subjects" },
  ];

  const handleMouseEnter = (name) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <>
      <style>{`
        #navbar { position: relative; z-index: 1000; }
        .nav-links li { position: relative; display: flex; align-items: center; }

        .has-dropdown > a::after {
          content: "▾";
          margin-left: 5px;
          font-size: 10px;
          opacity: 0.6;
          transition: transform 0.25s ease, opacity 0.2s;
          display: inline-block;
        }

        .has-dropdown:hover > a::after {
          transform: rotate(180deg);
          opacity: 1;
        }

        .dropdown-menu {
          position: absolute;
          top: calc(100% + 14px);
          left: 50%;
          transform: translateX(-50%) translateY(-6px);
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 10px;
          min-width: 230px;
          box-shadow: 0 20px 60px var(--shadow-card);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.22s ease, transform 0.22s;
          z-index: 9999;
          backdrop-filter: blur(20px);
        }

        .dropdown-menu.open {
          opacity: 1;
          pointer-events: all;
          transform: translateX(-50%) translateY(0);
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          border-radius: 9px;
          text-decoration: none;
          color: var(--text-secondary);
          transition: all 0.2s ease;
        }

        .dropdown-item:hover {
          color: var(--text-primary);
          transform: translateX(3px);
          background: var(--glass-bg);
        }

        .nav-cta {
          padding: 8px 14px;
          border-radius: 8px;
          background: linear-gradient(90deg, var(--accent-blue), var(--accent-purple));
          color: #ffffff !important;
          text-decoration: none;
          margin-left: 10px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .nav-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px var(--glow-blue);
        }

        .theme-toggle-btn {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 50px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          cursor: pointer;
          overflow: hidden;
          backdrop-filter: blur(10px);
          margin-left: 10px;
          margin-right: 4px;
          transition: all 0.3s ease;
        }

        .theme-toggle-btn:hover {
          background: var(--glass-border);
          border-color: var(--border-hover);
          box-shadow: var(--glow-blue);
        }
      `}</style>

      <nav id="navbar">
        <Link to="/" className="nav-logo" style={{ textDecoration: 'none' }}>
          <LogoSvg />
          <div className="nav-logo-text">
            <span className="nav-logo-main">ByteNexus</span>
            <span className="nav-logo-sub">DEV PLATFORM</span>
          </div>
        </Link>


        <ul className="nav-links">
          {navLinks.map((item, index) => (
            <li
              key={index}
              className={item.dropdown ? "has-dropdown" : ""}
              onMouseEnter={() =>
                item.dropdown && handleMouseEnter(item.name)
              }
              onMouseLeave={() =>
                item.dropdown && handleMouseLeave()
              }
            >
              {item.link.startsWith("/") ? (
                <Link to={item.link}>{item.name}</Link>
              ) : (
                <a href={item.link}>{item.name}</a>
              )}

              {item.dropdown && (
                <div
                  className={`dropdown-menu ${
                    activeDropdown === item.name ? "open" : ""
                  }`}
                >
                  {item.dropdown.map((sub, i) => (
                    <Link key={i} to={sub.link} className="dropdown-item">
                      {sub.icon} {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}

          {/* 🔥 THEME TOGGLE */}
          <li>
            <motion.button 
              onClick={toggleTheme}
              className="theme-toggle-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isLight ? 'light' : 'dark'}
                  initial={{ y: -20, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 20, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 20 }}
                >
                  {isLight ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#a78bfa" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </li>

          {/* 🔥 AUTH SECTION */}
          {loading ? (
            <li><span style={{ color: "var(--text-secondary)" }}>Loading...</span></li>
          ) : user ? (
            <li>
              <span style={{ color: "var(--accent-blue)", marginRight: "10px", fontWeight: "600" }}>
                👋 {user.name}
              </span>

              <button className="nav-cta" onClick={handleLogout}>
                Logout →
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/Signup" className="nav-cta" style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                  Sign-up
                </Link>
              </li>
              <li>
                <Link to="/Login" className="nav-cta">
                  Login →
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;