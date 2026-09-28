# Educational Platform

A full-stack educational platform built with the MERN stack.

The platform provides a simple and organized system for managing students, lectures, attendance, and exams through an admin dashboard, while students can access their educational content through a dedicated student interface.

---

## 🌐 Live Demo

**Frontend:**  
[Live Demo](YOUR_FRONTEND_URL)

**GitHub:**  
[Source Code](https://github.com/BeshoyAgaiby/education-platform-MERN.git)

---

## 📌 Project Overview

Educational Platform is a full-stack web application designed for educational centers and teachers to manage students and educational content in one place.

The system provides two main interfaces:

- **Admin Dashboard** for managing students, lectures, attendance, and exams.
- **Student Platform** where students can access their lectures, attendance records, and exams.

The project was built using the **MERN Stack** with a RESTful API architecture.

---

## ✨ Features

### 👨‍💼 Admin Dashboard

- Admin authentication
- Role-based authorization
- Dashboard statistics
- Student management
- Add, update, and delete students
- Search students by name or student code
- View student details
- Lecture management
- Upload lecture videos and PDF files
- Publish/unpublish lectures
- Attendance management
- Add, update, and delete attendance records
- View attendance statistics
- Exam management
- Add, update, and delete exams
- Protected admin routes

### 👨‍🎓 Student Platform

- Student access using a unique student code
- Personalized student dashboard
- View published lectures
- Access lecture videos
- Download/view lecture PDFs
- View attendance records
- View exams
- Protected student routes

---

## 🔐 Authentication & Authorization

The application uses **JWT authentication**.

There are two user roles:

- `admin`
- `student`

Admin users authenticate using:

- Email
- Password

Students access the platform using their unique:

- Student Code

The backend uses middleware to protect API routes and control access based on user roles.

---

## 🛡️ Role-Based Authorization

The application separates permissions between admins and students.

### Admin

Admins can:

- Manage students
- Manage lectures
- Manage attendance
- Manage exams
- View dashboard statistics
- Search students

### Student

Students can:

- View their lectures
- View their attendance
- View available exams

---

## 📊 Dashboard Statistics

The admin dashboard provides statistics such as:

- Total students
- Total lectures
- Total exams
- Overall attendance percentage

## project Architecture

educational-platform/
│
├── backend/
│
│ ├── Database/
│ │
│ ├── src/
│ │ ├── modules/
│ │ │
│ │ ├── middleware/
│ │ ├── utils/
│ │ └── ...
│ │
│ ├── index.js
│ ├── package.json
│ └── .env
│
├── frontend/
│ └── education-platform/
│
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ ├── layouts/
│ │ └── ...
│ │
│ ├── public/
│ ├── package.json
│ └── .env
│
├── .gitignore
└── README.md

## Backend

The backend is built using:

Node.js
Express.js
MongoDB
Mongoose
JWT
Joi
bcrypt
Multer
Cloudinary

The backend provides a RESTful API for the frontend.

🧩 Backend Modules

The backend contains modules for:

Users
Students
Lectures
Attendance
Exams
Dashboard
🗄️ Database

The application uses MongoDB Atlas as the database.

Main collections include:

Users
Lectures
Attendance
Exams
User

Contains information such as:

Name
Student Code
Email
Phone
Grade
Role
Active status
Password
Lecture

Contains:

Title
Description
Video URL
PDF URL
Date
Published status
Attendance

Contains:

Student
Lecture
Status
Exam

Contains:

Title
Description
Date
Total marks
Published status
☁️ Cloudinary

Cloudinary is used for storing uploaded files such as:

Lecture videos
Lecture PDFs
Images

Uploaded files are stored remotely and their URLs are saved in MongoDB.

💻 Frontend

The frontend is built using:

React
Vite
React Router
Axios
Tailwind CSS
React Icons
Formik
Yup
React Helmet Async

The frontend contains separate interfaces for:

Admin
Students
🧭 Frontend Routing
Admin Routes
/admin/login
/admin/dashboard
/admin/users
/admin/users/:id
/admin/lectures
/admin/lectures/:id
/admin/attendance
/admin/attendance/:id
/admin/exams
/admin/exams/:id
Student Routes
/
/home
/home/lectures
/home/contact
/home/attendance
/home/exams

Protected routes are used to prevent unauthorized access.

🔌 REST API

The application follows RESTful API principles.

Main API endpoints include:

Authentication
POST /api/v1/users/auth/signIn
Students
GET /api/v1/students/search?q=ST001
Lectures
GET /api/v1/lectures
POST /api/v1/lectures
PUT /api/v1/lectures/:id
DELETE /api/v1/lectures/:id
Attendance
GET /api/v1/attends
POST /api/v1/attends
PUT /api/v1/attends/:id
DELETE /api/v1/attends/:id
GET /api/v1/attends/my_attendance
GET /api/v1/attends/admin/:id
Exams
GET /api/v1/exams
POST /api/v1/exams
PUT /api/v1/exams/:id
DELETE /api/v1/exams/:id
Dashboard
GET /api/v1/dashboard/stats
🧪 API Testing

The backend APIs were tested using Postman.

Authentication tokens are sent with protected requests.

Example:

token: YOUR_JWT_TOKEN
🚀 Getting Started

1. Clone the Repository
   git clone YOUR_GITHUB_REPOSITORY_URL
   cd educational-platform
   🔧 Backend Setup

Navigate to the backend:

cd backend

Install dependencies:

npm install

Create a .env file:

DB_CONNECTION=YOUR_MONGODB_CONNECTION_STRING
SECRET_KEY=YOUR_SECRET_KEY

CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
API_KEY=YOUR_CLOUDINARY_API_KEY
API_SECRET=YOUR_CLOUDINARY_API_SECRET

Start the backend:

npm run start

or, if you use nodemon:

npm run dev
🎨 Frontend Setup

Navigate to the frontend:

cd frontend/education-platform

Install dependencies:

npm install

Create a .env file:

VITE_API_URL=YOUR_BACKEND_URL

Start the frontend:

npm run dev
🌍 Deployment

The backend can be deployed separately from the frontend.

Backend

The backend is deployed using:

Vercel

Database

The database is hosted using:

MongoDB Atlas

File Storage

Files are stored using:

Cloudinary

Frontend

The React frontend can be deployed using:

Vercel

🔄 Application Flow
Admin Flow
Admin Login
↓
Admin Dashboard
↓
Manage Students
Manage Lectures
Manage Attendance
Manage Exams
↓
View Statistics
Student Flow
Student Code
↓
Student Login
↓
Student Dashboard
↓
View Lectures
View Attendance
View Exams
🔒 Security

The application includes:

JWT authentication
Password hashing using bcrypt
Role-based authorization
Protected API routes
Protected frontend routes
Joi request validation
Environment variables for sensitive credentials
.env excluded from Git
📱 Responsive Design

The frontend is designed to work across different screen sizes including:

Desktop
Laptop
Tablet
Mobile

The admin dashboard and student interface use responsive layouts for better usability.

During this project, I practiced and improved my knowledge of:

Building RESTful APIs with Node.js and Express
MongoDB database design with Mongoose
JWT authentication
Role-based authorization
API validation using Joi
Password hashing using bcrypt
File uploads using Multer
Cloudinary integration
React Context API
React Router
Protected routes
Axios API integration
Form handling with Formik
Form validation with Yup
Environment variables
API testing with Postman
MongoDB Atlas
Git and GitHub
Full-stack project architecture
Deployment using Vercel
🚧 Future Improvements

Possible future improvements include:

Student grades and exam results
Online exams
Notifications
Admin analytics
Attendance reports
Export reports to PDF
Email notifications
More advanced student management
Improved dashboard analytics

👨‍💻 Author
Beshoy Agaiby

MERN Stack Developer

Computer Science / Artificial Intelligence Student

📄 License

This project is created for educational and portfolio purposes.
