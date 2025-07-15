import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "./SignupForm.tsx";

const SignupModalForm = () => {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);

  // Закрытие по ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") navigate(-1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  // Закрытие по клику вне формы
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      navigate(-1);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-lg max-w-4xl w-full p-6 relative animate-fade-in"
      >
        {/* Кнопка закрытия */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-black transition text-xl"
          onClick={() => navigate(-1)}
        >
          ✕
        </button>

        {/* Вставка формы */}
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupModalForm;
