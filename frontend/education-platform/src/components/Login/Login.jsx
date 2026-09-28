import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      studentCode: "",
    },

    validationSchema: Yup.object({
      studentCode: Yup.string().trim().required("كود الطالب مطلوب"),}),

    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/access`,values);        
        login(data.student,data.token);
        navigate("/home");
      } catch (error) {
        setErrors({studentCode: error.response?.data?.message || "كود الطالب غير صحيح"});
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
  <>
  <Helmet>
        <title>تسجيل دخول طالب | Educational Platform</title>
        <meta
          name="description"
          content="تسجيل دخول الطالب إلى المنصة التعليمية"
        />
  </Helmet>
    <section
      dir="rtl"
      className="min-h-screen bg-slate-950 flex items-center justify-center px-5"
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10">
            <FaGraduationCap className="text-3xl text-blue-500" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            منصة التعلم
          </h1>

          <p className="mt-2 text-sm sm:text-base text-slate-400">
            أهلاً بك في منصتك التعليمية 👋
          </p>

        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7 shadow-xl">

          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              دخول الطالب
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              أدخل كود الطالب للوصول إلى حسابك
            </p>
          </div>

          <form onSubmit={formik.handleSubmit}>

            <div>

              <label htmlFor="studentCode"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                كود الطالب
              </label>

              <input
                id="studentCode"
                name="studentCode"
                type="text"
                placeholder="ادخل كود الطالب"
                value={formik.values.studentCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full rounded-xl border bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition
                  ${
                    formik.touched.studentCode &&
                    formik.errors.studentCode
                      ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  }
                `}
              />
              {formik.touched.studentCode &&
                formik.errors.studentCode && (
                  <p className="mt-2 text-sm text-red-400">
                    {formik.errors.studentCode}
                  </p>
                )}

            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="mt-6 w-full cursor-pointer rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {formik.isSubmitting ? "جاري الدخول..." : "دخول"}
            </button>

          </form>
           <div className="mt-6 border-t border-slate-800 pt-5 text-center">
            <p className="text-xs text-slate-500">
              هل أنت مسؤول المنصة؟
            </p>

            <Link
              to="/admin/login"
              className="mt-2 inline-block cursor-pointer text-sm font-medium text-blue-500 transition hover:text-blue-400"
            >
              دخول المسؤول
            </Link>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">
          أدخل الكود الخاص بك للدخول إلى المنصة
        </p>

      </div>
    </section>
  </>
  );
}