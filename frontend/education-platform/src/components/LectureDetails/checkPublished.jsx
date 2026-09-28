export default function CheckPublish({ lecture, onClose, onConfirm }) {
  return (
    <div dir="rtl" className="space-y-6">

      <h2 className="text-xl font-semibold text-center text-gray-800">
        {lecture.isPublished
          ? "هل أنت متأكد من إلغاء تفعيل المحاضرة؟"
          : "هل أنت متأكد من تفعيل المحاضرة؟"}
      </h2>

      <p className="text-center text-sm text-gray-500">
        {lecture.isPublished
          ? "سيتم إلغاء تفعيل المحاضرة"
          : "سيتم تفعيل المحاضرة"}{" "}
        <span className="font-semibold text-gray-800">
          {lecture.title}
        </span>
      </p>

      <div className="flex justify-center gap-4">

        <button
          onClick={onConfirm}
          className={`rounded-xl px-6 py-3 text-white transition cursor-pointer ${
            lecture.isPublished
              ? "bg-red-600 hover:bg-red-700"
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {lecture.isPublished
            ? "نعم، إلغاء الإتاحة"
            : "نعم، إتاحة المحاضرة"}
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