import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Notfound from "./components/Notfound/Notfound";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import AdminLogin from "./components/Login/AdminLogin";
import Dashboard from "./components/Dashboard/Dashboard";
import Lectures from "./components/Lectures/Lectures";
import LectureDetails from "./components/LectureDetails/LectureDetails";
import Attendance from "./components/Attendance/Attendance";
import Exams from "./components/Exams/Exams";
import ExamDetails from "./components/ExamDetails/ExamDetails";
import UserController from "./components/Dashboard/userController";
import StudentDetails from "./components/StudentDetails/StudentDetails";
import ExamsController from "./components/Dashboard/ExamsController";
import AttendanceController from "./components/Dashboard/AttendanceController";
import LectureController from "./components/Dashboard/LectureController";
import SingleAttendanceForAdmin from "./components/SingleAttendanceForAdmin/SingleAttendanceForAdmin";
import {AppContextProvider} from "./context/AppContext"
import { AuthContextProvider } from "./context/AuthContext";
import { AdminContextProvider } from "./context/AdminContext";
import { Toaster } from "react-hot-toast";

let router = createBrowserRouter([

  {path: "/",element: <Login />},
  {path: "/admin/login",element: <AdminLogin />},


  {path: "/admin",element: (<ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {path: "dashboard",element: <Dashboard />},
      {path: "users",element: <UserController />},
      {path: "users/:id",element: <StudentDetails />},
      {path: "lectures",element: <LectureController />},
      {path: "lectures/:id",element: <LectureDetails />},
      {path: "attendance",element: <AttendanceController />},
      {path: "attendance/:id",element: <SingleAttendanceForAdmin />},
      {path: "exams",element: <ExamsController />},
      {path: "exams/:id",element: <ExamDetails />},
    ],
  },

  {path: "/home",element: (
      <ProtectedRoute allowedRoles={["student"]}>
        <Layout />
      </ProtectedRoute>
    ),
    children: [{index: true,element:<Home />},
     {path: "lectures",element: <Lectures />},
      {path: "contact",element: <Contact />},
      { path: "attendance",element: <Attendance />},
      {path: "exams",element: <Exams />},
    ],
  },
  {path: "*",element: <Notfound />},
]);
export default function App() {
  return (
  <AuthContextProvider>
   <AdminContextProvider>
    <AppContextProvider>
        <Toaster/>
        <RouterProvider router={router} />
    </AppContextProvider>
   </AdminContextProvider>
  </AuthContextProvider>
  )
}
