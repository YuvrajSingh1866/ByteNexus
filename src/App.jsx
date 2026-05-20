import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { useTheme } from './context/ThemeContext'
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
import RoomLobby from './pages/RoomLobby'
function App() {
  const { isLight } = useTheme();

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
    let animationFrameId;

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
        this.color = isLight ? lightColors[Math.floor(Math.random() * lightColors.length)] : darkColors[Math.floor(Math.random() * darkColors.length)];
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

    const darkColors = ['#38bdf8', '#a78bfa', '#22d3ee', '#4ade80'];
    const lightColors = ['#ea580c', '#f59e0b', '#fb7185', '#fb923c'];

    for (let i = 0; i < 120; i++) particles.push(new Particle());

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = isLight ? `rgba(245, 158, 11, ${0.05 * (1 - dist / 120)})` : `rgba(56, 189, 248, ${0.03 * (1 - dist / 120)})`;
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
      animationFrameId = requestAnimationFrame(animateParticles);
    }
    animateParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLight]);

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

  return (
    <div className="app">
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
        <Route path='/roomLobby/:roomId' element={<RoomLobby />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App
