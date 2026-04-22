import React from 'react'

const VideoCard = () => {
  return (
    <section style={{padding: '0 20px 80px', position: 'relative', zIndex: 1}}>
      <div className="container">
        <div className="divider"></div>

        <div className="video-card reveal" style={{marginTop: 60}}>
          <div className="video-play">▶</div>

          <div className="video-info">
            <div className="video-meta">
              <span>⬡ ThatNotesGuy × ByteNexus</span>
              <span>·</span>
              <span>Sep 4, 2025</span>
            </div>

            <div className="video-title">
              How Billion-User Apps Actually Work: Database Sharding & Partitioning Explained
            </div>

            <div className="video-tags">
              <span className="tag">Latest Video</span>
              <span className="tag">System Design</span>
              <span className="tag">Backend</span>
            </div>
          </div>

          <div style={{textAlign: 'right', flexShrink: 0}}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem',
                color: 'var(--text-secondary)',
                marginBottom: 8
              }}
            >
              WATCH NOW
            </div>

            <div
              style={{
                fontSize: '2rem',
                color: 'var(--accent-cyan)',
                animation: 'pulse 2s ease-in-out infinite'
              }}
            >
              →
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoCard