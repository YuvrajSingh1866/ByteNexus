import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import VideoCard from './components/VideoCard'
import StudyMaterial from './components/StudyMaterial'
import Features from './components/Features'
import Updates from './components/Updates'
import Community from './components/Community'
import Footer from './components/Footer'
import Subjects from './pages/Subjects'
import SubjectDetail from './pages/SubjectDetail'
import NexusPlayground from './components/NexusPlayground'
import CoursesPage from './components/CoursesPage'
import PlaygroundPage from './pages/PlaygroundPage'
import Courses from './pages/Courses'
import Signup from './components/Signup'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import About from './pages/About'
import Chatbot from './components/Chatbot'
function App() {
  const [isMorning, setIsMorning] = useState(false)

  useEffect(() => {
    // Custom cursor setup
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    const trail = document.getElementById('cursor-trail');

    if (!cursor || !ring || !trail) return;

    const cursorHalf = 5;
    const ringHalf = 18;
    const trailHalf = 2.5;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX, ringY = mouseY;
    let trailX = mouseX, trailY = mouseY;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    function animateCursor() {
      cursor.style.transform = `translate(${mouseX - cursorHalf}px, ${mouseY - cursorHalf}px)`;
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX - ringHalf}px, ${ringY - ringHalf}px)`;
      trailX += (mouseX - trailX) * 0.07;
      trailY += (mouseY - trailY) * 0.07;
      trail.style.transform = `translate(${trailX - trailHalf}px, ${trailY - trailHalf}px)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects
    document.querySelectorAll('a, button, .year-card, .feature-card, .update-card, .video-card, #theme-toggle').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    // Particles canvas
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.color = isMorning ? morningColors[Math.floor(Math.random() * morningColors.length)] : nightColors[Math.floor(Math.random() * nightColors.length)];
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + Math.floor(this.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      }
    }

    const nightColors = ['#38bdf8', '#a78bfa', '#22d3ee', '#4ade80'];
    const morningColors = ['#f59e0b', '#fb923c', '#fcd34d', '#ea580c'];

    for (let i = 0; i < 120; i++) particles.push(new Particle());

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.03 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      drawConnections();
      requestAnimationFrame(animateParticles);
    }
    animateParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isMorning]);

  useEffect(() => {
    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(el => revealObserver.observe(el));

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    // Smooth scroll for nav links
    const handleNavClick = (e) => {
      const target = document.querySelector(e.currentTarget.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    };
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', handleNavClick);
    });
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.removeEventListener('click', handleNavClick);
      });
    };
  }, []);

  useEffect(() => {
    // 3D tilt on year cards
    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = `translateY(-12px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    const handleMouseLeave = (e) => {
      e.currentTarget.style.transform = '';
    };
    document.querySelectorAll('.year-card').forEach(card => {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    });
    return () => {
      document.querySelectorAll('.year-card').forEach(card => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const toggleTheme = () => {
    const newIsMorning = !isMorning;
    setIsMorning(newIsMorning);

    // Flash effect
    const modeFlash = document.getElementById('mode-flash');
    modeFlash.style.background = newIsMorning
      ? 'radial-gradient(circle at center, rgba(253,211,77,0.5), rgba(251,146,60,0.25))'
      : 'radial-gradient(circle at center, rgba(2,6,23,0.6), rgba(15,23,42,0.3))';
    modeFlash.classList.add('flash');
    setTimeout(() => {
      modeFlash.style.transition = 'opacity 0.6s ease';
      modeFlash.style.opacity = '0';
      setTimeout(() => {
        modeFlash.classList.remove('flash');
        modeFlash.style.opacity = '';
        modeFlash.style.transition = '';
      }, 600);
    }, 80);

    // Toggle class
    if (newIsMorning) {
      document.documentElement.classList.add('morning');
    } else {
      document.documentElement.classList.remove('morning');
    }

    // Update SVG logo gradient colors
    const nightSVG = { s1: '#38bdf8', s2: '#a78bfa', s3: '#22d3ee', r1: '#22d3ee', r2: '#a78bfa', t1: '#38bdf8', t2: '#a78bfa' };
    const mornSVG = { s1: '#d97706', s2: '#ea580c', s3: '#f59e0b', r1: '#f59e0b', r2: '#ea580c', t1: '#d97706', t2: '#f59e0b' };
    const sv = newIsMorning ? mornSVG : nightSVG;

    [['lg1-s1', sv.s1], ['lg1-s2', sv.s2], ['lg1-s3', sv.s3],
    ['lg2-s1', sv.r1], ['lg2-s2', sv.r2],
    ['lg3-s1', sv.t1], ['lg3-s2', sv.t2],
    // Footer gradients
    ['flg1-s1', sv.s1], ['flg1-s2', sv.s2], ['flg1-s3', sv.s3],
    ['flg2-s1', sv.r1], ['flg2-s2', sv.r2],
    ['flg3-s1', sv.t1], ['flg3-s2', sv.t2]
    ].forEach(([id, col]) => {
      const el = document.getElementById(id);
      if (el) el.setAttribute('stop-color', col);
    });
  };

  // Theme label functionality
  const [labelTimeout, setLabelTimeout] = useState(null);

  const showLabel = () => {
    clearTimeout(labelTimeout);
    const label = document.getElementById('theme-label');
    label.textContent = isMorning ? '🌙 Switch to Night' : '☀️ Switch to Morning';
    label.classList.add('show');
    const timeout = setTimeout(() => label.classList.remove('show'), 2000);
    setLabelTimeout(timeout);
  };

  const handleToggleMouseEnter = () => {
    showLabel();
  };

  const handleToggleMouseLeave = () => {
    clearTimeout(labelTimeout);
    document.getElementById('theme-label').classList.remove('show');
  };

  return (
    <div className={`app ${isMorning ? 'morning' : ''}`}>
      {/* MODE FLASH OVERLAY */}
      <div id="mode-flash"></div>

      {/* THEME TOGGLE */}
      <button id="theme-toggle" title="Switch theme" aria-label="Toggle morning/night mode" onClick={toggleTheme} onMouseEnter={handleToggleMouseEnter} onMouseLeave={handleToggleMouseLeave}>
        <span className="toggle-icon" id="toggle-icon">{isMorning ? '☀️' : '🌙'}</span>
      </button>
      <div id="theme-label">Morning Mode</div>


      {/* CURSOR */}
      <div id="cursor"></div>
      <div id="cursor-ring"></div>
      <div id="cursor-trail"></div>

      {/* BACKGROUND BLOBS */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      {/* PARTICLES CANVAS */}
      <canvas id="bg-canvas"></canvas>

      <Chatbot />

      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Hero />
            <NexusPlayground />
            <CoursesPage />
            <StudyMaterial />
            <Features />
            <Updates />
            <Community />
            <Footer />
          </>
        } />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/subject/:name" element={<SubjectDetail />} />
        <Route path="/PlaygroundPage" element={<PlaygroundPage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Login' element={<Login />} />
        <Route path="/protected" element={
          <ProtectedRoute>
            <PlaygroundPage />
          </ProtectedRoute>
        } />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App
