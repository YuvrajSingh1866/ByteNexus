import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./Courses.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { COURSES } from "../data/Courses";


const CATEGORIES = [
  "All",
  "Programming",
  "Web Development",
  "AI & ML",
  "Cyber Security",
  "College",
  "Career",
];

const LEVELS = [
  "All Levels",
  "beginner",
  "intermediate",
  "advanced",
];
/* ── Helpers ──────────────────────────────────────────────────── */
function LevelBadge({ level }) {
  return (
    <span className={`level-badge ${level}`}>
      {level === "beginner" && "○"}
      {level === "intermediate" && "◑"}
      {level === "advanced" && "●"}
      {" "}
      {level}
    </span>
  );
}

function EnrollmentBar({ students, capacity }) {
  const pct = Math.round((students / capacity) * 100);
  return (
    <>
      <div className="enrollment-bar">
        <div className="enrollment-bar__fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="enrollment-label">
        <span>{students.toLocaleString()} enrolled</span>
        <span>{pct}% full</span>
      </div>
    </>
  );
}

function CourseCard({ course, index }) {
   const navigate = useNavigate();

  const isFree = course.price === "free";

  return (
    <article
  className={`course-card${course.featured ? " featured" : ""} ${
    isFree ? "course-card--free" : "course-card--paid"
  }`}
  style={{ animationDelay: `${index * 60}ms` }}
  onClick={() => navigate(`/courses/${course.id}`)}
>
      {/* Price badge */}
      <div className={`course-price-badge ${isFree ? "free" : "paid"}`}>
        {isFree ? "Free" : course.amount}
      </div>

      <div className="course-card__header">
        <span className="course-category">{course.category}</span>
        <span className="course-number">{course.number}</span>
      </div>

      <div className="course-card__body">
        <h2 className="course-title">{course.title}</h2>
        <p className="course-description">{course.description}</p>
        <div className="course-tags">
          {course.tags.map((t) => (
            <span key={t} className="course-tag">
              {t}
            </span>
          ))}
        </div>
      </div>

      <EnrollmentBar students={course.students} capacity={course.capacity} />

      <div className="course-meta">
        <span>
          <span className="icon">⏱</span>
          {course.duration}
        </span>
        <span>
          <span className="icon">▶</span>
          {course.lessons} lessons
        </span>
        <LevelBadge level={course.level} />
      </div>

      <div className="course-card__footer">
        <span className="course-instructor">by {course.instructor}</span>
        <button className={`enroll-btn ${isFree ? "enroll-btn--free" : "enroll-btn--paid"}`}>
          {isFree ? "Enroll Free →" : `Enroll ${course.amount} →`}
        </button>
      </div>
    </article>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function Courses() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All Levels");
  const [view, setView] = useState("grid");

  const filtered = useMemo(() => {
    return COURSES.filter((c) => {
      const matchCat = category === "All" || c.category === category;
      const matchLevel = level === "All Levels" || c.level === level;
      const q = query.toLowerCase();
      const matchQ =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)) ||
        c.instructor.toLowerCase().includes(q);
      return matchCat && matchLevel && matchQ;
    });
  }, [query, category, level]);

  return (
    <div className="courses-page">
      <Navbar />

      {/* ── Hero ── */}
      <header className="courses-hero">
        <p className="courses-hero__subtitle">
          Craft-focused courses for designers, engineers, and strategists who
          want to go beyond tutorials and build something real.
        </p>
      </header>

      {/* ── Toolbar ── */}
      <div className="courses-toolbar">
        <div className="courses-search">
          <span className="courses-search__icon">⌕</span>
          <input
            type="text"
            placeholder="Search courses, topics, instructors…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="courses-filters">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`filter-btn${category === c ? " active" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="courses-filters">
          {LEVELS.map((l) => (
            <button
              key={l}
              className={`filter-btn${level === l ? " active" : ""}`}
              onClick={() => setLevel(l)}
            >
              {l === "All Levels" ? l : l.charAt(0).toUpperCase() + l.slice(1)}
            </button>
          ))}
        </div>

        <div className="view-toggle">
          <button
            className={`view-btn${view === "grid" ? " active" : ""}`}
            onClick={() => setView("grid")}
            title="Grid view"
          >

            ⊞
          </button>
          <button
            className={`view-btn${view === "list" ? " active" : ""}`}
            onClick={() => setView("list")}
            title="List view"
          >
            ☰
          </button>
        </div>
        <button className="upload-course-btn" onClick={() => navigate("/upload-course")}>
          + Upload Course
        </button>
      </div>

      {/* ── Section Label ── */}
      {filtered.length > 0 && (
        <div className="section-divider">
          <span className="section-divider__label">All Courses</span>
          <div className="section-divider__line" />
          <span className="section-divider__count">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* ── Grid / List ── */}
      {filtered.length === 0 ? (
        <div className="courses-empty">
          <span className="courses-empty__icon">◎</span>
          <p>No courses match your filters.</p>
        </div>
      ) : (
        <div className={`courses-grid${view === "list" ? " courses-grid--list" : ""}`}>
          {filtered.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      )}
  <section className="upload-section">

  <h2>Become an Instructor</h2>

  <p>
    Have something valuable to teach?

    Create your own course, upload videos,
    PDFs, coding exercises and assignments.

    Set your own price and earn money every
    time a student enrolls.
  </p>

  <button onClick={() => navigate("/upload-course")}>
    Upload Your First Course
</button>

  <div className="creator-card">

    <div className="creator-stat">
      <h3>Unlimited</h3>
      <span>Students</span>
    </div>

    <div className="creator-stat">
      <h3>Set Your Own</h3>
      <span>Course Price</span>
    </div>

    <div className="creator-stat">
      <h3>100%</h3>
      <span>Creator Dashboard</span>
    </div>

  </div>

</section>
      <Footer />
    </div>
  );
}
