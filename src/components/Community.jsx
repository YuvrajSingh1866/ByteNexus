import React from 'react'

const Community = () => {
  return (
    <section id="community">
      <div className="container">
        <div className="community-cta reveal">
          <div style={{fontSize: '3rem', marginBottom: 20}}>💬</div>
          <h2>Join the <span className="gradient-text">ByteNexus</span> Community</h2>
          <p>Connect with 3,000+ CSE students, get instant updates, and never miss a new resource drop.</p>
          <div style={{display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap'}}>
            <a href="#" className="btn-primary">Join WhatsApp Community →</a>
            <a href="#" className="btn-secondary">Discord Server</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Community