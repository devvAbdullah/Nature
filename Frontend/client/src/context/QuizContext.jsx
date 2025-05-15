import { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  return (
    <QuizContext.Provider value={{
      userData, setUserData,
      questions, setQuestions,
      score, setScore
    }}>
      {children}
    </QuizContext.Provider>
  );
};
