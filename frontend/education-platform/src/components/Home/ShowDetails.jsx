import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import {FaBookOpen,FaCalendarDays,FaArrowLeft,} from "react-icons/fa6";

export default function ShowDetails() {
  const { lectures, exams } = useContext(AppContext);

  const latestLectures = [...lectures]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  const upcomingExams = [...exams]
    .filter((exam) => new Date(exam.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  return (
    <section
      dir="rtl"
      className="bg-gray-100 px-5 py-8 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl space-y-10">

       
        <div>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
                آخر المحاضرات
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                أحدث المحاضرات المتاحة
              </p>
            </div>

            <Link
              to="/home/lectures"
              className="flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700"
            >
              عرض الكل
              <FaArrowLeft />
            </Link>
          </div>

          {latestLectures.length === 0 ? (
            <div className="rounded-2xl bg-white p-6 text-center text-sm text-gray-500">
              لا توجد محاضرات متاحة حاليًا
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {latestLectures.map((lecture) => (
                <div
                  key={lecture._id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                    <FaBookOpen className="text-xl text-blue-600" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-800">
                    {lecture.title}
                  </h3>

                  {lecture.description && (
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                      {lecture.description}
                    </p>
                  )}

                  <p className="mt-4 text-sm text-gray-500">
                    📅{" "}
                    {new Date(lecture.date).toLocaleDateString("ar-EG", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
                الامتحانات القادمة
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                أقرب الامتحانات المتاحة
              </p>
            </div>

            <Link
              to="/home/exams"
              className="flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700"
            >
              عرض الكل
              <FaArrowLeft />
            </Link>
          </div>

          {upcomingExams.length === 0 ? (
            <div className="rounded-2xl bg-white p-6 text-center text-sm text-gray-500">
              لا توجد امتحانات قادمة حاليًا
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {upcomingExams.map((exam) => (
                <div
                  key={exam._id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                    <FaCalendarDays className="text-xl text-blue-600" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-800">
                    {exam.title}
                  </h3>

                  {exam.description && (
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                      {exam.description}
                    </p>
                  )}

                  <p className="mt-4 text-sm text-gray-500">
                    📅{" "}
                    {new Date(exam.date).toLocaleDateString("ar-EG", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>

                  <p className="mt-2 text-sm font-medium text-gray-700">
                    الدرجة النهائية:{" "}
                    <span className="text-blue-600">
                      {exam.totalMarks}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}