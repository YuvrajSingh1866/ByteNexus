import React from 'react'

const Updates = () => {
  return (
    <section>
      <div className="container">
        <div className="divider"></div>
        <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 80, flexWrap: 'wrap', gap: 20}}>
          <div>
            <div className="section-label reveal">Latest Updates</div>
            <h2 className="section-title reveal">What's <span className="gradient-text">New</span></h2>
          </div>
          <a href="#" className="btn-secondary reveal" style={{fontSize: '0.875rem', padding: '10px 24px'}}>View All →</a>
        </div>
        <div className="updates-grid">
          <div className="update-card reveal">
            <div className="update-dot"></div>
            <div className="update-date">September 24, 2025</div>
            <div className="update-title">Computer Networks Notes Update</div>
            <p className="update-desc">Thanks to Kirti Mangal for this contribution — complete unit-wise notes now available.</p>
          </div>
          <div className="update-card reveal" style={{transitionDelay: '0.05s'}}>
            <div className="update-dot" style={{background: 'var(--accent-purple)', boxShadow: '0 0 10px var(--accent-purple)'}}></div>
            <div className="update-date">September 23, 2025</div>
            <div className="update-title">System Design Notes Updated</div>
            <p className="update-desc">Thanks to Manya for this contribution — new chapters on microservices added.</p>
          </div>
          <div className="update-card reveal" style={{transitionDelay: '0.1s'}}>
            <div className="update-dot" style={{background: 'var(--accent-green)', boxShadow: '0 0 10px var(--accent-green)'}}></div>
            <div className="update-date">September 10, 2025</div>
            <div className="update-title">Learning Hub Content Update</div>
            <p className="update-desc">Added a lot of content — new video playlists and project repos linked.</p>
          </div>
          <div className="update-card reveal" style={{transitionDelay: '0.15s'}}>
            <div className="update-dot" style={{background: '#fb923c', boxShadow: '0 0 10px #fb923c'}}></div>
            <div className="update-date">September 2, 2025</div>
            <div className="update-title">System Design Material Updated</div>
            <p className="update-desc">Official YouTube channel of ByteNexus now active — subscribe for weekly uploads.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Updates