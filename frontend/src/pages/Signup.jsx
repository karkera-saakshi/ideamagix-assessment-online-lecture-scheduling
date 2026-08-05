import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'instructor', 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://ideamagix-assessment-online-lecture.onrender.com/api/auth/create", formData )
      .then(() => {
        alert("Account created successfully!");
        setFormData({
          name: '',
          email: '',
          password: '',
          role: 'instructor',
        });
      })
      .catch(() => {
        alert("Error creating account.");
      });
  };

  return (
    <div className="signupContainer">
      <div className="signupCard">
        <div className="signup-header">
          <h2>Create Account</h2>
          <p>Register as an Admin or Instructor to get started</p>
        </div>

        {error && <div className="error-badge">{error}</div>}

        <form onSubmit={handleSubmit} className="signupForm">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="inputContainer">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="inputContainer">
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

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="inputContainer">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="role">Select Role</label>
            <div className="inputContainer">
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

          <button type="submit" className="submitBtn" disabled={loading}>
            {loading ? 'Creating Account...' : (
              <>
                <span>Sign Up</span>
              </>
            )}
          </button>
        </form>

        <div className="signup-footer">
          <p>
            Already have an account? <Link to="/login" className="login-link">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;