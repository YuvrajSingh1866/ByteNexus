import "./CourseDetails.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { COURSES } from "../data/courses";

export default function CourseDetails() {

    const { id } = useParams();

const course = COURSES.find(
    (c) => c.id === Number(id)
);
if (!course) {

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#070d1a",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "2rem",
            }}
        >
            Course Not Found
        </div>
    );

}

    return (

        <div className="course-details-page">

            <Navbar />

            <section className="course-hero">

                <div className="course-left">

                    <span className="course-badge">
                        {course.official ? "Official Course" : "Community Course"}
                    </span>

                    <h1>{course.title}</h1>

                    <p>{course.description}</p>

                    <div className="course-info">

                        <span>
⭐ {course.rating}
</span>

                        <span>👥 {course.students.toLocaleString()} Students</span>

                        <span>📚 {course.lessons} Lessons</span>

                        <span>⏱ {course.duration}</span>

                    </div>

                    <div className="course-buttons">

                        <button className="buy-btn">
                            Buy Now • {course.price === "free" ? "Free" : course.amount}
                        </button>

                        <button className="wishlist-btn">
                            Add Wishlist
                        </button>

                    </div>

                </div>

                <div className="course-right">

                    <div className="course-thumbnail">

    <div className="play-circle">
        ▶
    </div>

    <h2>{course.title}</h2>

    <div className="thumbnail-meta">

        <span>{course.duration}</span>

        <span>{course.lessons} Lessons</span>

        <span>⭐ {course.rating}</span>

        <span>{course.category}</span>

    </div>

</div>

                </div>

            </section>
            {/* ================= WHAT YOU'LL LEARN ================= */}
<div className="course-content">

    <div className="course-main">

        {/* What You'll Learn */}

        {/* Requirements */}

        {/* Curriculum */}

        {/* Reviews */}

    </div>

    <aside className="purchase-card">

        <img
            src={course.thumbnail}
            alt={course.title}
            className="purchase-image"
        />

        <h2>

            {course.price === "free"
                ? "Free"
                : course.amount}

        </h2>

        <button className="purchase-btn">

            {course.price === "free"
                ? "Enroll Now"
                : "Buy Course"}

        </button>

        <button className="wishlist-btn-card">

            ❤ Add Wishlist

        </button>

        <div className="includes">

            <h4>This Course Includes</h4>

            <p>🎥 {course.duration} of video</p>

            <p>📚 {course.lessons} lessons</p>

            <p>📄 Downloadable Resources</p>

            <p>🏆 Certificate of Completion</p>

            <p>📱 Mobile & Desktop Access</p>

            <p>♾ Lifetime Access</p>

        </div>

    </aside>

</div>
            <Footer />

        </div>

    );

}