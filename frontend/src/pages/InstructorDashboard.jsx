import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InstructorDashboard.css';

const InstructorDashboard = () => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [instructorInfo, setInstructorInfo] = useState({ id: null, name: 'Instructor' });

  useEffect(() => {
    const rawUserData = localStorage.getItem('user');

    if (!rawUserData) {
      setLoading(false);
      setError('No logged-in instructor session found. Please log in.');
      return;
    }

    try {
      const parsedUser = JSON.parse(rawUserData);
      
      const foundId = parsedUser._id || parsedUser.id || parsedUser.instructorId;
      const foundName = parsedUser.name || parsedUser.username || 'Instructor';

      if (foundId) {
        setInstructorInfo({ id: foundId, name: foundName });
        fetchLectures(foundId);
      } else {
        setLoading(false);
        setError('User session invalid (ID missing). Please log in again.');
      }
    } catch (e) {
      console.error('Error parsing local storage user:', e);
      setLoading(false);
      setError('Corrupted session data. Please log in again.');
    }
  }, []);

  const fetchLectures = (id) => {
    setLoading(true);

    axios
      .get(`https://ideamagix-assessment-online-lecture.onrender.com/api/lectures/instructor/${id}`)
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
          <h1>Welcome, {instructorInfo.name}!</h1>
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
                    <h3>{lec.courseName || lec.course || 'Unspecified Course'}</h3>
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