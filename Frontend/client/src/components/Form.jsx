import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../context/QuizContext';
import backImage from '../assets/back1.png';
const QuizForm = () => {
  const navigate = useNavigate();
  const { setUserData, setScore } = useContext(QuizContext);

  const [formData, setFormData] = useState({
    name: '',
    school: '',
    studentClass: '',
    phone: '',
    ageGroup: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, school, studentClass, phone, ageGroup } = formData;

    if (!name.trim() || !school.trim() || !studentClass.trim() || !phone.trim() || !ageGroup.trim()) {
      alert('Please fill in all the fields.');
      return;
    }

    setUserData(formData);   // Save to context
    setScore(0);             // Reset quiz score
    navigate('/quiz');       // Go to quiz
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backImage})` }}
    >
      <div className="bg-white/20 backdrop-blur-md shadow-lg p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4 text-white">
          Start Nature Quiz
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="px-3 py-2 rounded border border-gray-300 focus:outline-none"
          />
          <input
            type="text"
            name="school"
            placeholder="Your School"
            value={formData.school}
            onChange={handleChange}
            required
            className="px-3 py-2 rounded border border-gray-300 focus:outline-none"
          />
          <input
            type="text"
            name="studentClass"
            placeholder="Your Class"
            value={formData.studentClass}
            onChange={handleChange}
            required
            className="px-3 py-2 rounded border border-gray-300 focus:outline-none"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your 11-digit Phone Number"
            pattern="[0-9]{11}"
            title="Phone number must be exactly 11 digits"
            value={formData.phone}
            onChange={handleChange}
            required
            className="px-3 py-2 rounded border border-gray-300 focus:outline-none"
          />
          <select
            name="ageGroup"
            value={formData.ageGroup}
            onChange={handleChange}
            required
            className="px-3 py-2 rounded border border-gray-300 focus:outline-none"
          >
            <option value="">Select Age Group</option>
            <option value="6-8">Age 6-8</option>
            <option value="9-11">Age 9-11</option>
            <option value="12-14">Age 12-14</option>
          </select>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
          >
            Start Quiz
          </button>
        </form>
      </div>
    </div>

    
  );
};

export default QuizForm;
