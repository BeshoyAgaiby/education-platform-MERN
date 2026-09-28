import { useAuth } from "../../context/AuthContext";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

export default function Hero() {
  const { user } = useAuth();

  const isActive = user?.isActive;

  return (
    <section dir="rtl" className="bg-gray-100 px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-gray-800 px-6 py-10 sm:px-10 lg:px-14 lg:py-14">

          <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          
            <div>
              <p className="mb-3 text-sm font-medium text-blue-400">
                مرحبًا بعودتك 👋
              </p>

              <h1 className="text-3xl font-bold text-white sm:text-4xl">
                أهلاً يا{" "}
                <span className="text-blue-400">
                  {user?.name || "طالب"}
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                سعيدين بوجودك معنا، تابع محاضراتك وامتحاناتك
                واستكمل رحلتك التعليمية.
              </p>

            </div>

            <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-slate-700 bg-slate-800/70 px-5 cursor-pointer py-4">

              {isActive ? (
                <FaCircleCheck className="text-2xl text-emerald-400 " />
              ) : (
                <FaCircleXmark className="text-2xl text-red-400 " />
              )}

              <div>
                <p className="text-xs text-slate-400">
                  حالة الحساب
                </p>

                <p
                  className={`mt-1 font-semibold cursor-pointer ${
                    isActive
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {isActive ? "نشط" : "غير نشط"}
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}