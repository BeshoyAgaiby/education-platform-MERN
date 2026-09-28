import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";
import { Helmet } from "react-helmet-async";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().trim().email("أدخل بريد إلكتروني صحيح").required("البريد الإلكتروني مطلوب"),
      password: Yup.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل").required("كلمة المرور مطلوبة"),}),

    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/admin/login`, values);
        login(data.admin,data.token)
        navigate("/admin/dashboard");
      } catch (error) {
        setErrors({ email: error.response?.data?.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة",});
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
    <Helmet>
        <title>تسجيل دخول المسؤول | Educational Platform</title>
        <meta
          name="description"
          content="تسجيل دخول المسؤول إلى المنصة التعليمية"
        />
    </Helmet>
    <section
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-slate-950 px-5"
    >
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10">
            <FaUserShield className="text-3xl text-blue-500" />
          </div>

          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            لوحة الإدارة
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            تسجيل دخول المسؤول
          </p>

        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-7">

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white sm:text-xl">
              دخول المسؤول
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              أدخل بيانات حساب المسؤول للوصول إلى لوحة التحكم
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-5">

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                البريد الإلكتروني
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full rounded-xl border bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-slate-700 focus:border-blue-500"
                }`}
              />

              {formik.touched.email && formik.errors.email && (
                <p className="mt-2 text-sm text-red-400">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                كلمة المرور
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="أدخل كلمة المرور"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full rounded-xl border bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-slate-700 focus:border-blue-500"
                }`}
              />

              {formik.touched.password && formik.errors.password && (
                <p className="mt-2 text-sm text-red-400">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full rounded-xl cursor-pointer bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {formik.isSubmitting
                ? "جاري تسجيل الدخول..."
                : "تسجيل الدخول"}
            </button>

          </form>
        </div>

      </div>
    </section>

  </>
  );
}