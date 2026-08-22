import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./Signup.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const inviteToken = searchParams.get("invite");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));

        setMessage("✅ Signup successful 🎉");

        // User came from invite
       if (inviteToken) {
  setTimeout(() => {
    window.location.href =
      `${import.meta.env.VITE_API_URL}/api/rooms/accept/${inviteToken}`;
  }, 500);
  return;
}

        // Normal Signup
        setTimeout(() => {
          navigate("/");
        }, 800);
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <h1 className="signup-heading">
        <span className="gradient-text">Join ByteNexus</span>
        <br />
        <span className="signup-sub">
          Build projects, make friends, and grow as a developer.
        </span>
      </h1>

      <div className="signup-grid">
        <div className="signup-card">
          <h2>Create Account</h2>

          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              onChange={handleChange}
            />

            <button
              type="submit"
              className="signup-btn"
              disabled={loading}
            >
              {loading ? "Creating..." : "Sign Up →"}
            </button>
          </form>

          {message && <p className="signup-message">{message}</p>}

          <p className="signup-login">
            Already have an account?{" "}
            <Link
              to={
                inviteToken
                  ? `/login?invite=${inviteToken}`
                  : "/login"
              }
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Signup;