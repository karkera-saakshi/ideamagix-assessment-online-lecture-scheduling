import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [activeModal, setActiveModal] = useState(null); 

  const [courseForm, setCourseForm] = useState({
    name: '',
    level: 'Beginner',
    description: '',
    image: '',
    batchNames: ''
  });

  const [lectureForm, setLectureForm] = useState({
    courseId: '',
    instructorId: '',
    date: '',
    time: '',
    batchName: ''
  });

  useEffect(() => {
    fetchCourses();
    fetchInstructors();
    fetchLectures();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:9000/api/course/list');
      setCourses(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log('Failed to fetch courses:', err);
    }
  };

  const fetchInstructors = async () => {
    try {
      const res = await axios.get('http://localhost:9000/api/auth/instructors');
      setInstructors(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log('Failed to fetch instructors:', err);
    }
  };

  const fetchLectures = async () => {
    try {
      const res = await axios.get(`http://localhost:9000/api/lectures/getAllLectures?t=${Date.now()}`);
      setLectures(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log('Failed to fetch lectures:', err);
    }
  };

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    const formattedBatches = courseForm.batchNames
    .split(',')
    .map((b) => b.trim())
    .filter(Boolean);

    const payload = 
    {
      ...courseForm,
      batches: formattedBatches
    };

    axios.post('http://localhost:9000/api/course/create', payload)
      .then(() => {
        alert('Course added successfully!');
        setCourseForm({ name: '', level: 'Beginner', description: '', image: '', batchNames: '' });
        setActiveModal(null);
        fetchCourses();
      })
      .catch(() => {
        alert('Failed to create course.');
      });
  };

  const handleLectureSubmit = (e) => {
    e.preventDefault();
    const selectedCourse = courses.find((c) => c._id === lectureForm.courseId);
    const selectedInstructor = instructors.find((inst) => inst._id === lectureForm.instructorId);

    const payload = {
      ...lectureForm,
      courseName: selectedCourse ? selectedCourse.name : '',
      instructorName: selectedInstructor ? selectedInstructor.name : ''
    };

    axios.post("http://localhost:9000/api/lectures/create", payload)
    .then(() => {
        alert("Lecture scheduled successfully!");
        setLectureForm({ courseId: '', instructorId: '', date: '', time: '', batchName: '' });
        setActiveModal(null);
        fetchLectures();
      })
    .catch((err) => {
        const errorMsg = err.response?.data?.message || "Error scheduling lecture.";
        alert(`Conflict Error: ${errorMsg}`);
      });
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage your university courses, instructors, and lecture schedules</p>
        </div>
        <div className="action-buttons">
          <button className="primaryBtn" onClick={() => setActiveModal('course')}>
            Add Course
          </button>
          <button className="secondary-btn" onClick={() => setActiveModal('lecture')}>
            Add Lecture
          </button>
        </div>
      </header>

      <section className="dashboard-card lecture-section">
        <div className="title">
          <h2>Scheduled Lectures ({lectures.length})</h2>
        </div>

        <div className="lecture-container">
          {lectures.length === 0 ? (
            <p className="empty-text">No lectures scheduled yet.</p>
          ) : (
            lectures.map((lec, idx) => {
              const courseName = lec.courseName || 'Unspecified Course';
              const instructorName = lec.instructorName || 'Unassigned';

              return (
                <div key={lec._id || idx} className="lecture-card">
                  <div className="lecture-header">
                    <div className="course-badge">
                      <h3>{courseName}</h3>
                    </div>
                    {lec.date && <span className="lecture-date">{lec.date}</span>}
                  </div>

                  <div className="lecture-body">
                    <div className="detail-row">
                      <span><strong>Instructor:</strong> {instructorName}</span>
                    </div>

                    {lec.batchName && (
                      <div className="detail-row">
                        <span><strong>Batch:</strong> {lec.batchName}</span>
                      </div>
                    )}

                    <div className="detail-row">
                      <span><strong>Time:</strong> {lec.time || 'Not specified'}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      <div className="dashboard-container">
        <section className="dashboard-card">
          <div className="title">
            <h2>Available Courses ({courses.length})</h2>
          </div>
          <div className="course-list">
            {courses.length === 0 ? (
              <p className="empty-text">No courses added yet.</p>
            ) : (
              courses.map((course, idx) => (
                <div key={course._id || idx} className="course-item">
                  {course.image && <img src={course.image} alt={course.name} className="course-thumb" />}
                  <div className="course-info">
                    <div className="course-header">
                      <h3>{course.name}</h3>
                      <span className="level-badge">{course.level}</span>
                    </div>
                    <p>{course.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="dashboard-card">
          <div className="title">
            <h2>Registered Instructors ({instructors.length})</h2>
          </div>
          <div className="instructor-list">
            {instructors.length === 0 ? (
              <p className="empty-text">No instructors found.</p>
            ) : (
              instructors.map((inst, idx) => (
                <div key={inst._id || idx} className="instructor-item">
                  <div className="avatar">{inst.name?.charAt(0) || 'I'}</div>
                  <div>
                    <h4>{inst.name}</h4>
                    <p>{inst.email}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {activeModal === 'course' && (
        <div className="modal-container">
          <div className="modal-card">
            <h3>Add New Course</h3>
            <form onSubmit={handleCourseSubmit}>
              <div className="form">
                <label>Course Name</label>
                <div className="input">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Operating Systems"
                    value={courseForm.name}
                    onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="form">
                <label>Level</label>
                <div className="input">
                  <select
                    value={courseForm.level}
                    onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="form">
                <label>Batch Names (comma-separated)</label>
                <div className="input">
                  <input
                    type="text"
                    placeholder="e.g., Batch A, Batch B, Morning Group"
                    value={courseForm.batchNames}
                    onChange={(e) => setCourseForm({ ...courseForm, batchNames: e.target.value })}
                  />
                </div>
              </div>

              <div className="form">
                <label>Description</label>
                <div className="input">
                  <textarea
                    required
                    placeholder="Brief description of the course contents..."
                    value={courseForm.description}
                    onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  />
                </div>
              </div>

              <div className="form">
                <label>Image URL</label>
                <div className="input">
                  <input
                    type="url"
                    placeholder="https://example.com/image.png"
                    value={courseForm.image}
                    onChange={(e) => setCourseForm({ ...courseForm, image: e.target.value })}
                  />
                </div>
              </div>

              <div className="action">
                <button type="button" className="btnCancel" onClick={() => setActiveModal(null)}>Cancel</button>
                <button type="submit" className="primaryBtn">Save Course</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeModal === 'lecture' && (
        <div className="modal-container">
          <div className="modal-card">
            <h3>Schedule New Lecture</h3>
            <form onSubmit={handleLectureSubmit}>
              
              <div className="form">
                <label>Select Course</label>
                <div className="input">
                  <select
                    required
                    value={lectureForm.courseId}
                    onChange={(e) => setLectureForm({ ...lectureForm, courseId: e.target.value })}
                  >
                    <option value="">Select a Course...</option>
                    {courses.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form">
                <label>Assign Instructor</label>
                <div className="input">
                  <select
                    required
                    value={lectureForm.instructorId}
                    onChange={(e) => setLectureForm({ ...lectureForm, instructorId: e.target.value })}
                  >
                    <option value="">Select an Instructor...</option>
                    {instructors.map((inst) => (
                      <option key={inst._id} value={inst._id}>{inst.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form">
                <label>Lecture Date</label>
                <div className="input">
                  <input
                    type="date"
                    required
                    value={lectureForm.date}
                    onChange={(e) => setLectureForm({ ...lectureForm, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="form">
                <label>Time / Batch Slot</label>
                <div className="input">
                  <input
                    type="text"
                    required
                    placeholder="e.g., 10:00 AM - 12:00 PM"
                    value={lectureForm.time}
                    onChange={(e) => setLectureForm({ ...lectureForm, time: e.target.value })}
                  />
                </div>
              </div>

              <div className="form">
                <label>Batch Name / Code</label>
                <div className="input">
                  <input
                    type="text"
                    required
                    placeholder="e.g., Batch A, CS-Morning, Year 3"
                    value={lectureForm.batchName}
                    onChange={(e) => setLectureForm({ ...lectureForm, batchName: e.target.value })}
                  />
                </div>
              </div>

              <div className="action">
                <button type="button" className="btnCancel" onClick={() => setActiveModal(null)}>Cancel</button>
                <button type="submit" className="primaryBtn">Schedule Lecture</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;