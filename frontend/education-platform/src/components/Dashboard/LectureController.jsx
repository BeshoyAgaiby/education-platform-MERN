import { useContext, useEffect, useState } from "react";
import {FaPlus,FaPen,FaTrash,FaEye} from "react-icons/fa6";
import { AppContext } from "../../context/AppContext";
import Modal from "../Modal/Modal";
import LectureForm from "../forms/LectureForm";
import CheckDelete from "../forms/CheckDelete";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Loading from "../Loading/Loading";

export default function LectureController() {
  const navigate =useNavigate();
  const {lectures,getLectures} = useContext(AppContext);
     const [loading, setLoading] = useState(true);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [lectureToDelete, setLectureToDelete] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await getLectures();
      setLoading(false);
    };

    getData();
  }, []);

  const openAddModal = () => {
    setSelectedLecture(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (lecture) => {
    setSelectedLecture(lecture);
    setIsFormModalOpen(true);
  };

  const handleSuccess = () => {
    setIsFormModalOpen(false);
    setSelectedLecture(null);
    getLectures();
  };

  const openDeleteModal = (lecture) => {
    setLectureToDelete(lecture);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
    <Helmet>
     <title>المحاضرات | لوحة التحكم</title>
     <meta
      name="description"
      content="إدارة المحاضرات في المنصة التعليمية"
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
              إدارة المحاضرات
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              عرض وإدارة المحاضرات الموجودة على المنصة
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center justify-center cursor-pointer gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <FaPlus />
            إضافة محاضرة
          </button>

        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

          <div className="border-b border-gray-100 p-5">
            <h2 className="font-bold text-gray-800">
              قائمة المحاضرات
            </h2>
          </div>

          {loading ? (
            <Loading />
         ):lectures?.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-500">
              لا يوجد محاضرات حاليًا
            </div>
           ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px] text-right">

                <thead className="bg-gray-50">
                  <tr>

                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      عنوان المحاضرة
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      التاريخ
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      الفيديو
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

                  {lectures?.map((lecture) => (

                    <tr
                      key={lecture._id}
                      className="border-t border-gray-100"
                    >

                      <td
                      onClick={()=>{navigate(`/admin/lectures/${lecture._id}`)}}
                       className="px-5 py-4 cursor-pointer font-medium text-gray-800 hover:text-gray-400">
                        {lecture.title}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {new Date(
                          lecture.date
                        ).toLocaleDateString("ar-EG")}
                      </td>

                      <td className="px-5 py-4">

                        {lecture.videoUrl ? (
                          <a
                            href={lecture.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-600 transition hover:bg-blue-100"
                          >
                            <FaEye />
                            مشاهدة
                          </a>
                        ) : (
                          <span className="text-sm text-gray-400">
                            لا يوجد
                          </span>
                        )}

                      </td>

                      <td className="px-5 py-4">

                        {lecture.isPublished ? (
                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                            متاحه
                          </span>
                        ) : (
                          <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                            غير متاحه
                          </span>
                        )}

                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              openEditModal(lecture)
                            }
                            className="flex h-9 w-9 items-center cursor-pointer justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                            title="تعديل"
                          >
                            <FaPen />
                          </button>

                          <button
                            onClick={() =>
                              openDeleteModal(lecture)
                            }
                            className="flex h-9 w-9 items-center cursor-pointer justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100"
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
          setSelectedLecture(null);
        }}
      >
        <LectureForm
          mode={selectedLecture ? "edit" : "add"}
          lecture={selectedLecture}
          onSuccess={handleSuccess}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setLectureToDelete(null);
        }}
      >
        <CheckDelete
          type="lecture"
          id={lectureToDelete?._id}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setLectureToDelete(null);
          }}
          onConfirm={() => {
              getLectures();
             }}
        />
      </Modal>

    </section>
    </>
  );
}