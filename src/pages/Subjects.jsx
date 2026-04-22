import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/subjects.css";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/subjects")
      .then((res) => res.json())
      .then((data) => {
        setSubjects(data);
      });
  }, []);

  const filteredSubjects = subjects.filter((sub) =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <main className="subjects-page">
        <div className="page-hero">
          <h1 className="page-title">
            <span className="highlight">Subjects</span>
          </h1>

          <p className="page-subtitle">
            Search and access subject resources
          </p>
        </div>

        {/* 🔍 SEARCH */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search subject..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedSubject(null);
            }}
          />
        </div>

        {/* 📚 SUBJECT LIST */}
        <div className="subjects-content">
          {filteredSubjects.length === 0 ? (
            <p className="no-results">No subjects found 😢</p>
          ) : (
            filteredSubjects.map((sub) => (
              <div
                key={sub.id}
                onClick={() => setSelectedSubject(sub)}
                className={`subject-card ${
                  selectedSubject?.id === sub.id ? "active" : ""
                }`}
              >
                <div className="subject-name">{sub.name}</div>
              </div>
            ))
          )}
        </div>

        {/* 📂 RESOURCES */}
        {selectedSubject && (
          <div className="resources-section">
            <h2>{selectedSubject.name}</h2>

            {selectedSubject.resources ? (
              <div className="resource-links">
                <a
                  href={selectedSubject.resources.notes}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-btn"
                >
                  📘 Notes
                </a>

                <a
                  href={selectedSubject.resources.pyqs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-btn"
                >
                  📝 PYQs
                </a>

                <a
                  href={selectedSubject.resources.practice}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-btn"
                >
                  💻 Practice
                </a>
              </div>
            ) : (
              <p>No resources available</p>
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default Subjects;