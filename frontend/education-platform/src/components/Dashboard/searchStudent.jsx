import { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";

export default function SearchStudent() {
  const { searchStudent, search } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-800">
          البحث عن طالب
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          ابحث عن الطالب بالاسم أو كود الطالب
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="اسم الطالب أو كود الطالب..."
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />

          <button
             type="button"
             disabled={loading}
             onClick={async() => {
                 setLoading(true);
                 setSearched(true);
                 await searchStudent(query);
                 setLoading(false)
                }}
               className="cursor-pointer rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
               >
          {loading ? "جاري البحث..." : "بحث"}
          </button>
      </div>
      {searched && search.length === 0 && (
        <div className="mt-6 rounded-xl bg-red-50 p-4 text-center">
             <p className="text-sm font-medium text-red-600">
                لا يوجد طالب بهذا الاسم أو الكود
              </p>
        </div>
        )}
      {search.length > 0 && (
        <div className="mt-6 space-y-5">
          {search.map((item) => (
            <div
              key={item.student._id}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-5"
            >
              <div className="mb-5">
                <h3 className="text-lg font-bold text-gray-800">
                  {item.student.name}
                </h3>

                <div className="mt-2 grid grid-cols-1 gap-2 text-sm text-gray-500 sm:grid-cols-3">
                  <p>
                    الكود:
                    <span className="mr-1 font-medium text-gray-700">
                      {item.student.studentCode}
                    </span>
                  </p>

                  <p>
                    الصف:
                    <span className="mr-1 font-medium text-gray-700">
                      {item.student.grade || "غير محدد"}
                    </span>
                  </p>

                  <p>
                    الهاتف:
                    <span className="mr-1 font-medium text-gray-700">
                      {item.student.phone || "غير محدد"}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <h4 className="mb-3 font-semibold text-gray-800">
                  سجل الحضور
                </h4>

                {item.attendance.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] text-right text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 text-gray-500">
                          <th className="px-4 py-3">المحاضرة</th>
                          <th className="px-4 py-3">التاريخ</th>
                          <th className="px-4 py-3">الحالة</th>
                        </tr>
                      </thead>

                      <tbody>
                        {item.attendance.map((attendance) => (
                          <tr
                            key={attendance._id}
                            className="border-b border-gray-100 last:border-0"
                          >
                            <td className="px-4 py-3 font-medium text-gray-700">
                              {attendance.lecture?.title}
                            </td>

                            <td className="px-4 py-3 text-gray-500">
                              {new Date(
                                attendance.lecture?.date
                              ).toLocaleDateString("ar-EG")}
                            </td>

                            <td className="px-4 py-3">
                              <span
                                className={`rounded-lg px-3 py-1 text-xs font-medium ${
                                  attendance.status === "present"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {attendance.status === "present"
                                  ? "حاضر"
                                  : "غائب"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    لا يوجد سجل حضور لهذا الطالب.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}