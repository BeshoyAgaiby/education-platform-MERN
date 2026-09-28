import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { FaBookOpen, FaClipboardCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function QuickStats() {
  const {getLectures,lectures,getExams,exams,} = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      setLoading(true);

      await Promise.all([
        getLectures(),
        getExams(),
      ]);

      setLoading(false);
    };

    getStats();
  }, []);

  return (
    <section
      dir="rtl"
      className="bg-gray-100 px-5 py-5 sm:px-8 lg:px-12"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2">

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
            <FaBookOpen className="text-xl text-blue-600" />
          </div>

          <p className="text-sm text-gray-500">
            المحاضرات المتاحة
          </p>

          <p className="mt-1 text-2xl font-bold text-gray-800">
            {loading ? "..." : lectures.length}
          </p>

          <Link
            to="/home/lectures"
            className="mt-5 block w-full rounded-xl bg-gray-200 px-4 py-2.5 text-center text-sm font-medium text-black transition hover:bg-gray-300"
          >
            عرض كل المحاضرات
          </Link>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
            <FaClipboardCheck className="text-xl text-blue-600" />
          </div>

          <p className="text-sm text-gray-500">
            الامتحانات المتاحة
          </p>

          <p className="mt-1 text-2xl font-bold text-gray-800">
            {loading ? "..." : exams.length}
          </p>

          <Link
            to="/home/exams"
            className="mt-5 block w-full rounded-xl bg-gray-200 px-4 py-2.5 text-center text-sm font-medium text-black transition hover:bg-gray-300"
          >
            عرض كل الامتحانات
          </Link>
        </div>

      </div>
    </section>
  );
}