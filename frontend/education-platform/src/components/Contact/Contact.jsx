import { Helmet } from "react-helmet-async";
import {FaPhone,FaWhatsapp,FaEnvelope,FaLocationDot,FaArrowRight,} from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
  <>
      <Helmet>
        <title>تواصل معنا | Educational Platform</title>       
      </Helmet>
    <section
      dir="rtl"
      className="min-h-screen bg-gray-100 px-5 py-8 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">

        <div className="mb-8">
          <Link
            to="/home"
            className="mb-4 inline-flex items-center gap-2 text-sm text-blue-500 transition hover:text-blue-700"
          >
            <FaArrowRight />
            العودة للرئيسية
          </Link>

          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            تواصل معنا
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            لو عندك أي استفسار أو مشكلة، تقدر تتواصل معنا من خلال أي وسيلة من الوسائل التالية.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-2xl lg:col-span-2 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-gray-800">
              معلومات التواصل
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              نحن متاحون لمساعدتك والإجابة عن أي استفسار متعلق بالمحاضرات والامتحانات والحضور.
            </p>

            <div className="mt-8 space-y-5">

              <a
                href="tel:+201000000000"
                className="flex items-center gap-4 rounded-xl bg-gray-50 p-4 transition hover:bg-blue-50"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                  <FaPhone className="text-blue-600" />
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    رقم الهاتف
                  </p>

                  <p className="mt-1 font-medium text-gray-700">
                    01000000000
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me/201000000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-xl bg-gray-50 p-4 transition hover:bg-emerald-50"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
                  <FaWhatsapp className="text-xl text-emerald-600" />
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    واتساب
                  </p>

                  <p className="mt-1 font-medium text-gray-700">
                    تواصل معنا عبر واتساب
                  </p>
                </div>
              </a>

              <a
                href="beshoy@gmail.com"
                className="flex items-center gap-4 rounded-xl bg-gray-50 p-4 transition hover:bg-blue-50"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                  <FaEnvelope className="text-blue-600" />
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    البريد الإلكتروني
                  </p>

                  <p className="mt-1 font-medium text-gray-700">
                    beshoy@gmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                  <FaLocationDot className="text-blue-600" />
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    العنوان
                  </p>

                  <p className="mt-1 font-medium text-gray-700">
                    اكتب عنوان المركز هنا
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-gray-800">
              ابعتلنا رسالة
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              اكتب رسالتك وسنقوم بالرد عليك في أقرب وقت.
            </p>

            <form className="mt-8 space-y-5">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  الاسم
                </label>

                <input
                  type="text"
                  placeholder="اكتب اسمك"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  البريد الإلكتروني
                </label>

                <input
                  type="email"
                  placeholder="person@gmail.com"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  الرسالة
                </label>

                <textarea
                  rows="5"
                  placeholder="اكتب رسالتك هنا..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
              >
                إرسال الرسالة
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  </>
  );
}