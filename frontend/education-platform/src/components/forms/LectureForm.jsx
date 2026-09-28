import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

export default function LectureForm({ mode = "add",lecture = null,onSuccess}) {
  const { addLecture,editLecture,} = useContext(AdminContext);

  const isEdit = mode === "edit";

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: lecture?.title || "",
      description: lecture?.description || "",
      date: lecture?.date
        ? lecture.date.slice(0, 10)
        : "",
      video: null,
      pdf: null,
      isPublished: lecture?.isPublished ?? true,
    },

    validationSchema: Yup.object({
      title: Yup.string().trim()
        .min(2, "عنوان المحاضرة يجب أن يكون حرفين على الأقل")
        .max(100, "العنوان لا يمكن أن يتجاوز 100 حرف")
        .required("عنوان المحاضرة مطلوب"),

      description: Yup.string().trim()
        .max(500, "الوصف لا يمكن أن يتجاوز 500 حرف"),

      date: Yup.date()
        .required("تاريخ المحاضرة مطلوب"),
    }),

    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("date", values.date);
        formData.append("isPublished", values.isPublished);

        if (values.video) {
          formData.append("video", values.video);
        }

        if (values.pdf) {
          formData.append("pdf", values.pdf);
        }

        let success;

        if (isEdit) {
          success = await editLecture(lecture._id,formData);
        } else {
          success = await addLecture(formData);
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
    <div dir="rtl">

      <div className="mb-6 ">
        <h2 className="text-xl font-bold text-gray-800">
          {isEdit ? "تعديل المحاضرة" : "إضافة محاضرة"}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {isEdit
            ? "قم بتعديل بيانات المحاضرة"
            : "أضف محاضرة جديدة إلى المنصة"}
        </p>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="space-y-4"
      >

        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            عنوان المحاضرة
          </label>

          <input
            id="title"
            name="title"
            type="text"
            placeholder="أدخل عنوان المحاضرة"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
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
            وصف المحاضرة
          </label>

          <textarea
            id="description"
            name="description"
            rows="4"
            placeholder="أدخل وصف المحاضرة"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
          />

          {formik.touched.description &&
            formik.errors.description && (
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
            تاريخ المحاضرة
          </label>

          <input
            id="date"
            name="date"
            type="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
          />

          {formik.touched.date && formik.errors.date && (
            <p className="mt-1 text-sm text-red-500">
              {formik.errors.date}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="video"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            فيديو المحاضرة
          </label>

          <input
            id="video"
            name="video"
            type="file"
            accept="video/*"
            onChange={(event) => {
              formik.setFieldValue(
                "video",
                event.currentTarget.files[0]
              );
            }}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm"
          />
        </div>

        {/* PDF */}
        <div>
          <label
            htmlFor="pdf"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            ملف PDF
          </label>

          <input
            id="pdf"
            name="pdf"
            type="file"
            accept=".pdf,application/pdf"
            onChange={(event) => {
              formik.setFieldValue(
                "pdf",
                event.currentTarget.files[0]
              );
            }}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="isPublished"
            name="isPublished"
            type="checkbox"
            checked={formik.values.isPublished}
            onChange={formik.handleChange}
          />

          <label
            htmlFor="isPublished"
            className="text-sm text-gray-700"
          >
            نشر المحاضرة
          </label>
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full rounded-xl bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {formik.isSubmitting
            ? isEdit
              ? "جاري التعديل..."
              : "جاري الإضافة..."
            : isEdit
              ? "حفظ التعديلات"
              : "إضافة المحاضرة"}
        </button>

      </form>
    </div>
  );
}