import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import {FaArrowRight,FaCheck,FaXmark,FaPen,FaTrash,FaBookOpen,FaChartPie,} from "react-icons/fa6";

import Modal from "..//Modal/Modal";
import AttendanceForm from "../forms/AttendanceForm";
import CheckDelete from "../forms/CheckDelete";
import { Helmet } from "react-helmet-async";

export default function SingleAttendanceForAdmin() {
  const {attend,getOneAttendanceForAdmin} = useContext(AdminContext);
  const { id } = useParams();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);

  useEffect(() => {
    getOneAttendanceForAdmin(id);
  }, [id]);

 

  if (!attend) {
    return (
      <section
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-gray-100"
      >
        <p className="text-gray-500">
          جاري تحميل بيانات الحضور...
        </p>
      </section>
    );
  }

  const student =  attend.attendance?.[0]?.student;
 
  const openEditModal = (attendance) => {
    setSelectedAttendance(attendance);
    setIsFormModalOpen(true);
  };

  const handleEditSuccess = async () => {
    setIsFormModalOpen(false);
    setSelectedAttendance(null);
    await getOneAttendanceForAdmin(id);
  };

  const openDeleteModal = (attendance) => {
    setSelectedAttendance(attendance);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSuccess = async () => {
    setIsDeleteModalOpen(false);
    setSelectedAttendance(null);

    await getOneAttendanceForAdmin(id);
  };

  return (
    <>
    <Helmet>
      <title>حضور الطالب | لوحة التحكم</title>
    </Helmet>
    <section
      dir="rtl"
      className="min-h-screen bg-gray-100 px-5 py-8 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">

        <Link
          to="/admin/attendance"
          className="mb-6 inline-flex items-center gap-2 text-sm text-blue-600 transition hover:text-blue-700"
        >
          <FaArrowRight />
          العودة إلى الحضور
        </Link>

        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm text-gray-400">
                بيانات الطالب
              </p>

              <h1 className="mt-2 text-2xl font-bold text-gray-800 sm:text-3xl">
                {student?.name}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                كود الطالب:
                <span className="mr-2 font-semibold text-gray-700">
                  {student?.studentCode}
                </span>
              </p>
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
              <FaChartPie className="text-2xl text-blue-600 cursor-pointer" />
            </div>

          </div>

        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-400">
              إجمالي المحاضرات
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-800">
              {attend.totalLectures}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-400">
              الحضور
            </p>

            <div className="mt-2 flex items-center gap-2">
              <FaCheck className="text-emerald-500" />

              <p className="text-2xl font-bold text-emerald-600">
                {attend.presentLectures}
              </p>
            </div>
          </div>


          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-400">
              الغياب
            </p>

            <div className="mt-2 flex items-center gap-2">
              <FaXmark className="text-red-500" />

              <p className="text-2xl font-bold text-red-600">
                {attend.absentLectures}
              </p>
            </div>
          </div>


          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-400">
              نسبة الحضور
            </p>

            <p className="mt-2 text-2xl font-bold text-blue-600">
              {attend.attendancePercentage.toFixed(2)}%
            </p>
          </div>

        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

          <div className="border-b border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800">
              سجل الحضور والغياب
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              تفاصيل حضور الطالب في كل محاضرة
            </p>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px] text-right">

              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    المحاضرة
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    التاريخ
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    الحالة
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    الإجراءات
                  </th>
                </tr>
              </thead>

              <tbody>

                {attend.attendance?.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t border-gray-100 transition hover:bg-gray-50"
                  >

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                          <FaBookOpen className="text-blue-600" />
                        </div>

                        <span className="font-medium text-gray-800">
                          {item.lecture?.title}
                        </span>

                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-gray-500">
                      {item.lecture?.date
                        ? new Date(
                            item.lecture.date
                          ).toLocaleDateString("ar-EG")
                        : "-"}
                    </td>

                    <td className="px-6 py-5">

                      {item.status === "present" ? (
                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-600">
                          <FaCheck />
                          حاضر
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600">
                          <FaXmark />
                          غائب
                        </span>
                      )}

                    </td>

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2">

                        <button
                          onClick={() =>
                            openEditModal(item)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100 cursor-pointer"
                          title="تعديل"
                        >
                          <FaPen />
                        </button>

                        <button
                          onClick={() =>
                            openDeleteModal(item)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100 cursor-pointer"
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
        </div>

      </div>

      <Modal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setSelectedAttendance(null);
        }}
      >
        <AttendanceForm
          mode="edit"
          attendance={selectedAttendance}
          onSuccess={handleEditSuccess}
        />
      </Modal>


      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedAttendance(null);
        }}
      >
        <CheckDelete
          type="attendance"
          id={selectedAttendance?._id}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedAttendance(null);
          }}
          onConfirm={handleDeleteSuccess}
        />
      </Modal>

    </section>
    </>
  );
}