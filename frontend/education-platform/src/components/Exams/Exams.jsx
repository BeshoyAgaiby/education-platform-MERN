import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { FaCalendarDays, FaArrowRight } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import Loading from "../Loading/Loading";

export default function Exams() {
  const { getExams, exams } = useContext(AppContext);
    const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await getExams();
      setLoading(false);
    };

    getData();
  }, []);

  return (
    <>
    <Helmet>
        <title>الامتحانات | Educational Platform</title>
        <meta
          name="description"
          content="الامتحانات المتاحة للطالب في المنصة التعليمية"
        />
    </Helmet>
    <section
      dir="rtl"
      className="min-h-screen bg-gray-100 px-5 py-8 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <Link
            to="/home"
            className="mb-4 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
          >
            <FaArrowRight />
            العودة للرئيسية
          </Link>

          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            الامتحانات
          </h1>

          <p className="mt-2 text-sm text-gray-500">جميع الامتحانات المتاحة</p>
        </div>
        
          {loading ? (
            <Loading />
          ):exams.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center text-gray-500 shadow-sm">
            لا توجد امتحانات متاحة حاليًا
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {exams.map((exam) => (
              <Link
                to={`/home/exams/${exam._id}`}
                key={exam._id}
                className="block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <FaCalendarDays className="text-xl text-blue-600" />
                </div>

                <h2 className="text-lg font-bold text-gray-800">
                  {exam.title}
                </h2>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                    {exam.description}
                  </p>
                

                <div className="mt-5 rounded-xl bg-gray-50 p-3">
                  <p className="text-xs text-gray-400">موعد الامتحان</p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {new Date(exam.date).toLocaleDateString("ar-EG", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">الدرجة النهائية</span>

                  <span className="font-bold text-blue-600">
                    {exam.totalMarks} درجة
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
    </>
  );
}
