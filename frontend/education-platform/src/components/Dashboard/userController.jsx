import { useContext, useEffect, useState } from "react";
import {FaUserPlus,FaPen,FaTrash,} from "react-icons/fa6";
import { AdminContext } from "../../context/AdminContext";
import Modal from "../Modal/Modal";
import StudentForm from "../forms/StudentForm";
import CheckDelete from "../forms/CheckDelete";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Loading from "../Loading/Loading";

export default function UserController() {
  const navigate = useNavigate();
  const { users, getUsers } = useContext(AdminContext);
    const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await getUsers();
      setLoading(false);
    };

    getData();
  }, []);

  const openAddModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(true);
  };

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
    getUsers();
  };

  return (
    <>
    <Helmet>
      <title>الطلاب | لوحة التحكم</title>
       <meta
        name="description"
        content="إدارة الطلاب في المنصة التعليمية"
        />
   </Helmet>
    <section
      dir="rtl"
      className="min-h-screen bg-gray-100 px-5 py-8 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              إدارة الطلاب
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              عرض وإدارة الطلاب المسجلين في المنصة
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <FaUserPlus className="cursor-pointer" />
            إضافة طالب
          </button>

        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

          <div className="border-b border-gray-100 p-5">
            <h2 className="font-bold text-gray-800">
              قائمة الطلاب
            </h2>
          </div>

          {loading ? (
            <Loading />
           ):users?.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-500">
              لا يوجد طلاب حاليًا
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[800px] text-right">

                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      الاسم
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      كود الطالب
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      الهاتف
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      الصف
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      الحالة
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      الإجراءات
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users?.map((user) => (
                    <tr
                      key={user._id}
                      className="border-t border-gray-100"
                    >

                      <td 
                      onClick={() => navigate(`/admin/users/${user._id}`)}
                      className="px-5 py-4 font-medium text-gray-800 cursor-pointer hover:text-gray-600">
                        {user.name}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {user.studentCode}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {user.phone || "-"}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {user.grade || "-"}
                      </td>

                      <td className="px-5 py-4">
                        {user.isActive ? (
                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                            نشط
                          </span>
                        ) : (
                          <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                            غير نشط
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">

                          <button
                            onClick={() => openEditModal(user)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                            title="تعديل"
                          >
                            <FaPen />
                          </button>

                          <button
                             onClick={() => {
                              setStudentToDelete(user);
                              setIsDeleteOpen(true);
                                 }}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100"
                            title="حذف"
                          >
                            <FaTrash />
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}
        </div>

      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStudent(null);
        }}
      >
        <StudentForm
          mode={selectedStudent ? "edit" : "add"}
          student={selectedStudent}
          onSuccess={handleSuccess}
        />
      </Modal>

     <Modal
         isOpen={isDeleteOpen}
         onClose={() => {
         setIsDeleteOpen(false);
         setStudentToDelete(null);
          }}
       >
  <CheckDelete
    type="student"
    id={studentToDelete?._id}
    onClose={() => {
      setIsDeleteOpen(false);
      setStudentToDelete(null);
    }}
    onConfirm={()=>{
      getUsers();
    }
    }
  />
</Modal>
    </section>

  </>
  );
}