import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import Navbar from './Navbar'
import Footer from './Footer'

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Login successful 🎉");

        // Store JWT Token
        localStorage.setItem("token", data.token);

        // Store User Data
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect
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

      <h1 className='login-heading'>
        <span className="gradient-text">Welcome Back</span><br />
        <span className='login-sub'>
          Continue your journey with ByteNexus 🚀
        </span>
      </h1>

      <div className='login-grid'>
        <div className='login-card'>

          <h2>Login</h2>

          <form className='login-form' onSubmit={handleSubmit}>
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
              className='login-btn'
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login →"}
            </button>
          </form>

          {message && <p className="login-message">{message}</p>}

          <p className='login-signup'>
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Login