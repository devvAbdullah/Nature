import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { QuizProvider } from "./context/QuizContext";
import StartForm from "./components/Form";
import StartScreen from "./components/start";

const App = () => {
  return (
    <QuizProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/form" element={<StartForm />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </QuizProvider>
  );
};

export default App;
