import { Link, useLocation } from "react-router-dom";
import {FaArrowRight,FaTriangleExclamation} from "react-icons/fa6";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  const location = useLocation();

  const homePath = location.pathname.startsWith("/admin") ? "/admin/dashboard" : "/home";

  return (
    <>
    <Helmet>
        <title>صفحه خطا</title>
    </Helmet>
    <section
      dir="rtl"
      className="flex min-h-[70vh] items-center justify-center bg-gray-100 px-5 py-10"
    >
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm sm:p-10">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
          <FaTriangleExclamation className="text-3xl text-blue-600" />
        </div>

        <h1 className="mt-6 text-6xl font-bold text-gray-800">
          404
        </h1>

        <h2 className="mt-4 text-xl font-bold text-gray-800">
          الصفحة غير موجودة
        </h2>

        <p className="mt-3 text-sm leading-7 text-gray-500">
          عذرًا، الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها إلى مكان آخر.
        </p>

        <Link
          to={homePath}
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <FaArrowRight />
          العودة للرئيسية
        </Link>

      </div>
    </section>
    </>
  );
}