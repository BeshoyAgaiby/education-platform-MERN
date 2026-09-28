import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

export default function StudentForm({mode = "add",student = null,onSuccess,}) {
  const {addStudent,editStudent}=useContext(AdminContext);
  const isEdit = mode === "edit";

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: student?.name || "",
      studentCode: student?.studentCode || "",
      phone: student?.phone || "",
      grade: student?.grade || "",
    },

    validationSchema: Yup.object({
      name: Yup.string().trim().min(2, "الاسم يجب أن يكون حرفين على الأقل")
        .max(50, "الاسم لا يمكن أن يتجاوز 50 حرف")
        .required("اسم الطالب مطلوب"),

      studentCode: Yup.string()
        .trim()
        .required("كود الطالب مطلوب"),

      phone: Yup.string().trim(),
      grade: Yup.string().trim(),
    }),

    onSubmit: async (values) => {
        if (isEdit) {
        await editStudent(student._id,values)
        } else {
        await addStudent(values)
        }
        onSuccess();
      } 
  });

  return (
    <div dir="rtl">

      <div className="mb-6 mt-4">
        <h2 className="text-xl font-bold text-gray-800">
          {isEdit ? "تعديل بيانات الطالب" : "إضافة طالب"}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {isEdit
            ? "قم بتعديل بيانات الطالب"
            : "أضف بيانات الطالب إلى المنصة"}
        </p>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="space-y-4"
      >

        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            اسم الطالب
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="أدخل اسم الطالب"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm outline-none ${
              formik.touched.name && formik.errors.name
                ? "border-red-500"
                : "border-gray-200 focus:border-blue-500"
            }`}
          />

          {formik.touched.name && formik.errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {formik.errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="studentCode"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            كود الطالب
          </label>

          <input
            id="studentCode"
            name="studentCode"
            type="text"
            placeholder="مثال: ST001"
            value={formik.values.studentCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm uppercase outline-none ${
              formik.touched.studentCode &&
              formik.errors.studentCode
                ? "border-red-500"
                : "border-gray-200 focus:border-blue-500"
            }`}
          />

          {formik.touched.studentCode &&
            formik.errors.studentCode && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.studentCode}
              </p>
            )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            رقم الهاتف
          </label>

          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="أدخل رقم الهاتف"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="grade"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            الصف
          </label>

          <input
            id="grade"
            name="grade"
            type="text"
            placeholder="أدخل الصف"
            value={formik.values.grade}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
          />
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
              : "إضافة الطالب"}
        </button>

      </form>
    </div>
  );
}