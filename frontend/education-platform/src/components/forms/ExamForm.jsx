import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

export default function ExamForm({mode = "add",exam = null,onSuccess,}) {
  const { addExam, editExam } = useContext(AdminContext);

  const isEdit = mode === "edit";
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: exam?.title || "",
      description: exam?.description || "",
      date: exam?.date ? exam.date.slice(0, 10) : "",
      totalMarks: exam?.totalMarks || "",
      isPublished: exam?.isPublished ?? true,
    },

    validationSchema: Yup.object({
      title: Yup.string().trim()
        .min(2, "العنوان يجب أن يكون حرفين على الأقل")
        .max(100, "العنوان لا يمكن أن يتجاوز 100 حرف")
        .required("عنوان الامتحان مطلوب"),

      description: Yup.string().trim()
        .max(500, "الوصف لا يمكن أن يتجاوز 500 حرف"),

      date: Yup.date().required("تاريخ الامتحان مطلوب"),

      totalMarks: Yup.number().typeError("الدرجة يجب أن تكون رقمًا")
        .min(1, "الدرجة يجب أن تكون أكبر من صفر")
        .required("الدرجة الكلية مطلوبة"),
    }),

    onSubmit: async (values) => {
      try {
        let success;

        if (isEdit) {
          success = await editExam(exam._id, values);
        } else {
          success = await addExam(values);
        }

        if (success) {
          onSuccess();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      dir="rtl"
      className="space-y-5"
    >

      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          عنوان الامتحان
        </label>

        <input
          id="title"
          name="title"
          type="text"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="مثال: امتحان الوحدة الأولى"
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
        />

        {formik.touched.title && formik.errors.title && (
          <p className="mt-1 text-sm text-red-500">
            {formik.errors.title}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          وصف الامتحان
        </label>

        <textarea
          id="description"
          name="description"
          rows="4"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="اكتب وصفًا مختصرًا للامتحان..."
          className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
        />

        {formik.touched.description && formik.errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {formik.errors.description}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="date"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          تاريخ الامتحان
        </label>

        <input
          id="date"
          name="date"
          type="date"
          value={formik.values.date}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
        />

        {formik.touched.date && formik.errors.date && (
          <p className="mt-1 text-sm text-red-500">
            {formik.errors.date}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="totalMarks"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          الدرجة الكلية
        </label>

        <input
          id="totalMarks"
          name="totalMarks"
          type="number"
          min="1"
          value={formik.values.totalMarks}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="مثال: 50"
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
        />

        {formik.touched.totalMarks && formik.errors.totalMarks && (
          <p className="mt-1 text-sm text-red-500">
            {formik.errors.totalMarks}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-gray-700">
            حالة الامتحان
          </p>

          <p className="mt-1 text-xs text-gray-500">
            هل يظهر الامتحان للطلاب؟
          </p>
        </div>

        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            name="isPublished"
            checked={formik.values.isPublished}
            onChange={formik.handleChange}
            className="peer sr-only"
          />

          <div className="h-6 w-11 rounded-full bg-gray-300 transition peer-checked:bg-blue-600 peer-focus:outline-none after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full" />
        </label>

      </div>


      <button 
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full cursor-pointer rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {formik.isSubmitting
          ? "جاري الحفظ..."
          : isEdit
          ? "حفظ التعديلات"
          : "إضافة الامتحان"}
      </button>

    </form>
  );
}