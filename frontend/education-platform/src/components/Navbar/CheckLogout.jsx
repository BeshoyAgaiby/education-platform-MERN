export default function CheckLogout({ onClose, onConfirm }) {
  return (
    <div dir="rtl" className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800">
          تسجيل الخروج
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          هل أنت متأكد أنك تريد تسجيل الخروج؟
        </p>
      </div>

      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="rounded-xl bg-red-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-red-700 cursor-pointer"
        >
          نعم، تسجيل الخروج
        </button>

        <button
          type="button"
          onClick={onClose}
          className="rounded-xl bg-gray-100 px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-200 cursor-pointer"
        >
          إلغاء
        </button>
      </div>
    </div>
  );
}