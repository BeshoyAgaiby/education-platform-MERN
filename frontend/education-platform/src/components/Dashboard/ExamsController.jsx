import { useContext, useEffect, useState } from "react";
import { FaPlus, FaPen, FaTrash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../../context/AppContext";
import Modal from "../Modal/Modal";
import ExamForm from "../forms/ExamForm";
import CheckDelete from "../forms/CheckDelete";
import { Helmet } from "react-helmet-async";
import Loading from "../Loading/Loading";

export default function ExamController() {
  const navigate = useNavigate();

  const {exams,getExams,} = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);

 
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await getExams();
      setLoading(false);
    };

    getData();
  }, []);

  const openAddModal = () => {
    setSelectedExam(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (exam) => {
    setSelectedExam(exam);
    setIsFormModalOpen(true);
  };

  const handleSuccess = () => {
    setIsFormModalOpen(false);
    setSelectedExam(null);
    getExams();
  };

  const openDeleteModal = (exam) => {
    setExamToDelete(exam);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
    <Helmet>
     <title>الامتحانات | لوحة التحكم</title>
     <meta
         name="description"
         content="إدارة الامتحانات في المنصة التعليمية"
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
              إدارة الامتحانات
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              عرض وإدارة الامتحانات الموجودة على المنصة
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <FaPlus />
            إضافة امتحان
          </button>

        </div>


        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

          <div className="border-b border-gray-100 p-5">
            <h2 className="font-bold text-gray-800">
              قائمة الامتحانات
            </h2>
          </div>

          {loading ? (
            <Loading />
          ) : exams?.length === 0 ? (

            <div className="p-8 text-center text-sm text-gray-500">
              لا يوجد امتحانات حاليًا
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px] text-right">

                <thead className="bg-gray-50">
                  <tr>

                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      عنوان الامتحان
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      التاريخ
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      الدرجة
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

                  {exams?.map((exam) => (
                    <tr
                      key={exam._id}
                      className="border-t border-gray-100"
                    >
                      <td
                        onClick={() =>
                          navigate(`/admin/exams/${exam._id}`)
                        }
                        className="cursor-pointer px-5 py-4 font-medium text-gray-800 hover:text-blue-600"
                      >
                        {exam.title}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {new Date(
                          exam.date
                        ).toLocaleDateString("ar-EG")}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {exam.totalMarks}
                      </td>

                      <td className="px-5 py-4">

                        <button
                          className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition ${
                            exam.isPublished
                              ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                              : "bg-red-50 text-red-600 hover:bg-red-100"
                          }`}
                        >
                          {exam.isPublished
                            ? "متاح"
                            : "غير متاح"}
                        </button>

                      </td>


                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2">

                          <button
                            onClick={() =>
                              openEditModal(exam)
                            }
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                            title="تعديل"
                          >
                            <FaPen />
                          </button>

                          <button
                            onClick={() =>
                              openDeleteModal(exam)
                            }
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100"
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
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setSelectedExam(null);
        }}
      >
        <ExamForm
          mode={selectedExam ? "edit" : "add"}
          exam={selectedExam}
          onSuccess={handleSuccess}
        />
      </Modal>

 
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setExamToDelete(null);
        }}
      >
        <CheckDelete
          type="exam"
          id={examToDelete?._id}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setExamToDelete(null);
          }}
          onConfirm={() => {
            getExams();
          }}
        />
      </Modal>



    </section>
    </>
  );
}