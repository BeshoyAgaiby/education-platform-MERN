import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

export default function CheckDelete({type, id,onClose,onConfirm}) {
  const { deleteStudent,deleteLecture,deleteExam,deleteAttendance } = useContext(AdminContext);

  async function handleDelete() {
     let success = false;

    if (type === "student") {
      success = await deleteStudent(id);
    } else if (type === "lecture") {
      success = await deleteLecture(id);
    }else if (type === "exam") {
      success = await deleteExam(id);
    }else if (type === "attendance") {
      success = await deleteAttendance(id);
    }

    if (success) {
      onConfirm();
      onClose();
    }
  }

  return (
    <div dir="rtl" className="space-y-6">

      <h2 className="text-xl font-semibold text-center text-gray-800">
        هل أنت متأكد من الحذف؟
      </h2>

      <p className="text-center text-sm text-gray-500">
        سيتم الحذف 
      </p>

      <div className="flex justify-center gap-4">

        <button
          onClick={handleDelete}
          className="rounded-xl bg-red-600 px-6 py-3 text-white transition hover:bg-red-700 cursor-pointer"
        >
          نعم، حذف
        </button>

        <button
          onClick={onClose}
          className="rounded-xl bg-gray-300 px-6 py-3 text-gray-800 transition hover:bg-gray-400 cursor-pointer"
        >
          الخروج
        </button>

      </div>

    </div>
  );
}