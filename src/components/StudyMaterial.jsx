import React from 'react'

const StudyMaterial = () => {
  return (
    <section id="study">
      <div className="container">
        <div className="section-label reveal">Study Material</div>
        <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20}}>
          <div>
            <h2 className="section-title reveal">CSE <span className="gradient-text">Resources</span><br/>By Year</h2>
            <p className="section-desc reveal">Access curated notes, previous year papers, and subject-wise resources for every semester.</p>
          </div>
        </div>
        <div className="year-grid">
          <div className="year-card reveal">
            <div className="year-num">01</div>
            <div className="year-title">CSE · 1st Year's Resource</div>
            <ul className="subject-list">
              <li>Engineering Mathematics</li>
              <li>Programming in C</li>
              <li>Digital Electronics</li>
              <li>Physics & Chemistry</li>
              <li>Communication Skills</li>
            </ul>
            <button className="btn-card">↓ Download Notes</button>
          </div>
          <div className="year-card reveal" style={{transitionDelay: '0.1s'}}>
            <div className="year-num">02</div>
            <div className="year-title">CSE · 2nd Year's Resource</div>
            <ul className="subject-list">
              <li>Data Structures & Algorithms</li>
              <li>Object Oriented Programming</li>
              <li>Database Management Systems</li>
              <li>Computer Organization</li>
              <li>Discrete Mathematics</li>
            </ul>
            <button className="btn-card">↓ Download Notes</button>
          </div>
          <div className="year-card reveal" style={{transitionDelay: '0.2s'}}>
            <div className="year-num">03</div>
            <div className="year-title">CSE · 3rd Year's Resource</div>
            <ul className="subject-list">
              <li>Operating Systems</li>
              <li>Computer Networks</li>
              <li>System Design</li>
              <li>Compiler Design</li>
              <li>Software Engineering</li>
            </ul>
            <button className="btn-card">↓ Download Notes</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StudyMaterial