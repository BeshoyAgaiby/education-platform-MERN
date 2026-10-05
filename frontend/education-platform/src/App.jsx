import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading/Loading";

import Layout from "./components/Layout/Layout";
import Notfound from "./components/Notfound/Notfound";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminLayout from "./components/AdminLayout/AdminLayout";

const Home =lazy(()=>import("./components/Home/Home"));
const Contact =lazy(()=>import("./components/Contact/Contact"));
const Login =lazy(()=>import("./components/Login/Login"));
const AdminLogin =lazy(()=>import("./components/Login/AdminLogin"));
const Dashboard =lazy(()=>import("./components/Dashboard/Dashboard"));
const Lectures =lazy(()=>import("./components/Lectures/Lectures"));
const LectureDetails =lazy(()=>import("./components/LectureDetails/LectureDetails"));
const Attendance =lazy(()=>import("./components/Attendance/Attendance"));
const Exams = lazy(()=>import("./components/Exams/Exams"));
const ExamDetails =lazy(()=>import("./components/ExamDetails/ExamDetails"));
const UserController = lazy(()=>import("./components/Dashboard/userController"));
const StudentDetails = lazy(()=>import("./components/StudentDetails/StudentDetails"));
const ExamsController =lazy(()=>import("./components/Dashboard/ExamsController"));
const AttendanceController = lazy(()=>import("./components/Dashboard/AttendanceController"));
const LectureController = lazy(()=>import("./components/Dashboard/LectureController"));
const SingleAttendanceForAdmin =lazy(()=>import("./components/SingleAttendanceForAdmin/SingleAttendanceForAdmin"));
import {AppContextProvider} from "./context/AppContext"
import { AuthContextProvider } from "./context/AuthContext";
import { AdminContextProvider } from "./context/AdminContext";
import { Toaster } from "react-hot-toast";
import InstallPWA from "./components/InstallPWA/InstallPWA";

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
        
         <InstallPWA />

        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
    </AppContextProvider>
   </AdminContextProvider>
  </AuthContextProvider>
  )
}
