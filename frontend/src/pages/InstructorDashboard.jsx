import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InstructorDashboard.css';

const InstructorDashboard = () => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const instructorId = storedUser._id || storedUser.id;
  const name = storedUser.name || 'Instructor';

  useEffect(() => {
    if (instructorId) {
      fetchLectures();
    } else {
      setLoading(false);
      setError('No logged-in instructor session found. Please log in.');
    }
  }, [instructorId]);

  const fetchLectures = () => {
    setLoading(true);
  
    axios.get(`https://ideamagix-assessment-online-lecture.onrender.com/api/lectures/instructor/${instructorId}`)
    .then((res) => {
      setLectures(Array.isArray(res.data) ? res.data : []);
      setError(null);
    })
    .catch((err) => {
      console.error('Failed to fetch assigned lectures:', err);
      setError('Failed to load your assigned lectures.');
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="lecture-container">
      <header className="main-header">
        <div>
          <h1>Welcome, {name}!</h1>
          <p>Here is the list of all lectures assigned to you</p>
        </div>
      </header>

      <section className="dashboard-lecture-card lecture-section">
        <div className="title">
          <h2>My Assigned Lectures ({lectures.length})</h2>
        </div>

        {loading ? (
          <p className="loading">Loading assigned lectures...</p>
        ) : error ? (
          <div className="error-box">
            <span>{error}</span>
          </div>
        ) : lectures.length === 0 ? (
          <div className="emptylecture-card">
            <p className="emptyText">No lectures currently assigned to you.</p>
          </div>
        ) : (
          <div className="lecture-grid">
            {lectures.map((lec, idx) => (
              <div key={lec._id || idx} className="lecture-card">
                
                <div className="lecture-card-header">
                  <div className="course-badge">
                    <h3>{lec.courseName || 'Unspecified Course'}</h3>
                  </div>
                  {lec.date && <span className="lecture-date">{lec.date}</span>}
                </div>

                <div className="body">
                  <div className="row">
                    <span><strong>Time Slot:</strong> {lec.time || 'Not specified'}</span>
                  </div>

                  {lec.batchName && (
                    <div className="row">
                      <span><strong>Batch / Code:</strong> {lec.batchName}</span>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default InstructorDashboard;