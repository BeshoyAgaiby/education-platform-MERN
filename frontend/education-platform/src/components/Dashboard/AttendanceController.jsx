import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";

import Modal from "../Modal/Modal";
import AttendanceForm from "../forms/AttendanceForm";
import { Helmet } from "react-helmet-async";

export default function AttendanceController() {
  const {attends,getAllAttendance,} = useContext(AdminContext);

  const navigate = useNavigate();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  useEffect(() => {
    getAllAttendance();
  }, []);

  const students = [
    ...new Map(
      attends.map((item) => [
        item.student?._id,
        item.student,
      ])
    ).values(),
  ];

  const handleSuccess = async () => {
    setIsFormModalOpen(false);
    await getAllAttendance();
  };

  return (
    <>
    <Helmet>
     <title>الحضور | لوحة التحكم</title>
     <meta
       name="description"
       content="إدارة حضور الطلاب في المنصة التعليمية"
      />
    </Helmet>
    <section
      dir="rtl"
      className="min-h-screen bg-gray-100 px-5 py-8 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">

        <div className="mb-8 mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              حضور وغياب الطلاب
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              اختر طالب لعرض تفاصيل الحضور والغياب
            </p>
          </div>

          <button
            onClick={() => setIsFormModalOpen(true)}
            className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 cursor-pointer sm:w-auto"
          >
            + إضافة حضور
          </button>

        </div>

        {students.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <p className="text-gray-500">
              لا يوجد سجلات حضور حتى الآن
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {students.map((student) => (
              <div
                key={student._id}
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  {student.name}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  كود الطالب:{" "}
                  <span className="font-medium text-gray-700">
                    {student.studentCode}
                  </span>
                </p>

                <button
                  onClick={() =>
                    navigate(`/admin/attendance/${student._id}`)
                  }
                  className="mt-5 w-full rounded-xl bg-gray-200 px-4 py-3 text-sm font-medium text-black transition hover:bg-gray-400 cursor-pointer"
                >
                  عرض الحضور والغياب
                </button>

              </div>
            ))}

          </div>
        )}
      </div>

      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
      >
        <AttendanceForm
          mode="add"
          onSuccess={handleSuccess}
        />
      </Modal>

    </section>
  </>
  );
}