import { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AdminContext } from "../../context/AdminContext";

export default function AttendanceForm({ mode = "add",attendance = null,onSuccess,}) {
  const {attends,addAttendance,editAttendance,} = useContext(AdminContext);

  const isEdit = mode === "edit";
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      student: attendance?.student?._id || attendance?.student || "",
      lecture: attendance?.lecture?._id || attendance?.lecture || "",
      status: attendance?.status || "present",
    },

    validationSchema: Yup.object({
      student: Yup.string().required("الطالب مطلوب"),
      lecture: Yup.string().required("المحاضرة مطلوبة"),
      status: Yup.string()
        .oneOf(["present", "absent"], "حالة الحضور غير صحيحة")
        .required("حالة الحضور مطلوبة"),
    }),

    onSubmit: async (values) => {
      try {
        let success;
        if (isEdit) {
          success = await editAttendance( attendance._id, values);
        } else {
          success = await addAttendance(values);
        }

        if (success) {
          onSuccess();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const students = [
    ...new Map(
      attends
        .filter((item) => item.student)
        .map((item) => [
          item.student._id,
          item.student,
        ])
    ).values(),
  ];

  const lectures = [
    ...new Map(
      attends
        .filter((item) => item.lecture)
        .map((item) => [
          item.lecture._id,
          item.lecture,
        ])
    ).values(),
  ];

  return (
    <form
      onSubmit={formik.handleSubmit}
      dir="rtl"
      className="space-y-5"
    >


      <div>
        <h2 className="text-xl font-bold text-gray-800">
          {isEdit
            ? "تعديل الحضور"
            : "إضافة حضور"}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {isEdit
            ? "قم بتعديل بيانات الحضور"
            : "قم بإضافة حضور طالب لمحاضرة"}
        </p>
      </div>


      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          الطالب
        </label>

        <select
          name="student"
          value={formik.values.student}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={isEdit}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 disabled:bg-gray-100"
        >
          <option value="">
            اختر الطالب
          </option>

          {students.map((student) => (
            <option
              key={student._id}
              value={student._id}
            >
              {student.name} - {student.studentCode}
            </option>
          ))}
        </select>

        {formik.touched.student && formik.errors.student && (
            <p className="mt-1 text-sm text-red-500">
              {formik.errors.student}
            </p>
          )}
      </div>


      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          المحاضرة
        </label>

        <select
          name="lecture"
          value={formik.values.lecture}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={isEdit}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 disabled:bg-gray-100"
        >
          <option value="">
            اختر المحاضرة
          </option>

          {lectures.map((lecture) => (
            <option
              key={lecture._id}
              value={lecture._id}
            >
              {lecture.title}
            </option>
          ))}
        </select>

        {formik.touched.lecture &&formik.errors.lecture && (
            <p className="mt-1 text-sm text-red-500">
              {formik.errors.lecture}
            </p>
          )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          حالة الحضور
        </label>

        <select
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
        >
          <option value="present">
            حاضر
          </option>

          <option value="absent">
            غائب
          </option>
        </select>

        {formik.touched.status && formik.errors.status && (
            <p className="mt-1 text-sm text-red-500">
              {formik.errors.status}
            </p>
          )}
      </div>

      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {formik.isSubmitting
          ? "جاري الحفظ..."
          : isEdit
          ? "حفظ التعديلات"
          : "إضافة الحضور"}
      </button>

    </form>
  );
}