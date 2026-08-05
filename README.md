# Online Lecture Scheduling System

A full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** web application developed for the **IdeaMagix Assessment**. This system simplifies lecture management and scheduling for educational institutions by providing role-based access control for **Admins** and **Instructors**, while preventing scheduling conflicts (clashes) for instructors.

---

## 🌟 Key Features & Business Logic

### 👑 Admin Role
* **Course Management:** Add new courses with details like name, level, description, image, and batches. View all existing courses.
* **Instructor Overview:** View the list of all registered instructors.
* **Lecture Scheduling:** Assign lectures for specific courses and batches to instructors on designated dates and time slots.
* **Smart Schedule Conflict Prevention:** 
  * The system validates instructor availability before confirming a schedule.
  * If an instructor is already scheduled for a lecture on a given date/time slot, the application blocks double-booking and alerts the admin.

### 👨‍🏫 Instructor Role
* **Personalized Schedule Dashboard:** Instructors log in to view only the lectures assigned specifically to them.
* **Date & Time Tracking:** Clear layout displaying assigned course, batch, date, and timing.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Vite, Axios, React Router DOM, CSS3
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (MongoDB Atlas)
* **API Testing & Deployment:** Render (Backend API Hosting)

---

## 📂 Project Structure

```text
IDEAMAGIX ASSESSMENT/
├── backend/
│   ├── controller/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   └── lectureController.js
│   ├── model/
│   │   ├── authModel.js
│   │   ├── courseModel.js
│   │   └── lectureModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   └── lectureRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
│
├── db-dump/
│   ├── courses.json
│   ├── lecture.json
│   └── users.json
│
└── frontend/
    ├── src/
    │   ├── assets/
    │   ├── pages/
    │   │   ├── AdminDashboard.css
    │   │   ├── AdminDashboard.jsx
    │   │   ├── InstructorDashboard.css
    │   │   ├── InstructorDashboard.jsx
    │   │   ├── Login.css
    │   │   ├── Login.jsx
    │   │   ├── Signup.css
    │   │   └── Signup.jsx
    │   ├── App.css
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── README.md
```

---

## ⚙️ Installation & Setup Guide

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` root folder:
```env
MONGO_URI=your_mongodb_connection_string
```
Start the backend server:
```bash
node server.js
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

---

## 🗄️ Database Import (db-dump)

The repository includes pre-populated JSON exports inside the `db-dump/` directory (`courses.json`, `lecture.json`, and `users.json`). You can import these directly into your MongoDB Atlas cluster using **MongoDB Compass** or `mongoimport`.

---

## 👤 Author
Developed as part of the **IdeaMagix Technical Assessment**.
