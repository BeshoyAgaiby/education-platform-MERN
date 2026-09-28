export default function CheckExamPublished({ exam, onClose, onConfirm }) {
  return (
    <div dir="rtl" className="space-y-6">

      <h2 className="text-xl font-semibold text-center text-gray-800">
        {exam.isPublished
          ? "هل أنت متأكد من إلغاء إتاحة الامتحان؟"
          : "هل أنت متأكد من إتاحة الامتحان؟"}
      </h2>

      <p className="text-center text-sm text-gray-500">
        {exam.isPublished
          ? "سيتم إلغاء إتاحة الامتحان"
          : "سيتم إتاحة الامتحان"}{" "}

        <span className="font-semibold text-gray-800">
          {exam.title}
        </span>
      </p>

      <div className="flex justify-center gap-4">

        <button
          onClick={onConfirm}
          className={`rounded-xl px-6 py-3 text-white transition cursor-pointer ${
            exam.isPublished
              ? "bg-red-600 hover:bg-red-700"
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {exam.isPublished
            ? "نعم، إلغاء الإتاحة"
            : "نعم، إتاحة الامتحان"}
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