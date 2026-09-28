import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { AdminContext } from "../../context/AdminContext";
import {FaCalendarDays,FaArrowRight,FaPen,FaTrash,FaEye,FaEyeSlash,} from "react-icons/fa6";

import Modal from "../Modal/Modal";
import ExamForm from "../forms/ExamForm";
import CheckDelete from "../forms/CheckDelete";
import CheckExamPublished from "./CheckExamPublished";
import { Helmet } from "react-helmet-async";

export default function ExamDetails() {
  const { getExam, exam } = useContext(AppContext);
  const {publishExam,unPublishExam,} = useContext(AdminContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    getExam(id);
  }, [id]);


  if (!exam) {
    return (
      <div
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-gray-100"
      >
        <p className="text-gray-500">جاري تحميل الامتحان...</p>
      </div>
    );
  }


  const handlePublishConfirm = async () => {
    let success;

    if (exam.isPublished) {
      success = await unPublishExam(exam._id);
    } else {
      success = await publishExam(exam._id);
    }
    if (success) {
      setIsPublishModalOpen(false);
      await getExam(id);
    }
  };

  const handleEditSuccess = async () => {
    setIsFormModalOpen(false);
    await getExam(id);
  };

  return (
    <>
    <Helmet>
      <title>تفاصيل الامتحان | لوحة التحكم</title>
    </Helmet>
    <section
      dir="rtl"
      className="min-h-screen bg-gray-100 px-5 py-8 sm:px-8 mt-10"
    >
      <div className="mx-auto max-w-4xl">

      
        <Link
          to={ "/admin/exams"}
          className="mb-6 inline-flex items-center gap-2 text-sm text-blue-600 transition hover:text-blue-700"
        >
          <FaArrowRight />
             العودة إلى الامتحانات
        </Link>

    
        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">


          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50">
            <FaCalendarDays className="text-2xl text-blue-600" />
          </div>


          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

            <div>
              <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
                {exam.title}
              </h1>

            
                <div className="mt-3">
                  {exam.isPublished ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-600">
                      <FaEye />
                      متاح للطلاب
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-600">
                      <FaEyeSlash />
                      غير متاح للطلاب
                    </span>
                  )}
                </div>
            </div>

          </div>


          {exam.description && (
            <p className="mt-6 leading-7 text-gray-500">
              {exam.description}
            </p>
          )}


          <div className="mt-8 grid gap-4 sm:grid-cols-2">

            <div className="rounded-xl bg-gray-50 p-5">
              <p className="text-sm text-gray-400">
                موعد الامتحان
              </p>

              <p className="mt-2 font-medium text-gray-700">
                {new Date(exam.date).toLocaleDateString("ar-EG", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-5">
              <p className="text-sm text-gray-400">
                الدرجة النهائية
              </p>

              <p className="mt-2 font-bold text-blue-600">
                {exam.totalMarks} درجة
              </p>
            </div>

          </div>

            <div className="mt-8 border-t pt-6">
              <p className="mb-4 text-sm font-semibold text-gray-700">
                صلاحيات الأدمن
              </p>

              <div className="flex flex-wrap gap-3">

                <button
                  onClick={() => setIsPublishModalOpen(true)}
                  className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white transition ${
                    exam.isPublished
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                >
                  {exam.isPublished ? (
                    <>
                      <FaEyeSlash />
                      إلغاء الإتاحة
                    </>
                  ) : (
                    <>
                      <FaEye />
                      إتاحة الامتحان
                    </>
                  )}
                </button>

                <button
                  onClick={() => setIsFormModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  <FaPen />
                  تعديل
                </button>

                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700"
                >
                  <FaTrash />
                  حذف
                </button>

              </div>

            </div>

        </div>
      </div>

 
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
      >
        <ExamForm
          mode="edit"
          exam={exam}
          onSuccess={handleEditSuccess}
        />
      </Modal>


      <Modal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
      >
        <CheckExamPublished
          exam={exam}
          onClose={() => setIsPublishModalOpen(false)}
          onConfirm={handlePublishConfirm}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <CheckDelete
          type="exam"
          id={exam._id}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            navigate("/admin/exams");
          }}
        />
      </Modal>
    </section>
    </>
  );
}