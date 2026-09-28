export default function CheckDeactivate({student,onClose,onConfirm,}) {
  return (
    <div dir="rtl" className="space-y-6">

      <h2 className="text-xl font-semibold text-center text-gray-800">
        {student.isActive?'هل أنت متأكد من إلغاء نشاط الحساب؟':'هل أنت متأكد من تفعيل الحساب؟'}
      </h2>

      <p className="text-center text-sm text-gray-500">
        {student.isActive?`سيتم إلغاء نشاط حساب الطالب${" "}`:`سيتم تفعيل نشاط حساب الطالب${" "}`}
        <span className="font-semibold text-gray-800">
          {student.name}
        </span>
      </p>

      <div className="flex justify-center gap-4">

        <button
          onClick={onConfirm}
          className="rounded-xl bg-red-600 px-6 py-3 text-white transition hover:bg-red-700"
        >
          {student.isActive?'نعم, الغاء النشاط' :'نعم ,تفعيل الحساب'}
        </button>

        <button
          onClick={onClose}
          className="rounded-xl bg-gray-300 px-6 py-3 text-gray-800 transition hover:bg-gray-400"
        >
          الخروج
        </button>

      </div>

    </div>
  );
}