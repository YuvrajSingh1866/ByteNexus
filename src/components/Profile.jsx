import React, { useState, useMemo, useEffect } from "react";
import "./Profile.css";

/* -------------------------------------------------------------------- */
/*  Dummy data — swap for API data once the backend is wired up          */

const PLACEHOLDER_POSTS = [
  { id: 1, title: "How I finally understood recursion (with pictures)", meta: "Posted in DSA Grinders · 2d ago", stat: "312 upvotes" },
  { id: 2, title: "My take on the new React Compiler — worth the hype?", meta: "Posted in React Devs India · 5d ago", stat: "189 upvotes" },
  { id: 3, title: "Shipped my first full-stack project: DoubtDesk", meta: "Posted in Projects · 1w ago", stat: "241 upvotes" },
];

const PLACEHOLDER_COMMENTS = [
  { id: 1, title: "Reply on \"Best way to learn system design in 2026?\"", meta: "in Hackathon Squad · 1d ago", stat: "44 upvotes" },
  { id: 2, title: "Reply on \"MongoDB vs PostgreSQL for student projects\"", meta: "in Open Source Club · 3d ago", stat: "31 upvotes" },
  { id: 3, title: "Reply on \"Struggling with dynamic programming\"", meta: "in DSA Grinders · 6d ago", stat: "58 upvotes" },
];

const PLACEHOLDER_SAVED = [
  { id: 1, title: "Roadmap: Zero to Full-Stack in 6 months", meta: "Saved from Notes Hub · Course", stat: "Bookmarked" },
  { id: 2, title: "Cheat sheet — Time & Space Complexity", meta: "Saved from DSA Grinders · Notes", stat: "Bookmarked" },
  { id: 3, title: "Winning project ideas for hackathons", meta: "Saved from Hackathon Squad · Post", stat: "Bookmarked" },
];

const TABS = [
  { key: "posts", label: "Posts", data: PLACEHOLDER_POSTS },
  { key: "comments", label: "Comments", data: PLACEHOLDER_COMMENTS },
  { key: "saved", label: "Saved", data: PLACEHOLDER_SAVED },
];

/* Deterministic pseudo-random activity grid, GitHub-contribution style */
function useActivityGrid(weeks = 26) {
  return useMemo(() => {
    let seed = 42;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    return Array.from({ length: weeks }, () =>
      Array.from({ length: 7 }, () => Math.floor(rand() * 5))
    );
  }, [weeks]);
}

/* -------------------------------------------------------------------- */
/*  Icons — tiny inline SVGs, no icon library dependency                 */
/* -------------------------------------------------------------------- */

const Icon = {
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M9.5 14.5 14.5 9.5" />
      <path d="M11.5 5.5 13 4a4 4 0 1 1 5.7 5.7l-1.5 1.5" />
      <path d="M12.5 18.5 11 20a4 4 0 1 1-5.7-5.7l1.5-1.5" />
    </svg>
  ),
  posts: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 5h16M4 12h16M4 19h10" />
    </svg>
  ),
  comments: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" />
    </svg>
  ),
  saved: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 21 12 16l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z" />
    </svg>
  ),
  communities: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
      <circle cx="17.5" cy="9.5" r="2.3" />
      <path d="M15.8 14.2c2.9.3 5.2 2.5 5.2 5.3" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
};

/* -------------------------------------------------------------------- */
/*  Sub-components                                                       */
/* -------------------------------------------------------------------- */

function StatCard({ icon, label, value }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-body">
        <span className="stat-value">{value.toLocaleString()}</span>
        <span className="stat-label">{label}</span>
      </div>
    </div>
  );
}

function ActivityGraph() {
  const grid = useActivityGrid(26);
  const levelClass = (v) => `cell level-${v}`;
  return (
    <div className="activity-card">
      <div className="activity-header">
        <h3>Activity</h3>
        <span className="activity-sub">182 contributions in the last 6 months</span>
      </div>
      <div className="activity-grid">
        {grid.map((col, i) => (
          <div className="activity-col" key={i}>
            {col.map((v, j) => (
              <span className={levelClass(v)} key={j} title={`${v} contributions`} />
            ))}
          </div>
        ))}
      </div>
      <div className="activity-legend">
        <span>Less</span>
        <span className="cell level-0" />
        <span className="cell level-1" />
        <span className="cell level-2" />
        <span className="cell level-3" />
        <span className="cell level-4" />
        <span>More</span>
      </div>
    </div>
  );
}

function PlaceholderCard({ item }) {
  
  return (
    <article className="placeholder-card">
      <h4>{item.title}</h4>
      <div className="placeholder-meta">
        <span>{item.meta}</span>
        <span className="dot">•</span>
        <span className="placeholder-stat">{item.stat}</span>
      </div>
    </article>
  );
}

function EditProfileModal({ user, onClose, onSave }) {
  const [form, setForm] = useState({
    name: user.name,
    username: user.username,
    bio: user.bio,
    college: user.college,
    branch: user.branch,
    year: user.year,
    github: user.github,
    linkedin: user.linkedin,
    portfolio: user.portfolio,
    skills: user.skills.join(", "),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-profile-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          <h2 id="edit-profile-title">Edit profile</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            {Icon.close}
          </button>
        </header>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label className="field">
              <span>Name</span>
              <input name="name" value={form.name} onChange={handleChange} />
            </label>
            <label className="field">
              <span>Username</span>
              <input name="username" value={form.username} onChange={handleChange} />
            </label>
          </div>

          <label className="field">
            <span>Bio</span>
            <textarea name="bio" rows="3" value={form.bio} onChange={handleChange} />
          </label>

          <div className="form-grid">
            <label className="field">
              <span>College</span>
              <input name="college" value={form.college} onChange={handleChange} />
            </label>
            <label className="field">
              <span>Branch</span>
              <input name="branch" value={form.branch} onChange={handleChange} />
            </label>
          </div>

          <label className="field">
            <span>Year</span>
            <input name="year" value={form.year} onChange={handleChange} />
          </label>

          <div className="form-divider">Social links</div>

          <div className="form-grid">
            <label className="field">
              <span>GitHub</span>
              <input name="github" value={form.github} onChange={handleChange} />
            </label>
            <label className="field">
              <span>LinkedIn</span>
              <input name="linkedin" value={form.linkedin} onChange={handleChange} />
            </label>
          </div>

          <label className="field">
            <span>Portfolio</span>
            <input name="portfolio" value={form.portfolio} onChange={handleChange} />
          </label>

          <label className="field">
            <span>Skills (comma separated)</span>
            <input name="skills" value={form.skills} onChange={handleChange} />
          </label>

          <footer className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save changes
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  Main component                                                       */
/* -------------------------------------------------------------------- */

export default function Profile() {
  const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("posts");
  const [isModalOpen, setModalOpen] = useState(false);
useEffect(() => {
    const fetchProfile = async () => {
        try {

            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/users/profile`,
                {
                    credentials: "include",
                }
            );

            const data = await res.json();

            setUser(data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }
    };

    fetchProfile();

}, []);
  const handleSave = async (form) => {

    try {

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/users/profile`,
            {
                method: "PUT",

                credentials: "include",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({

                    name: form.name,

                    username: form.username,

                    bio: form.bio,

                    college: form.college,

                    branch: form.branch,

                    year: form.year,

                    github: form.github,

                    linkedin: form.linkedin,

                    portfolio: form.portfolio,

                    skills: form.skills
                        .split(",")
                        .map(skill => skill.trim())
                        .filter(Boolean)

                })
            }
        );

      
       const data = await response.json();

if (response.ok) {
    setUser(data.user);
    setModalOpen(false);
} else {
    alert(data.message);
}
    } catch(err){

        console.error(err);

    }

}
  const activeData = TABS.find((t) => t.key === activeTab)?.data ?? [];
if (loading || !user) {
    return <h2>Loading Profile...</h2>;
}
  return (
    <div className="profile-page">
      {/* ---------------------------------------------------------- */}
      {/* HEADER                                                      */}
      {/* ---------------------------------------------------------- */}
      <section className="profile-header">
        <div className="header-banner" aria-hidden="true" />

        <div className="header-content">
          <div className="avatar-wrap">
            <img src={user.avatar} alt={`${user.name}'s avatar`} className="avatar" />
            <span className="avatar-status" title="Online" />
          </div>

          <div className="header-main">
            <div className="header-title-row">
              <div>
                <h1 className="profile-name">{user.name}</h1>
                <p className="profile-username">@{user.username}</p>
              </div>
              <button className="btn btn-primary edit-btn" onClick={() => setModalOpen(true)}>
                Edit profile
              </button>
            </div>

            <p className="profile-bio">{user.bio}</p>

            <ul className="profile-meta">
              <li>
                <span className="meta-label">College</span>
                {user.college || "Not specified"}
              </li>
              <li>
                <span className="meta-label">Branch</span>
                {user.branch || "Not specified"}
              </li>
              <li>
                <span className="meta-label">Year</span>
                {user.year || "Not specified"}
              </li>
              <li>
                <span className="meta-label">Joined</span>
                {new Date(user.createdAt).toLocaleDateString()}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* SOCIAL LINKS                                                */}
      {/* ---------------------------------------------------------- */}
      <section className="social-row" aria-label="Social links">
        <a
          className="social-pill"
          href={user.github ? `https://${user.github}` : "#"}
          target="_blank"
          rel="noreferrer"
        >
          <span className="social-icon">{Icon.github}</span>
          GitHub
        </a>
        <a
          className="social-pill"
          href={user.linkedin ? `https://${user.linkedin}` : "#"}
          target="_blank"
          rel="noreferrer"
        >
          <span className="social-icon">{Icon.linkedin}</span>
          LinkedIn
        </a>
        <a
          className="social-pill"
          href={user.portfolio ? `https://${user.portfolio}` : "#"}
          target="_blank"
          rel="noreferrer"
        >
          <span className="social-icon">{Icon.link}</span>
          Portfolio
        </a>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* SKILLS                                                      */}
      {/* ---------------------------------------------------------- */}
      <section className="skills-section">
        <h2 className="section-title">Skills</h2>
        <div className="skills-chip-row">
          {(user.skills || []).map((skill) => (
    <span className="skill-chip" key={skill}>
        {skill}
    </span>
))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* STATS                                                       */}
      {/* ---------------------------------------------------------- */}
      <section className="stats-section">
        <h2 className="section-title">Overview</h2>
        <div className="stats-grid">
          <StatCard icon={Icon.posts} label="Posts" value={0} />
          <StatCard icon={Icon.comments} label="Comments" value={0} />
          <StatCard icon={Icon.saved} label="Saved posts" value={0} />
          <StatCard icon={Icon.communities} label="Communities" value={0} />
        </div>
        <ActivityGraph />
      </section>

      {/* ---------------------------------------------------------- */}
      {/* MAIN LAYOUT: TABS + SIDEBAR                                 */}
      {/* ---------------------------------------------------------- */}
      <section className="content-layout">
        <div className="tabs-column">
          <div className="tabs-nav" role="tablist" aria-label="Profile content">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                role="tab"
                aria-selected={activeTab === tab.key}
                className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="tab-panel">
            {activeData.map((item) => (
              <PlaceholderCard item={item} key={item.id} />
            ))}
          </div>
        </div>

        <aside className="sidebar-column">
          <div className="sidebar-card">
            <h3 className="sidebar-title">Reputation</h3>
            <p className="reputation-value">{(user.reputation || 0).toLocaleString()}</p>
            <p className="reputation-sub">Top 5% on ByteNexus this month</p>
          </div>

          <div className="sidebar-card">
            <h3 className="sidebar-title">Badges</h3>
            <div className="badge-list">
              {(user.badges || []).map((badge) => (
    <span className="badge-chip" key={badge}>
        {badge}
    </span>
))}
            </div>
          </div>

          <div className="sidebar-card">
            <h3 className="sidebar-title">Communities joined</h3>
            <ul className="community-list">
              {(user.joinedCommunities || []).map((c) => (
                <li key={c._id || c}>
    {c.name || c}
</li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      {isModalOpen && (
        <EditProfileModal user={user} onClose={() => setModalOpen(false)} onSave={handleSave} />
      )}
    </div>
  );
}
