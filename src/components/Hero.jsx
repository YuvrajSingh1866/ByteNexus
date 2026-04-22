import React from 'react'

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="floating-icons">
        <div className="float-icon">JS</div>
        <div className="float-icon">⚛</div>
        <div className="float-icon">Py</div>
        <div className="float-icon">HTML</div>
        <div className="float-icon">CSS</div>
        <div className="float-icon">Java</div>
        <div className="float-icon">C++</div>
      </div>

    

      <h1>
        <span className="gradient-text">Byte</span>Nexus<br/>
        <span style={{fontSize: '0.55em', fontWeight: 400, color: 'var(--text-secondary)'}}>Your Path to Tech Mastery</span>
      </h1>

      <p className="hero-sub">
        Practice coding, compete in challenges, learn through courses and tutorials, and access curated notes — all in one platform.
      </p>

      <div className="hero-buttons">
        <a href="#study" className="btn-primary">📚 Explore Courses</a>
        <a href="#features" className="btn-secondary">⌨️ Start Coding</a>
      </div>

      <div className="hero-stats">
        <div className="stat">
          <div className="stat-num">500+</div>
          <div className="stat-label">Resources</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat">
          <div className="stat-num">3K+</div>
          <div className="stat-label">Students</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat">
          <div className="stat-num">100+</div>
          <div className="stat-label">DSA Problems</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat">
          <div className="stat-num">50+</div>
          <div className="stat-label">Subjects</div>
        </div>
      </div>

      <div className="code-bg">
        <div className="code-line">const student = &#123; year: "CSE_3rd", focus: "System Design", goal: "SDE @FAANG" &#125;; function crack() &#123; study(); practice(); repeat(); &#125; // ByteNexus makes it easy → let success = crack();</div>
      </div>
    </section>
  )
}

export default Hero