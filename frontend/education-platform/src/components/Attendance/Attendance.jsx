import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import {FaArrowRight,FaCheck,FaXmark,FaCalendarDays,} from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import Loading from "../Loading/Loading";

export default function Attendance() {
  const {attendance,attendanceStats,getMyAttendance,} = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData=async()=>{
      setLoading(true)
    await getMyAttendance();
     setLoading(false)
    }
    getData();
  }, []);

  return (
    <>
    <Helmet>
        <title>سجل الحضور | Educational Platform</title>
         <meta
          name="description"
          content="سجل حضور الطالب في المحاضرات"
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
            className="mb-4 inline-flex items-center gap-2 text-sm text-blue-500 transition hover:text-blue-700"
          >
            <FaArrowRight />
            العودة للرئيسية
          </Link>

          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            الحضور والغياب
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            تابع سجل حضورك في المحاضرات
          </p>
        </div>

        {attendanceStats && (
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                إجمالي المحاضرات
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-800">
                {attendanceStats.totalLectures}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  الحضور
                </p>

                <FaCheck className="text-emerald-500" />
              </div>

              <p className="mt-2 text-2xl font-bold text-emerald-600">
                {attendanceStats.presentLectures}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  الغياب
                </p>

                <FaXmark className="text-red-500" />
              </div>

              <p className="mt-2 text-2xl font-bold text-red-600">
                {attendanceStats.absentLectures}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                نسبة الحضور
              </p>

              <p className={`mt-2 text-2xl font-bold ${attendanceStats.attendancePercentage<50?'text-red-500':'text-blue-400'}`}>
                {attendanceStats.attendancePercentage}%
              </p>
            </div>
          </div>
        )}

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

          <div className="border-b border-gray-100 p-5">
            <h2 className="text-lg font-bold text-gray-800">
              سجل الحضور
            </h2>
          </div>

        {loading ? (
         <Loading />
        ):attendance.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-500">
              لا توجد بيانات حضور حاليًا
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-right">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      المحاضرة
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      التاريخ
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      الحالة
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {attendance.map((item) => (
                    <tr
                      key={item._id}
                      className="border-t border-gray-100"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                            <FaCalendarDays className="text-blue-600" />
                          </div>

                          <span className="font-medium text-gray-800">
                            {item.lecture?.title}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-500">
                        {new Date(
                          item.lecture?.date
                        ).toLocaleDateString("ar-EG", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </td>

                      <td className="px-5 py-4">
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  </>
  );
}