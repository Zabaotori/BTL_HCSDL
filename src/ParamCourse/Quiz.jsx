import React, { useState } from 'react';
import { CheckCircle, Circle, ArrowLeft, ArrowRight } from 'lucide-react';

const Quiz = ({ lesson }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const question = lesson.questions[currentQuestion];
  const isLastQuestion = currentQuestion === lesson.questions.length - 1;

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion(prev => prev - 1);
  };

  const calculateScore = () => {
    let correct = 0;
    lesson.questions.forEach((q, index) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: lesson.questions.length,
      percentage: Math.round((correct / lesson.questions.length) * 100)
    };
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Kết quả Quiz</h2>
        
        <div className="text-center mb-8">
          <div className="text-4xl font-bold text-gray-900 mb-2">
            {score.percentage}%
          </div>
          <div className="text-lg text-gray-600">
            {score.correct} / {score.total} câu trả lời đúng
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {lesson.questions.map((q, index) => (
            <div key={q.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm ${
                  selectedAnswers[q.id] === q.correctAnswer 
                    ? 'bg-green-500' 
                    : 'bg-red-500'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 mb-2">{q.question}</div>
                  <div className="space-y-2">
                    {q.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`flex items-center gap-3 p-2 rounded ${
                          optIndex === q.correctAnswer
                            ? 'bg-green-50 border border-green-200'
                            : selectedAnswers[q.id] === optIndex
                            ? 'bg-red-50 border border-red-200'
                            : 'bg-gray-50'
                        }`}
                      >
                        {optIndex === q.correctAnswer ? (
                          <CheckCircle size={16} className="text-green-500 shrink-0" />
                        ) : (
                          <Circle size={16} className="text-gray-400 shrink-0" />
                        )}
                        <span className={
                          optIndex === q.correctAnswer 
                            ? 'text-green-700 font-medium'
                            : selectedAnswers[q.id] === optIndex
                            ? 'text-red-700'
                            : 'text-gray-700'
                        }>
                          {option}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setShowResults(false);
              setCurrentQuestion(0);
            }}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Làm lại Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Quiz: {lesson.title}</h2>
        <div className="text-sm text-gray-500">
          Câu {currentQuestion + 1} / {lesson.questions.length}
        </div>
      </div>

      <div className="mb-6">
        <div className="text-lg font-medium text-gray-900 mb-4">
          {question.question}
        </div>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedAnswers[question.id] === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleAnswerSelect(question.id, index)}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedAnswers[question.id] === index
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-300'
              }`}>
                {selectedAnswers[question.id] === index && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <span className="text-gray-700">{option}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-800"
        >
          <ArrowLeft size={16} />
          Câu trước
        </button>
        
        <button
          onClick={handleNext}
          disabled={selectedAnswers[question.id] === undefined}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLastQuestion ? 'Xem kết quả' : 'Câu tiếp theo'}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Quiz;