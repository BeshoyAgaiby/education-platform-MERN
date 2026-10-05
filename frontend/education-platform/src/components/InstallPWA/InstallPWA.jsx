import { useEffect, useState } from "react";

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      // نمنع Chrome من إظهار نافذة التثبيت تلقائيًا
      event.preventDefault();
      // نحفظ الـ event لاستخدامه لما المستخدم يضغط على زر التثبيت
      setDeferredPrompt(event);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;
    // إظهار نافذة التثبيت الرسمية
    deferredPrompt.prompt();
    // معرفة اختيار المستخدم
    const { outcome } = await deferredPrompt.userChoice;
    console.log("Install result:", outcome);
    // بعد استخدام الـ prompt مش هنحتاجه تاني
    setDeferredPrompt(null);
  };

  // لو الـ PWA مش جاهز للتثبيت، مش نظهر أي حاجة
  if (!deferredPrompt) {
    return null;
  }

  return (
    <button
      onClick={installApp}
      className="fixed bottom-5 right-5 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg"
    >
      📱 تثبيت التطبيق
    </button>
  );
}