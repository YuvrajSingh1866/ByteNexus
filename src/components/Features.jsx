import React from 'react'

const Features = () => {
  return (
    <section id="features" className="features-bg">
      <div className="container">
        <div className="section-label reveal">Platform Features</div>
        <h2 className="section-title reveal">Everything You Need<br/><span className="gradient-text">To Succeed</span></h2>
        <p className="section-desc reveal">From DSA practice to interview prep — ByteNexus has it all in one beautiful platform.</p>

        <div className="features-grid">
          <div className="feature-card reveal">
            <div className="feature-icon">⌨️</div>
            <div className="feature-title">Coding Playground</div>
            <p className="feature-desc">Write, compile and run code directly in the browser. Supports 10+ languages including Python, Java, C++.</p>
          </div>
          <div className="feature-card reveal" style={{transitionDelay: '0.05s'}}>
            <div className="feature-icon">📚</div>
            <div className="feature-title">Notes Library</div>
            <p className="feature-desc">Handpicked, high-quality notes for every subject — contributed by toppers and verified by faculty.</p>
          </div>
          <div className="feature-card reveal" style={{transitionDelay: '0.1s'}}>
            <div className="feature-icon">💼</div>
            <div className="feature-title">Interview Questions</div>
            <p className="feature-desc">Company-wise and topic-wise interview question bank curated from real interview experiences.</p>
          </div>
          <div className="feature-card reveal" style={{transitionDelay: '0.15s'}}>
            <div className="feature-icon">🧠</div>
            <div className="feature-title">DSA Practice</div>
            <p className="feature-desc">Structured DSA roadmap with 400+ problems organized by difficulty — from arrays to graphs.</p>
          </div>
          <div className="feature-card reveal" style={{transitionDelay: '0.2s'}}>
            <div className="feature-icon">📄</div>
            <div className="feature-title">Previous Year Papers</div>
            <p className="feature-desc">Solved PYQs from 2015 to 2025 with detailed explanations and answer keys for all semesters.</p>
          </div>
          <div className="feature-card reveal" style={{transitionDelay: '0.25s'}}>
            <div className="feature-icon">🎯</div>
            <div className="feature-title">Learning Hub</div>
            <p className="feature-desc">Curated video lectures, project ideas, and roadmaps for SDE, ML, and DevOps career paths.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features