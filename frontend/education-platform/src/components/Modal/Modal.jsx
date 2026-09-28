import { FaXmark } from "react-icons/fa6";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl rounded-xl bg-white shadow-xl p-6">

       
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition cursor-pointer"
        >
          <FaXmark className="text-black text-2xl cursor-pointer" />
        </button>
          <div className="max-h-[90vh] overflow-y-auto p-5 sm:p-6">
           {children}
          </div>
        
      </div>
    </div>
  );
}
