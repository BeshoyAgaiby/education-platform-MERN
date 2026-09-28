import { useNavigate } from "react-router-dom";
import {FaUsers,FaBookOpen,FaClipboardCheck,FaCalendarCheck, FaRightFromBracket, FaUserShield,} from "react-icons/fa6";
import Modal from "../Modal/Modal";
import CheckLogout from "../Navbar/CheckLogout";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { AdminContext } from "../../context/AdminContext";
import SearchStudent from "./searchStudent";
import { Helmet } from "react-helmet-async";


export default function Dashboard() {
  const navigate = useNavigate();
  const { logout,user } = useAuth();
  const {getStats,statics}=useContext(AdminContext);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(()=>{
    getStats();
  },[])
  const handleLogout = () => {
    logout();
    navigate("/");
    setIsLogoutModalOpen(false);
  };
  return (
    <>
      <Helmet>
        <title>لوحة التحكم | Educational Platform</title>
        <meta
          name="description"
          content="لوحة تحكم المسؤول في المنصة التعليمية"
        />
      </Helmet>
    <section  dir="rtl"className="min-h-screen bg-gray-100 px-5 py-8 sm:px-8 lg:px-12" >
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
             <h1 className="text-xl font-bold text-gray-800 sm:text-2xl lg:text-3xl">
               أهلاً بك، 
               <span className="font-semibold text-blue-500 shadow-sm ms-1 hover:text-blue-700">{user?.name}</span>
               
             </h1>

          <p className="mt-2 text-sm text-gray-500">
            مرحبًا بك في لوحة إدارة تحكم المنصة 
          </p>
        </div>

        <SearchStudent/>

        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl bg-white p-6 shadow-sm hover:-translate-y-2 duration-300">
               <p className="text-sm text-gray-500">عدد الطلاب</p>

                <p className="mt-2 text-3xl font-bold text-gray-800">
                  {statics?.students ?? 0}
                </p>
          </div>

           <div className="rounded-2xl bg-white p-6 shadow-sm hover:-translate-y-2 duration-300">
              <p className="text-sm text-gray-500">عدد المحاضرات</p>

              <p className="mt-2 text-3xl font-bold text-gray-800">
                {statics?.lectures ?? 0}
              </p>
           </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm hover:-translate-y-2 duration-300">
            <p className="text-sm text-gray-500">عدد الامتحانات</p>

           <p className="mt-2 text-3xl font-bold text-gray-800">
              {statics?.exams ?? 0}
           </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm hover:-translate-y-2 duration-300">
            <p className="text-sm text-gray-500">نسبة الحضور</p>

            <p className="mt-2 text-3xl font-bold text-blue-500">
               {statics?.attendancePercentage ?? 0}%
            </p>
          </div>

        </div>
        
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div
            onClick={() => navigate("/admin/users")}
            className="cursor-pointer rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  المستخدمين
                </p>

                <p className="mt-2 text-lg font-bold text-gray-800">
                  إدارة الطلاب
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <FaUsers className="text-xl text-blue-600" />
              </div>
            </div>
          </div>

          <div
            onClick={() => navigate("/admin/lectures")}
            className="cursor-pointer rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  المحاضرات
                </p>

                <p className="mt-2 text-lg font-bold text-gray-800">
                  إدارة المحاضرات
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <FaBookOpen className="text-xl text-blue-600" />
              </div>
            </div>
          </div>

          <div
            onClick={() => navigate("/admin/exams")}
            className="cursor-pointer rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  الامتحانات
                </p>

                <p className="mt-2 text-lg font-bold text-gray-800">
                  إدارة الامتحانات
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <FaClipboardCheck className="text-xl text-blue-600" />
              </div>
            </div>
          </div>

          <div
            onClick={() => navigate("/admin/attendance")}
            className="cursor-pointer rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  الحضور
                </p>

                <p className="mt-2 text-lg font-bold text-gray-800">
                  إدارة الحضور
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <FaCalendarCheck className="text-xl text-blue-600" />
              </div>
            </div>
          </div>

        </div>

         <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
           <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
    
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
        <FaUserShield className="text-2xl text-blue-600" />
                 </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                       لوحة الإدارة
                     </h2>

                    <p className="mt-1 text-sm text-gray-500">
                       تحكم كامل في المنصة وإدارة بيانات الطلاب
                    </p>
                 </div>
              </div>

               <div className="flex items-center gap-3">
                 <div className="hidden text-left sm:block">
                   <p className="text-sm font-semibold text-gray-800">
                   المسؤول
                   </p>
                   <p className="text-xs text-gray-400">
                   Administrator
                   </p>
                 </div>

                  <button
                   type="button"
                   onClick={() => setIsLogoutModalOpen(true)}
                   className="flex items-center cursor-pointer gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-100"
                    >
                   <FaRightFromBracket className="scale-x-[-1]" />
                    تسجيل الخروج
                </button>
               </div>

           </div>
         </div>

        <div className="mt-8 rounded-2xl bg-gray-800 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white">
            مرحبًا بك في لوحة الإدارة 👋
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
            من هنا يمكنك إدارة الطلاب والمحاضرات والامتحانات
            ومتابعة الحضور والدرجات الخاصة بالطلاب.
          </p>
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
    </section>

  </>
  );
}