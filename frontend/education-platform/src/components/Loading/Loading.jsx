import { FaSpinner } from "react-icons/fa6";

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <FaSpinner className="text-5xl text-orange-500 animate-spin" />

        <p className="text-gray-600 text-sm font-medium">
          Loading...
        </p>
      </div>
    </div>
  );
}
export default Loading;