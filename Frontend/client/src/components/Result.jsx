import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../context/QuizContext";
import CertificateQR from "./CertificateQR";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const { userData, score, setUserData, setScore } = useContext(QuizContext);
  const [downloadURL, setDownloadURL] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.name || score === null) {
      navigate("/");
      return;
    }

    const generatePDF = async () => {
      try {
        const res = await axios.post("http://localhost:5000/generate-pdf", {
          name: userData.name,
          school: userData.school,
          score
        });
        setDownloadURL(res.data.downloadURL); // Set the download URL from backend response
      } catch (err) {
        console.error("Failed to generate certificate", err);
      }
    };

    generatePDF();
  }, [userData, score, navigate]);

  const resetApp = () => {
    setUserData({}); // Reset user data
    setScore(0); // Reset score
    navigate("/"); // Navigate back to the start
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-100 p-6 space-y-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold text-green-700">🎉 Quiz Complete!</h1>
        <p className="text-lg">Great job, <strong>{userData.name}</strong>!</p>
        <p>Your Score: <span className="font-semibold">{score} / 5</span></p>
        
        {/* Render QR code and download button only if downloadURL is available */}
        {downloadURL && (
          <>
            <CertificateQR downloadURL={downloadURL} />
           
          </>
        )}
        
        <button onClick={resetApp} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Result;
