import { useState, useMemo } from "react";
import "./Courses.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ── Data ──────────────────────────────────────────────────────── */
const COURSES = [
  {
    id: 1,
    number: "01",
    category: "Design",
    title: "Typography & Visual Hierarchy",
    description:
      "Master the art of arranging type to guide attention, build rhythm, and communicate meaning before a single word is read. Explore typeface anatomy, pairing logic, and editorial systems.",
    tags: ["Type", "Layout", "Editorial"],
    instructor: "Marina Holst",
    duration: "8 weeks",
    lessons: 24,
    students: 1480,
    capacity: 2000,
    level: "beginner",
    featured: true,
    price: "free",
  },
  {
    id: 2,
    number: "02",
    category: "Development",
    title: "React Architecture Patterns",
    description:
      "Go beyond components. Learn scalable state patterns, composition strategies, and performance primitives that separate hobby projects from production-grade apps.",
    tags: ["React", "State", "Performance"],
    instructor: "Zara Ahmed",
    duration: "10 weeks",
    lessons: 32,
    students: 920,
    capacity: 1200,
    level: "advanced",
    featured: false,
    price: "paid",
    amount: "$49",
  },
  {
    id: 3,
    number: "03",
    category: "Strategy",
    title: "Product Thinking",
    description:
      "Develop the mental models product managers use to prioritise ruthlessly, frame problems precisely, and ship things people actually want.",
    tags: ["PM", "Roadmap", "OKRs"],
    instructor: "Leon Park",
    duration: "6 weeks",
    lessons: 18,
    students: 670,
    capacity: 800,
    level: "intermediate",
    featured: false,
    price: "free",
  },
  {
    id: 4,
    number: "04",
    category: "Data",
    title: "Visual Data Storytelling",
    description:
      "Transform raw numbers into narratives that move people. Study the grammar of charts, the ethics of visualisation, and the craft of a chart that changes minds.",
    tags: ["D3", "Charts", "Narrative"],
    instructor: "Priya Nair",
    duration: "7 weeks",
    lessons: 21,
    students: 540,
    capacity: 600,
    level: "intermediate",
    featured: false,
    price: "paid",
    amount: "$39",
  },
  {
    id: 5,
    number: "05",
    category: "Design",
    title: "Motion & Interaction Design",
    description:
      "Animation is not decoration — it is communication. Learn timing functions, spring physics, and choreography to build interfaces that feel inevitable.",
    tags: ["Animation", "CSS", "Figma"],
    instructor: "Yuki Tanaka",
    duration: "9 weeks",
    lessons: 27,
    students: 310,
    capacity: 500,
    level: "advanced",
    featured: false,
    price: "paid",
    amount: "$59",
  },
  {
    id: 6,
    number: "06",
    category: "Development",
    title: "API Design & REST Principles",
    description:
      "Write APIs that developers love: consistent, predictable, and versioned without drama. Covers resource modelling, error contracts, and documentation that doesn't need a Slack to interpret.",
    tags: ["REST", "Node", "OpenAPI"],
    instructor: "Sam Torres",
    duration: "5 weeks",
    lessons: 15,
    students: 820,
    capacity: 1000,
    level: "beginner",
    featured: false,
    price: "free",
  },
  {
    id: 7,
    number: "07",
    category: "Strategy",
    title: "Brand Identity Systems",
    description:
      "Logos are the least interesting part of a brand. This course teaches you to build systems: voice, motion language, colour semantics, and governance that scales.",
    tags: ["Branding", "System", "Identity"],
    instructor: "Amara Diallo",
    duration: "8 weeks",
    lessons: 22,
    students: 450,
    capacity: 600,
    level: "intermediate",
    featured: false,
    price: "paid",
    amount: "$44",
  },
];

const CATEGORIES = ["All", "Design", "Development", "Strategy", "Data"];
const LEVELS = ["All Levels", "beginner", "intermediate", "advanced"];

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
  const isFree = course.price === "free";

  return (
    <article
      className={`course-card${course.featured ? " featured" : ""} ${isFree ? "course-card--free" : "course-card--paid"}`}
      style={{ animationDelay: `${index * 60}ms` }}
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

      <Footer />
    </div>
  );
}
