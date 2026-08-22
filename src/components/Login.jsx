import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./Login.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const inviteToken = searchParams.get("invite");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
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

        setMessage("✅ Login successful 🎉");

        // User came from an invite link
        if (inviteToken) {
          setTimeout(() => {
            window.location.href =
              `${import.meta.env.VITE_API_URL}/api/rooms/accept/${inviteToken}`;
          }, 500);

          return;
        }

        // Normal Login
        setTimeout(() => {
          navigate("/");
        }, 800);
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <h1 className="login-heading">
        <span className="gradient-text">Welcome Back</span>
        <br />
        <span className="login-sub">
          Continue your journey with ByteNexus 🚀
        </span>
      </h1>

      <div className="login-grid">
        <div className="login-card">
          <h2>Login</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
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

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login →"}
            </button>
          </form>

          {message && <p className="login-message">{message}</p>}

          <p className="login-signup">
  Don't have an account?{" "}
  <Link to={inviteToken ? `/signup?invite=${inviteToken}` : "/signup"}>
    Signup
  </Link>
</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;