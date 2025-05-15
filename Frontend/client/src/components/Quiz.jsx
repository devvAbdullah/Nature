import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../context/QuizContext";
import allQuestions from "../data/questions.json";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const { userData, setScore, score } = useContext(QuizContext);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = allQuestions.filter(q => q.ageGroup === userData.ageGroup);
    const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, 5);
    setQuiz(shuffled);
  }, [userData]);

  const handleAnswer = (option) => {
    setSelected(option);
    if (option === quiz[current].answer) setScore(prev => prev + 1);
    setTimeout(() => {
      if (current + 1 < quiz.length) {
        setCurrent(prev => prev + 1);
        setSelected(null);
      } else {
        navigate("/result");
      }
    }, 1000);
  };

  if (!quiz.length) return <p className="p-4">Loading questions...</p>;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-yellow-100 p-6">
      <motion.div
        key={current}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-xl p-6 rounded-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-lg font-semibold">Q{current + 1}: {quiz[current].question}</h2>
        <div className="grid grid-cols-1 gap-2">
          {quiz[current].options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(opt)}
              className={`p-2 rounded border ${selected === opt
                ? opt === quiz[current].answer
                  ? "bg-green-300"
                  : "bg-red-300"
                : "hover:bg-blue-100"
              }`}
              disabled={!!selected}
            >
              {opt}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500">Score: {score}</p>
      </motion.div>
    </div>
  );
};

export default Quiz;
