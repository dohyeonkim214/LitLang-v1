import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface Question {
  id: number;
  passage: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  category: "Reading" | "Writing" | "Oral Communication" | "Media Literacy";
}

const questions: Question[] = [
  {
    id: 1,
    passage:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    questionText: "What is the main idea of the passage?",
    options: ["The desire for wealth", "The expectations of society", "The journey of love"],
    correctAnswer: "The expectations of society",
    category: "Reading",
  },
  {
    id: 2,
    passage: "To be, or not to be, that is the question.",
    questionText: "What is the speaker contemplating?",
    options: ["The meaning of existence", "The pursuit of happiness", "The essence of friendship"],
    correctAnswer: "The meaning of existence",
    category: "Oral Communication",
  },
  {
    id: 3,
    passage: "All that glitters is not gold.",
    questionText: "What does the passage imply?",
    options: ["Valuable things are always shiny", "Appearances can be deceiving", "Gold is the most precious metal"],
    correctAnswer: "Appearances can be deceiving",
    category: "Media Literacy",
  },
  {
    id: 4,
    passage: "The researcher hypothesized that bilingual children excel in cognitive tasks compared to monolinguals.",
    questionText: "Which skill is being evaluated?",
    options: ["Critical thinking", "Fluency in multiple languages", "Grammar proficiency"],
    correctAnswer: "Critical thinking",
    category: "Writing",
  },
  {
    id: 5,
    passage: "The advertisement used colorful visuals and catchy slogans to attract customers.",
    questionText: "Which media literacy concept does this demonstrate?",
    options: ["Target audience", "Visual impact", "Persuasion techniques"],
    correctAnswer: "Persuasion techniques",
    category: "Media Literacy",
  },
];

const Assessment: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [responses, setResponses] = useState<Record<number, string>>({});
  const navigate = useNavigate();

  const handleAnswerSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];

    // Save the response
    setResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: selectedAnswer!,
    }));

    setSelectedAnswer(null);
    setProgress(((currentQuestionIndex + 1) / questions.length) * 100);

    // Check if it's the last question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Save responses to cookies and navigate to results
      Cookies.set("assessmentResponses", JSON.stringify(responses));
      navigate("/results");
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-[100dvh] p-4 bg-gradient-to-b from-green-50 to-green-100 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Assessment</h1>

      {/* Progress Bar */}
      <div className="w-full max-w-lg bg-gray-300 h-2 rounded mb-6">
        <div className="bg-green-500 h-2 rounded" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Passage */}
      <div className="p-4 bg-white rounded shadow-lg max-w-md mb-4">
        <p className="text-sm italic text-gray-600 mb-2">"{currentQuestion.passage}"</p>
      </div>

      {/* Question */}
      <p className="text-lg mb-4">{currentQuestion.questionText}</p>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedAnswer(option)}
            className={`w-full p-2 rounded-lg border ${
              selectedAnswer === option ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleAnswerSubmit}
        disabled={!selectedAnswer}
        className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-400"
      >
        Submit Answer
      </button>
    </div>
  );
};

export default Assessment;