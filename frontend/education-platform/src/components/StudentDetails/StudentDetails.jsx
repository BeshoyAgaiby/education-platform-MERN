import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {FaArrowRight,FaTrash,FaUserCheck,FaUserXmark,} from "react-icons/fa6";
import { AdminContext } from "../../context/AdminContext";
import Modal from "../Modal/Modal";
import CheckDelete from "../forms/CheckDelete";
import CheckDeactivate from "./CheckDeactivate";
import { Helmet } from "react-helmet-async";

export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {student,getStudent,ActivateAccount,DeactiveAccount,deleteStudent} = useContext(AdminContext);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);

  useEffect(() => {
    getStudent(id);
  }, [id]);

  const handleDelete = async () => {
    const success = await deleteStudent(id);

    if (success) {
      setIsDeleteModalOpen(false);
      navigate("/admin/users");
    }
  };

  const handleActivate = async () => {
    const success = await ActivateAccount(id);

    if (success) {
      await getStudent(id);
      setIsActivateModalOpen(false);
    }
  };

  const handleDeactivate = async () => {
    const success = await DeactiveAccount(id);

    if (success) {
      await getStudent(id);
      setIsActivateModalOpen(false);
    }
  };

  if (!student) {
    return (
      <section
        dir="rtl"
        className="min-h-screen bg-gray-100 px-5 py-8 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-5xl">
          <p className="text-sm text-gray-500">
            جاري تحميل بيانات الطالب...
          </p>
        </div>
      </section>
    );
  }

  return (
  <>
    <Helmet>
     <title>تفاصيل طالب | لوحة التحكم</title>
    </Helmet>
    <section
      dir="rtl"
      className="min-h-screen bg-gray-100 px-5 py-8 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-5xl">

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              بيانات الطالب
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              عرض وإدارة بيانات الطالب
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/users")}
            className="flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <FaArrowRight />
            العودة للطلاب
          </button>

        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

          <div className="border-b border-gray-100 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {student.name}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  كود الطالب:{" "}
                  <span className="font-semibold text-gray-700">
                    {student.studentCode}
                  </span>
                </p>
              </div>

              {student.isActive ? (
                <span className="w-fit rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-600">
                  الحساب نشط
                </span>
              ) : (
                <span className="w-fit rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
                  الحساب غير نشط
                </span>
              )}

            </div>

          </div>

          <div className="grid gap-5 p-6 sm:grid-cols-2">

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                اسم الطالب
              </p>

              <p className="mt-2 font-medium text-gray-800">
                {student.name}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                كود الطالب
              </p>

              <p className="mt-2 font-medium text-gray-800">
                {student.studentCode}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                رقم الهاتف
              </p>

              <p className="mt-2 font-medium text-gray-800">
                {student.phone || "-"}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                الصف
              </p>

              <p className="mt-2 font-medium text-gray-800">
                {student.grade || "-"}
              </p>
            </div>

          </div>

          <div className="flex flex-col gap-3 border-t border-gray-100 p-6 sm:flex-row">

          
            {student.isActive ? (
              <button
                onClick={() => setIsActivateModalOpen(true)}
                className="flex items-center justify-center cursor-pointer gap-2 rounded-xl bg-red-50 px-5 py-3 text-sm font-medium text-red-600 transition hover:bg-red-100"
              >
                <FaUserXmark />
                إلغاء نشاط الحساب
              </button>
            ) : (
              <button
                onClick={() => setIsActivateModalOpen(true)}
                className="flex items-center justify-center cursor-pointer gap-2 rounded-xl bg-emerald-50 px-5 py-3 text-sm font-medium text-emerald-600 transition hover:bg-emerald-100"
              >
                <FaUserCheck />
                تفعيل الحساب
              </button>
            )}
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex items-center justify-center cursor-pointer gap-2 rounded-xl bg-red-50 px-5 py-3 text-sm font-medium text-red-600 transition hover:bg-red-100"
            >
              <FaTrash />
              حذف الطالب
            </button>

          </div>

        </div>

      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <CheckDelete
          student={student}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      </Modal>

      <Modal
        isOpen={isActivateModalOpen}
        onClose={() => setIsActivateModalOpen(false)}
      >
        <CheckDeactivate
          student={student}
          onClose={() => setIsActivateModalOpen(false)}
          onConfirm={
            student.isActive
              ? handleDeactivate
              : handleActivate
          }
        />
      </Modal>

    </section>
  </>
  );
}