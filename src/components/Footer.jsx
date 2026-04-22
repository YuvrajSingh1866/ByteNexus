import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="nav-logo" style={{fontSize: '1.4rem'}}>
            <svg className="nav-logo-svg" id="footer-svg" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="flg1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" id="flg1-s1"/>
                  <stop offset="50%" stopColor="#a78bfa" id="flg1-s2"/>
                  <stop offset="100%" stopColor="#22d3ee" id="flg1-s3"/>
                </linearGradient>
                <linearGradient id="flg2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.7" id="flg2-s1"/>
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.7" id="flg2-s2"/>
                </linearGradient>
                <linearGradient id="flg3" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" id="flg3-s1"/>
                  <stop offset="100%" stopColor="#a78bfa" id="flg3-s2"/>
                </linearGradient>
                <filter id="fglow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <filter id="fnodeglow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="2" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <path d="M21 2 L37 11 L37 31 L21 40 L5 31 L5 11 Z" stroke="url(#flg1)" strokeWidth="1.5" fill="none" opacity="0.7"/>
              <path d="M21 8 L31 14 L31 28 L21 34 L11 28 L11 14 Z" fill="url(#flg1)" opacity="0.04" stroke="url(#flg2)" strokeWidth="0.8"/>
              <line x1="21" y1="2" x2="21" y2="8" stroke="url(#flg3)" strokeWidth="1.2" opacity="0.8"/>
              <line x1="37" y1="11" x2="31" y2="14" stroke="url(#flg3)" strokeWidth="1.2" opacity="0.8"/>
              <line x1="37" y1="31" x2="31" y2="28" stroke="url(#flg3)" strokeWidth="1.2" opacity="0.8"/>
              <line x1="21" y1="40" x2="21" y2="34" stroke="url(#flg3)" strokeWidth="1.2" opacity="0.8"/>
              <line x1="5" y1="31" x2="11" y2="28" stroke="url(#flg3)" strokeWidth="1.2" opacity="0.8"/>
              <line x1="5" y1="11" x2="11" y2="14" stroke="url(#flg3)" strokeWidth="1.2" opacity="0.8"/>
              <path d="M16 14 L16 28 L22.5 28 C25.5 28 27.5 26.5 27.5 24.2 C27.5 22.5 26.4 21.2 24.7 20.7 C26.1 20.1 27 18.9 27 17.4 C27 15.1 25.2 14 22.2 14 Z M18.2 15.9 L21.5 15.9 C23.3 15.9 24.7 16.7 24.7 18.2 C24.7 19.6 23.5 20.5 21.5 20.5 L18.2 20.5 Z M18.2 22.2 L22 22.2 C24 22.2 25.2 23.1 25.2 24.3 C25.2 25.6 24.1 26.3 22 26.3 L18.2 26.3 Z"
                    fill="url(#flg1)" filter="url(#fglow)"/>
              <circle cx="21" cy="2" r="2.8" fill="url(#flg3)" id="fnode1" filter="url(#fnodeglow)" opacity="0.95"/>
              <circle cx="37" cy="11" r="2.2" fill="url(#flg1)" id="fnode2" filter="url(#fnodeglow)" opacity="0.85"/>
              <circle cx="37" cy="31" r="2.2" fill="url(#flg2)" id="fnode3" filter="url(#fnodeglow)" opacity="0.85"/>
              <circle cx="21" cy="40" r="2.8" fill="url(#flg3)" id="fnode4" filter="url(#fnodeglow)" opacity="0.95"/>
              <circle cx="5" cy="31" r="1.8" fill="url(#flg1)" id="fnode5" filter="url(#fnodeglow)" opacity="0.7"/>
              <circle cx="5" cy="11" r="1.8" fill="url(#flg2)" id="fnode6" filter="url(#fnodeglow)" opacity="0.7"/>
            </svg>
            <div className="nav-logo-text">
              <span className="nav-logo-main">ByteNexus</span>
              <span className="nav-logo-sub">Dev Platform</span>
            </div>
          </div>
          <p>A one-stop solution for all academic resources for Computer Science students at Chitkara University. Built by students, for students.</p>
          <div className="social-links">
            <a href="#" className="social-link" title="GitHub">⌥</a>
            <a href="#" className="social-link" title="YouTube">▶</a>
            <a href="#" className="social-link" title="WhatsApp">💬</a>
            <a href="#" className="social-link" title="Instagram">◈</a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Study Material</a>
          <a href="#">Updates</a>
          <a href="#">Contact</a>
        </div>
        <div className="footer-col">
          <h4>Academic</h4>
          <a href="#">1st Year CSE</a>
          <a href="#">2nd Year CSE</a>
          <a href="#">3rd Year CSE</a>
          <a href="#">Previous Papers</a>
          <a href="#">Syllabus</a>
        </div>
        <div className="footer-col">
          <h4>Community</h4>
          <a href="#">WhatsApp Group</a>
          <a href="#">Discord</a>
          <a href="#">YouTube Channel</a>
          <a href="#">Contribute</a>
          <a href="#">GitHub</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 <span>ByteNexus</span>. Built with ❤️ for CSE students.</p>
        <p style={{fontSize: '0.7rem', opacity: 0.5}}>v2.0.0 · Powered by community</p>
      </div>
    </footer>
  )
}

export default Footer