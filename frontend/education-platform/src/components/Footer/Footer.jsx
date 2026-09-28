import {FaGraduationCap,FaPhone,FaEnvelope,FaLocationDot,} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer dir="rtl" className="mt-auto bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

          <div>
            <div className="mb-3 flex items-center gap-2">
              <FaGraduationCap className="text-2xl text-blue-500" />

              <h2 className="text-lg font-bold">
                منصة التعلم
              </h2>
            </div>

            <p className="hidden max-w-sm text-sm leading-6 text-slate-400 sm:block">
              منصة تعليمية تساعد الطلاب على متابعة المحاضرات،
              الامتحانات، الحضور والدرجات بسهولة.
            </p>
          </div>

          <div className="hidden sm:block">
            <h3 className="mb-4 font-semibold">
              روابط سريعة
            </h3>

            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <a href="/" className="transition hover:text-white">
                الرئيسية
              </a>

              <a href="/lectures" className="transition hover:text-white">
                المحاضرات
              </a>

              <a href="/exams" className="transition hover:text-white">
                الامتحانات
              </a>

              <a href="/contact" className="transition hover:text-white">
                تواصل معنا
              </a>
            </div>
          </div>

          <div>
            <h3 className="hidden mb-4 font-semibold sm:block">
              تواصل معنا
            </h3>

            <div className="flex flex-col gap-3 text-sm text-slate-400">

              <div className="flex items-center gap-3">
                <FaPhone className="text-blue-500" />
                <span>01000000000</span>
              </div>

              <div className="hidden items-center gap-3 sm:flex">
                <FaEnvelope className="text-blue-500" />
                <span>beshoy@gmail.com</span>
              </div>

              <div className="hidden items-center gap-3 sm:flex">
                <FaLocationDot className="text-blue-500" />
                <span>مصر</span>
              </div>

            </div>
          </div>

        </div>
        <div className="mt-8 border-t border-slate-800 pt-5 text-center">
          <p className="text-xs text-slate-500 sm:text-sm">
            © {new Date().getFullYear()} منصة التعلم — جميع الحقوق محفوظة
          </p>
        </div>

      </div>
    </footer>
  );
}