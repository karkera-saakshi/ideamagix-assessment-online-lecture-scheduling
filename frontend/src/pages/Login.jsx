import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'instructor' 
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:9000/api/auth/login", formData)
      .then((res) => {
        alert("Logged in successfully!");
        
        if (formData.role === 'admin') {
          navigate('/admin');
        } 
        else {
          navigate('/instructor');
        }

        setFormData({
          email: '',
          password: '',
          role: 'instructor',
        });
      })
      .catch(() => {
        alert("Error logging in.");
      });
  };

  
  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h2>Welcome Back</h2>
          <p>Log in with your credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="group">
            <label htmlFor="email">Email Address</label>
            <div className="input">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="group">
            <label htmlFor="password">Password</label>
            <div className="input">
              <input
                type="password"
                id="password"
                name="password"
                placeholder = "••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="group">
            <label htmlFor="role">Select Role</label>
            <div className="input">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            <span>Log In</span>
          </button>
        </form>

        <div className="footer">
          <p>
            Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;