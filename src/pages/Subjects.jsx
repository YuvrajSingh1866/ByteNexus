import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/subjects.css";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [secondYearSubjects, setSecondYearSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("import.meta.env.VITE_API_URL/api/subjects/first-year").then((res) => res.json()),
      fetch("import.meta.env.VITE_API_URL/api/subjects/second-year").then((res) => res.json())
    ])
      .then(([firstYearData, secondYearData]) => {
        setSubjects(firstYearData);
        setSecondYearSubjects(secondYearData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching subjects:", err);
        setLoading(false);
      });
  }, []);

  const filteredFirstYearSubjects = subjects.filter((sub) =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredSecondYearSubjects = secondYearSubjects.filter((sub) =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalResults = filteredFirstYearSubjects.length + filteredSecondYearSubjects.length;

  return (
    <>
      <Navbar />

      <main className="subjects-page">
        <div className="page-hero">
          <div className="page-breadcrumb">
            <span>ByteNexus</span>
            <span className="sep">/</span>
            <span>Academic</span>
            <span className="sep">/</span>
            <span style={{ color: 'var(--text-primary)' }}>Subjects</span>
          </div>

          <h1 className="page-title">
            <span className="highlight">Subjects</span>
          </h1>
          <p className="page-subtitle">Browse and search through our comprehensive collection of first-year academic resources</p>

          <div className="search-wrap">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search subjects…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <p className="result-count">Showing <strong>{totalResults}</strong> subjects</p>
          </div>
        </div>

        <div className="page-divider"></div>

        <div className="subjects-content">
          <div className="year-section">
            <div className="year-header">
              <h2 className="year-heading">1st Year</h2>
              <span className="year-badge">● {subjects.length} subjects</span>
              <div className="year-line"></div>
            </div>

            {loading ? (
              <div className="loading-spinner"></div>
            ) : (
              <div className="subjects-grid">
                {filteredFirstYearSubjects.map((sub) => (
                  <Link
                    key={sub._id}
                    to={`/subject/${sub.slug}`}
                    state={{ type: "first-year" }}
                    className="subject-card"
                  >
                    <div className="subject-icon-box">📘</div>
                    <div className="subject-info">
                      <div className="subject-name">{sub.name}</div>
                      <div className="subject-year-tag">CSE – 1st Year</div>
                    </div>
                    <div className="subject-link">View Page <span className="arrow">→</span></div>
                  </Link>
                ))}
                {filteredFirstYearSubjects.length === 0 && (
                  <div style={{ color: 'var(--text-secondary)' }}>No subjects found matching your search.</div>
                )}
              </div>
            )}
          </div>

          <div className="year-section" style={{ marginTop: '40px' }}>
            <div className="year-header">
              <h2 className="year-heading">CSE 2nd Year</h2>
              <span className="year-badge">● {secondYearSubjects.length} subjects</span>
              <div className="year-line"></div>
            </div>

            {loading ? (
              <div className="loading-spinner"></div>
            ) : (
              <div className="subjects-grid">
                {filteredSecondYearSubjects.map((sub) => (
                  <Link
                    key={sub._id}
                    to={`/subject/${sub.slug}`}
                    state={{ type: "second-year" }}
                    className="subject-card"
                  >
                    <div className="subject-icon-box">📘</div>
                    <div className="subject-info">
                      <div className="subject-name">{sub.name}</div>
                      <div className="subject-year-tag">CSE – 2nd Year</div>
                    </div>
                    <div className="subject-link">View Page <span className="arrow">→</span></div>
                  </Link>
                ))}
                {filteredSecondYearSubjects.length === 0 && (
                  <div style={{ color: 'var(--text-secondary)' }}>No subjects found matching your search.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Subjects;