import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const TakeTest = () => {
  const { id, testId } = useParams();
  const navigate = useNavigate();
  
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [testFinished, setTestFinished] = useState(false);
  const [score, setScore] = useState(null);

  const studentId = localStorage.getItem('id'); // Lấy từ localStorage

  useEffect(() => {
    if (testId) {
      fetchTestDetails();
    }
  }, [testId]);

  const fetchTestDetails = async () => {
    try {
      // Lấy thông tin test
      const testResponse = await axios.get(`http://localhost:8080/api/tests/${testId}`);
      setTest(testResponse.data);
      setTimeLeft(testResponse.data.timeLimit * 60); // Chuyển đổi sang giây

      // Lấy danh sách question IDs từ test
      const questionsResponse = await axios.get(`http://localhost:8080/api/tests/${testId}/questions`);
      const questionIds = questionsResponse.data;

      // Lấy chi tiết từng câu hỏi
      const questionsData = [];
      for (const questionId of questionIds) {
        const questionDetail = await axios.get(`http://localhost:8080/api/questions/${questionId}`);
        questionsData.push(questionDetail.data);
      }
      
      setQuestions(questionsData);
    } catch (error) {
      console.error('Error fetching test details:', error);
      alert('Có lỗi xảy ra khi tải bài test!');
    }
  };

  // Timer countdown
  useEffect(() => {
    if (!testStarted || timeLeft <= 0 || testFinished) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, timeLeft, testFinished]);

  const startTest = () => {
    setTestStarted(true);
  };

  const handleAnswerSelect = (questionId, optionId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    
    questions.forEach(question => {
      const selectedOptionId = answers[question.questionId];
      if (selectedOptionId) {
        const selectedOption = question.options.find(opt => opt.optionId === selectedOptionId);
        if (selectedOption && selectedOption.correct) {
          correctAnswers++;
        }
      }
    });

    return (correctAnswers / questions.length) * 100;
  };

  const handleAutoSubmit = async () => {
    if (testFinished) return;
    
    const finalScore = calculateScore();
    await submitTest(finalScore);
  };

  const handleSubmitTest = async () => {
    if (!confirm('Bạn có chắc chắn muốn nộp bài?')) return;
    
    const finalScore = calculateScore();
    await submitTest(finalScore);
  };

  const submitTest = async (finalScore) => {
    setIsSubmitting(true);
    try {
      // Gửi điểm lên server
      await axios.post(`http://localhost:8080/api/tests/${testId}/take`, {
        studentId: parseInt(studentId),
        courseId: parseInt(id),
        grade: finalScore
      });

      setScore(finalScore);
      setTestFinished(true);
    } catch (error) {
      console.error('Error submitting test:', error);
      alert('Có lỗi xảy ra khi nộp bài!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!test) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">⏳</div>
          <p className="text-gray-600">Đang tải bài test...</p>
        </div>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <button
            onClick={() => navigate(`/student/courseParam/${id}`)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft size={20} />
            Quay lại khóa học
          </button>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{test.title}</h1>
            
            {test.description && (
              <p className="text-gray-600 mb-6">{test.description}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-4">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Thời gian</p>
                <p className="font-semibold text-gray-900">{test.timeLimit} phút</p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Số câu hỏi</p>
                <p className="font-semibold text-gray-900">{questions.length} câu</p>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-4">
                <AlertCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Điểm đạt</p>
                <p className="font-semibold text-gray-900">{test.passScore}%</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-yellow-800 mb-2">Hướng dẫn:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Bài test có thời gian giới hạn {test.timeLimit} phút</li>
                <li>• Chọn một đáp án đúng nhất cho mỗi câu hỏi</li>
                <li>• Bạn có thể chuyển đổi giữa các câu hỏi bằng nút điều hướng</li>
                <li>• Bài test sẽ tự động nộp khi hết thời gian</li>
                <li>• Điểm đạt: {test.passScore}%</li>
              </ul>
            </div>

            <button
              onClick={startTest}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold"
            >
              Bắt đầu làm bài
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (testFinished) {
    const passed = score >= test.passScore;
    
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
              passed ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {passed ? (
                <CheckCircle className="w-10 h-10 text-green-600" />
              ) : (
                <AlertCircle className="w-10 h-10 text-red-600" />
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {passed ? 'Chúc mừng!' : 'Rất tiếc!'}
            </h1>
            
            <p className="text-gray-600 mb-4">
              {passed 
                ? 'Bạn đã hoàn thành bài test với kết quả tốt!' 
                : 'Bạn cần cố gắng thêm để đạt yêu cầu!'}
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 inline-block">
              <div className="text-4xl font-bold text-gray-900 mb-1">{score.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Điểm số của bạn</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {Object.keys(answers).length}/{questions.length}
                </div>
                <div className="text-sm text-gray-600">Số câu đã làm</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {test.passScore}%
                </div>
                <div className="text-sm text-gray-600">Điểm yêu cầu</div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate(`/student/courseParam/${id}`)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Quay lại khóa học
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header với timer */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{test.title}</h1>
              <p className="text-sm text-gray-600">
                Câu {currentQuestionIndex + 1} / {questions.length}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                timeLeft < 300 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
              }`}>
                <Clock size={20} />
                <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
              </div>
              
              <button
                onClick={handleSubmitTest}
                disabled={isSubmitting}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300"
              >
                {isSubmitting ? 'Đang nộp...' : 'Nộp bài'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-6">
              <h3 className="font-semibold text-gray-900 mb-3">Danh sách câu hỏi</h3>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((question, index) => (
                  <button
                    key={question.questionId}
                    onClick={() => goToQuestion(index)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium ${
                      index === currentQuestionIndex
                        ? 'bg-blue-600 text-white'
                        : answers[question.questionId]
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-gray-100 text-gray-700 border border-gray-300'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                  <span>Đã làm</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded"></div>
                  <span>Chưa làm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Question Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
                  Câu {currentQuestionIndex + 1}
                </span>
              </div>

              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                {currentQuestion.content}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={option.optionId}
                    onClick={() => handleAnswerSelect(currentQuestion.questionId, option.optionId)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      answers[currentQuestion.questionId] === option.optionId
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-300 hover:bg-blue-25'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 flex items-center justify-center rounded border ${
                        answers[currentQuestion.questionId] === option.optionId
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-white border-gray-400'
                      }`}>
                        {answers[currentQuestion.questionId] === option.optionId && '✓'}
                      </div>
                      <span className="font-medium text-gray-900">
                        {String.fromCharCode(65 + index)}. {option.content}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={goToPreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Câu trước
                </button>
                
                <button
                  onClick={goToNextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Câu tiếp theo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeTest;