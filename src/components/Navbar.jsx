import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const timeoutRef = useRef(null);

  // 🔥 USER STATE
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/"); // redirect without reload
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
    {
      name: "Courses",
      link: "/Courses",
      dropdown: courseSubjects,
    },
    {
      name: "Tutorials",
      link: "#tutorial",
      dropdown: tutorialTopics,
    },
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
        .nav-links li { position: relative; }

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
          background: linear-gradient(145deg, #0f172a, #1e293b);
          border: 1px solid rgba(56, 189, 248, 0.15);
          border-radius: 14px;
          padding: 10px;
          min-width: 230px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.22s ease, transform 0.22s;
          z-index: 9999;
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
          color: rgba(203, 213, 225, 0.85);
        }

        .dropdown-item:hover {
          color: #e2e8f0;
          transform: translateX(3px);
        }

        .nav-cta {
          padding: 8px 14px;
          border-radius: 8px;
          background: linear-gradient(90deg, #38bdf8, #a78bfa);
          color: white;
          text-decoration: none;
          margin-left: 10px;
          border: none;
          cursor: pointer;
        }
      `}</style>

      <nav id="navbar">
        {/* Logo */}
        <div className="nav-logo">
          <div className="nav-logo-text">
            <span className="nav-logo-main">ByteNexus</span>
            <span className="nav-logo-sub">Dev Platform</span>
          </div>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          {navLinks.map((item, index) => (
            <li
              key={index}
              className={item.dropdown ? "has-dropdown" : ""}
              onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
              onMouseLeave={() => item.dropdown && handleMouseLeave()}
            >
              {item.link.startsWith("/") ? (
                <Link to={item.link}>{item.name}</Link>
              ) : (
                <a href={item.link}>{item.name}</a>
              )}

              {item.dropdown && (
                <div className={`dropdown-menu ${activeDropdown === item.name ? "open" : ""}`}>
                  {item.dropdown.map((sub, i) => (
                    <Link key={i} to={sub.link} className="dropdown-item">
                      {sub.icon} {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}

          {/* 🔥 AUTH SECTION */}
          {user ? (
            <li>
              <span style={{ color: "#38bdf8", marginRight: "10px" }}>
                👋 {user.name}
              </span>
              <button className="nav-cta" onClick={handleLogout}>
                Logout →
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/Signup" className="nav-cta">Sign-up →</Link>
              </li>
              <li>
                <Link to="/Login" className="nav-cta">Login →</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;