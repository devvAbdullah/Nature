import React from "react";
import { useNavigate } from "react-router-dom";
import back1 from "../assets/back1.png"; // ✅ adjust the path if needed

const StartScreen = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate("/form"); // ✅ change route if your form path is different
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${back1})`,
        backgroundAttachment: "fixed",
      }}
    >
      <div className="text-center bg-white/20 p-8 rounded-2xl backdrop-blur-md">
        <h1 className="text-3xl font-bold text-white mb-6">
          Welcome to the Mother Nature Quiz
        </h1>
        <button
          onClick={startQuiz}
          className="px-8 py-4 text-xl font-bold text-white bg-[#ff6b6b] rounded-xl shadow-lg transition-transform hover:scale-110 hover:shadow-2xl"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
