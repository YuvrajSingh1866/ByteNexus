import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/subjects.css";
import Footer from "../components/Footer";
const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/subjects")
      .then((res) => res.json())
      .then((data) => {
        // ➕ add extra demo subjects
        const extra = [
          {
            id: 5,
            name: "OOP",
            resources: {
              notes: "#",
              pyqs: "#",
              practice: "#"
            }
          },
          {
            id: 6,
            name: "DSA",
            resources: {
              notes: "#",
              pyqs: "#",
              practice: "#"
            }
          }
        ];

        setSubjects([...data, ...extra]);
      });
  }, []);

  const filteredSubjects =
    searchTerm.trim() === ""
      ? subjects
      : subjects.filter((sub) =>
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

        {/* SEARCH */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* GRID */}
        <div className="subjects-grid">
          {filteredSubjects.map((sub) => (
            <div
              key={sub.id}
              className={`subject-card ${
                activeId === sub.id ? "active" : ""
              }`}
              onClick={() =>
                setActiveId(activeId === sub.id ? null : sub.id)
              }
            >
              <div className="subject-name">{sub.name}</div>

              <div className="subject-desc">
                Click to explore resources
              </div>

              {/* EXPAND INSIDE CARD */}
              {activeId === sub.id && sub.resources && (
                <div className="card-resources">
                  <a href={sub.resources.notes} target="_blank">📘 Notes</a>
                  <a href={sub.resources.pyqs} target="_blank">📝 PYQs</a>
                  <a href={sub.resources.practice} target="_blank">💻 Practice</a>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Subjects;