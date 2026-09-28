import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {FaGraduationCap,FaRightFromBracket,FaBars,FaXmark,} from "react-icons/fa6";
import {useAuth} from "../../context/AuthContext"
import Modal from "../Modal/Modal"
import CheckLogout from "./CheckLogout";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { logout } = useAuth();
  let navigate = useNavigate();

   const handleLogout = () => {
    logout();
    navigate("/");
  };
  const navLinks = [
    { name: "الرئيسية", path: "/home" },
    { name: "المحاضرات", path: "/home/lectures" },
    { name: "الامتحانات", path: "/home/exams" },
    { name: "الحضور", path: "/home/attendance" },
    { name: "تواصل معنا", path: "/home/contact" },
  ];

  return (
    <>
      <nav dir="rtl" className="bg-white border-b border-gray-100">
        <div className="px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">

            <div className="flex items-center gap-10">

              <Link
                to="/home"
                className="flex items-center gap-3"
              >
                <FaGraduationCap className="text-3xl text-blue-600" />

                <div>
                  <h1 className="text-xl font-bold text-gray-800">
                    منصة التعلم
                  </h1>

                  <p className="text-xs text-gray-400">
                    تعلم • تطور • انجح
                  </p>
                </div>
              </Link>
              <div className="hidden md:flex items-center gap-7">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `text-sm font-medium transition ${
                        isActive
                          ? "text-blue-600"
                          : "text-gray-600 hover:text-blue-600"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsLogoutModalOpen(true)}
              className="hidden md:block text-gray-600 hover:text-red-500 transition"
            >
              <FaRightFromBracket className="text-xl scale-x-[-1] cursor-pointer" />
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden text-2xl text-gray-700"
            >
              <FaBars />
            </button>

          </div>
        </div>
      </nav>

      <div
        dir="rtl"
        className={`
          fixed top-0 right-0 h-full w-1/2 z-50 bg-white
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-100">

          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3"
          >
            <FaGraduationCap className="text-3xl text-blue-600" />

            <div>
              <h1 className="text-xl font-bold text-gray-800">
                منصة التعلم
              </h1>

              <p className="text-xs text-gray-400">
                تعلم • تطور • انجح
              </p>
            </div>
          </Link>

          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl text-gray-700 hover:text-red-500 transition"
          >
            <FaXmark />
          </button>

        </div>

        <div className="flex flex-col px-6 py-8 gap-3">

          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `px-4 py-4 rounded-xl text-lg font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <button
            type="button"
            onClick={() => setIsLogoutModalOpen(true)}
            className="flex items-center gap-3 px-4 py-4 mt-6 rounded-xl text-lg font-medium text-gray-700 hover:bg-red-50 hover:text-red-500 transition"
          >
            <FaRightFromBracket className="scale-x-[-1] cursor-pointer" />
            تسجيل الخروج
          </button>

        </div>
      </div>
    {isLogoutModalOpen && (
         <Modal
           isOpen={isLogoutModalOpen}
           onClose={() => setIsLogoutModalOpen(false)}
         >
          <CheckLogout
            onClose={() => setIsLogoutModalOpen(false)}
            onConfirm={handleLogout}
            />
          </Modal>
      )}

    </>
  );
}
