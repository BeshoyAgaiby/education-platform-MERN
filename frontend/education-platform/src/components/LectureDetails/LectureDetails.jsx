import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {FaArrowRight,FaBookOpen,FaCalendarDays,FaDownload,FaPen,FaTrash,} from "react-icons/fa6";

import { AppContext } from "../../context/AppContext";
import { AdminContext } from "../../context/AdminContext";

import Modal from "../Modal/Modal";
import LectureForm from "../forms/LectureForm";
import CheckDelete from "../forms/CheckDelete";
import CheckPublish from "./checkPublished";
import { Helmet } from "react-helmet-async";

export default function AdminLectureDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { lecture, getLecture } = useContext(AppContext);

  const {publishLec,unPublishLec,deleteLecture,} = useContext(AdminContext);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    getLecture(id);
  }, [id]);

  if (!lecture) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-gray-100 px-5 py-10 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 text-center">
          <p className="text-gray-500">
            جاري تحميل المحاضرة...
          </p>
        </div>
      </main>
    );
  }

  const handlePublish = async () => {
    let success;

    if (lecture.isPublished) {
      success = await unPublishLec(lecture._id);
    } else {
      success = await publishLec(lecture._id);
    }

    if (success) {
      await getLecture(id);
      setIsPublishModalOpen(false);
    }
  };

  const handleDelete = async () => {
    const success = await deleteLecture(lecture._id);

    if (success) {
      setIsDeleteModalOpen(false);
      navigate("/admin/lectures");
    }
  };

  return (
  <>
  <Helmet>
    <title>تفاصيل المحاضرة | لوحة التحكم</title>
    <meta
      name="description"
      content="عرض وإدارة تفاصيل المحاضرة"
    />
  </Helmet>
    <main
      dir="rtl"
      className="min-h-screen bg-gray-100 px-5 py-8 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-5xl">

        <button
          onClick={() => navigate("/admin/lectures")}
          className="mb-6 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700"
        >
          <FaArrowRight />
          العودة إلى المحاضرات
        </button>

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

          <div className="bg-gray-800 p-6 sm:p-8">

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
              <FaBookOpen className="text-xl text-white" />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

              <div>
                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                  {lecture.title}
                </h1>

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-300">
                  <FaCalendarDays />

                  <span>
                    {new Date(lecture.date).toLocaleDateString("ar-EG", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <span
                className={`w-fit rounded-full px-4 py-2 text-xs font-medium ${
                  lecture.isPublished
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-red-500/20 text-red-300"
                }`}
              >
                {lecture.isPublished
                  ? "المحاضرة متاحة"
                  : "المحاضرة غير متاحة"}
              </span>

            </div>
          </div>

          <div className="p-5 sm:p-8">

            {lecture.videoUrl && (
              <div className="mb-8 overflow-hidden rounded-2xl bg-black">

                <video
                  src={lecture.videoUrl}
                  controls
                  className="block h-[220px] w-full object-contain sm:h-[350px] lg:h-[450px]"
                >
                  المتصفح لا يدعم تشغيل الفيديو.
                </video>

              </div>
            )}

            {/* Description */}
            {lecture.description && (
              <div className="mb-8">

                <h2 className="mb-3 text-lg font-bold text-gray-800">
                  عن المحاضرة
                </h2>

                <p className="leading-8 text-gray-600">
                  {lecture.description}
                </p>

              </div>
            )}

            {/* PDF */}
            {lecture.pdfUrl && (
              <a
                href={lecture.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="mb-8 flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                <FaDownload />
                تحميل ملف المحاضرة
              </a>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row">

              {/* Publish / Unpublish */}
              <button
                onClick={() => setIsPublishModalOpen(true)}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white transition ${
                  lecture.isPublished
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {lecture.isPublished
                  ? "إلغاء إتاحة المحاضرة"
                  : "إتاحة المحاضرة"}
              </button>

              {/* Edit */}
              <button
                onClick={() => setIsFormModalOpen(true)}
                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                <FaPen />
                تعديل المحاضرة
              </button>

              {/* Delete */}
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-50 px-5 py-3 text-sm font-medium text-red-600 transition hover:bg-red-100"
              >
                <FaTrash />
                حذف المحاضرة
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
      >
        <LectureForm
          mode="edit"
          lecture={lecture}
          onSuccess={async () => {
            setIsFormModalOpen(false);
            await getLecture(id);
          }}
        />
      </Modal>

      {/* Publish Modal */}
      <Modal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
      >
        <CheckPublish
          lecture={lecture}
          onClose={() => setIsPublishModalOpen(false)}
          onConfirm={handlePublish}
        />
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <CheckDelete
          type="lecture"
          id={lecture._id}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      </Modal>
    </main>
  </>
  );
}