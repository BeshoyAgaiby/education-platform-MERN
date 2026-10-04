import { useContext, useEffect,useState } from "react";
import { AppContext } from "../../context/AppContext";
import {FaBookOpen,FaCalendarDays,FaDownload,} from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import Loading from "../Loading/Loading";

export default function Lectures() {
  const { lectures, getLectures } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
    setLoading(true);
    await getLectures();
    setLoading(false);
  };

  getData();
  }, []);

  return (
    <>
    <Helmet>
        <title>المحاضرات | Educational Platform</title>
    </Helmet>
    <main
      dir="rtl"
      className="min-h-screen bg-gray-100 px-5 py-8 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            جميع المحاضرات
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            تابع جميع المحاضرات المتاحة واستكمل رحلتك التعليمية.
          </p>
        </div>

        {loading ? (
          <Loading />
        ) : lectures.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center text-gray-500">
            لا توجد محاضرات متاحة حاليًا
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {lectures.map((lecture) => (
              <div
                key={lecture._id}
                className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <FaBookOpen className="text-xl text-blue-600" />
                </div>

                <h2 className="text-lg font-bold text-gray-800">
                  {lecture.title}
                </h2>

                {lecture.description && (
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500">
                    {lecture.description}
                  </p>
                )}

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <FaCalendarDays />

                  <span>
                    {new Date(lecture.date).toLocaleDateString("ar-EG", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="mt-auto flex flex-col gap-2 pt-5">
                  {lecture.videoUrl && (
                   <a
                    href={lecture.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                   >
                     مشاهدة المحاضرة
                  </a>
                  )}

                  {lecture.pdfUrl && (
                    <a
                      href={lecture.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                      <FaDownload />
                      تحميل الملف
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
    </>
  );
}
