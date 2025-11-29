import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, Search, CheckCircle } from 'lucide-react';
import axios from 'axios';

const CreateTest = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Test Info
  const [testInfo, setTestInfo] = useState({
    title: '',
    description: '',
    timeLimit: 60,
    passScore: 70,
    weight: 0.5
  });

  // Question Bank
  const [allQuestions, setAllQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [showQuestionBank, setShowQuestionBank] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // TODO: Lấy instructorId từ session/login
  const instructorId = 1;

  useEffect(() => {
    fetchQuestions();
  }, [courseId]);

  const fetchQuestions = async () => {
    try {
      // API: GET /api/questions?courseId={courseId}&instructorId={instructorId}
      // Response: QuestionDTO[] - xem QuestionBank.jsx
      const response = await axios.get(`http://localhost:8080/api/questions?courseId=${courseId}&instructorId=${instructorId}`);
      setAllQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
      // Fallback mock data
      setAllQuestions([
        {
          questionId: 1,
          content: "Spring Boot là gì?",
          courseId: parseInt(courseId),
          instructorId: instructorId,
          options: [
            { optionId: 1, content: "Một framework Java", isCorrect: true },
            { optionId: 2, content: "Một ngôn ngữ lập trình", isCorrect: false },
            { optionId: 3, content: "Một database", isCorrect: false },
            { optionId: 4, content: "Một IDE", isCorrect: false }
          ]
        },
        {
          questionId: 2,
          content: "Annotation nào dùng để đánh dấu REST Controller?",
          courseId: parseInt(courseId),
          instructorId: instructorId,
          options: [
            { optionId: 5, content: "@Controller", isCorrect: false },
            { optionId: 6, content: "@RestController", isCorrect: true },
            { optionId: 7, content: "@Component", isCorrect: false },
            { optionId: 8, content: "@Service", isCorrect: false }
          ]
        },
        {
          questionId: 3,
          content: "JPA là viết tắt của gì?",
          courseId: parseInt(courseId),
          instructorId: instructorId,
          options: [
            { optionId: 9, content: "Java Persistence API", isCorrect: true },
            { optionId: 10, content: "Java Programming API", isCorrect: false },
            { optionId: 11, content: "Java Platform API", isCorrect: false },
            { optionId: 12, content: "Java Protocol API", isCorrect: false }
          ]
        }
      ]);
    }
  };

  const handleInputChange = (field, value) => {
    setTestInfo({ ...testInfo, [field]: value });
  };

  const handleAddQuestion = (question) => {
    if (!selectedQuestions.find(q => q.questionId === question.questionId)) {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  const handleRemoveQuestion = (questionId) => {
    setSelectedQuestions(selectedQuestions.filter(q => q.questionId !== questionId));
  };

  const handleCreateTest = async (e) => {
    e.preventDefault();

    // Validation
    if (!testInfo.title.trim()) {
      alert('Vui lòng nhập tiêu đề bài test!');
      return;
    }

    if (selectedQuestions.length === 0) {
      alert('Vui lòng chọn ít nhất 1 câu hỏi!');
      return;
    }

    setLoading(true);
    try {
      // Step 1: Tạo test
      // API: POST /api/tests
      // Body: CreateTestRequest
      // {
      //   courseId: number,
      //   title: string,
      //   description: string,
      //   timeLimit: number,
      //   passScore: number,
      //   weight: number (double)
      // }
      // Response: { message: "Test created successfully", testId: number }
      const testResponse = await axios.post('http://localhost:8080/api/tests', {
        courseId: parseInt(courseId),
        title: testInfo.title,
        description: testInfo.description,
        timeLimit: testInfo.timeLimit,
        passScore: testInfo.passScore,
        weight: testInfo.weight
      });

      const testId = testResponse.data.testId;

      // Step 2: Thêm câu hỏi vào test
      // API: POST /api/tests/{testId}/questions
      // Body: AddTestQuestionRequest
      // {
      //   courseId: number,
      //   questionId: number,
      //   instructorId: number
      // }
      // Response: { message: "Question added to test successfully" }
      for (const question of selectedQuestions) {
        await axios.post(`http://localhost:8080/api/tests/${testId}/questions`, {
          courseId: parseInt(courseId),
          questionId: question.questionId,
          instructorId
        });
      }

      alert('Tạo bài test thành công!');
      navigate(`/teacher/course/${courseId}`);
    } catch (error) {
      console.error('Error creating test:', error);
      alert('Có lỗi xảy ra khi tạo bài test!');
    } finally {
      setLoading(false);
    }
  };

  const filteredQuestions = allQuestions.filter(q =>
    q.content.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedQuestions.find(sq => sq.questionId === q.questionId)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(`/teacher/course/${courseId}`)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} />
          Quay lại chi tiết khóa học
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tạo bài test mới</h1>
          <p className="text-gray-600">Điền thông tin và chọn câu hỏi cho bài test</p>
        </div>

        <form onSubmit={handleCreateTest}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Test Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin cơ bản</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiêu đề bài test *
                    </label>
                    <input
                      type="text"
                      value={testInfo.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="Ví dụ: Kiểm tra giữa kỳ Python"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mô tả
                    </label>
                    <textarea
                      value={testInfo.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="Mô tả ngắn về bài test..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Thời gian (phút)
                      </label>
                      <input
                        type="number"
                        value={testInfo.timeLimit}
                        onChange={(e) => handleInputChange('timeLimit', parseInt(e.target.value))}
                        min="1"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Điểm đạt (%)
                      </label>
                      <input
                        type="number"
                        value={testInfo.passScore}
                        onChange={(e) => handleInputChange('passScore', parseInt(e.target.value))}
                        min="0"
                        max="100"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Trọng số
                      </label>
                      <input
                        type="number"
                        value={testInfo.weight}
                        onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
                        step="0.1"
                        min="0"
                        max="1"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Questions */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    Câu hỏi đã chọn ({selectedQuestions.length})
                  </h2>
                  <button
                    type="button"
                    onClick={() => setShowQuestionBank(true)}
                    className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2"
                  >
                    <Plus size={18} />
                    Thêm câu hỏi
                  </button>
                </div>

                {selectedQuestions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>Chưa có câu hỏi nào được chọn</p>
                    <p className="text-sm mt-2">Nhấn "Thêm câu hỏi" để chọn từ ngân hàng câu hỏi</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedQuestions.map((question, index) => (
                      <div
                        key={question.questionId}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-cyan-100 text-cyan-800 text-xs font-medium px-2 py-1 rounded">
                                Câu {index + 1}
                              </span>
                            </div>
                            <p className="text-gray-900 font-medium">{question.content}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveQuestion(question.questionId)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Actions */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
                <h3 className="font-bold text-gray-900 mb-4">Thông tin bài test</h3>
                
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số câu hỏi:</span>
                    <span className="font-medium">{selectedQuestions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thời gian:</span>
                    <span className="font-medium">{testInfo.timeLimit} phút</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Điểm đạt:</span>
                    <span className="font-medium">{testInfo.passScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trọng số:</span>
                    <span className="font-medium">{testInfo.weight}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || selectedQuestions.length === 0}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
                >
                  {loading ? 'Đang tạo...' : 'Tạo bài test'}
                </button>

                <button
                  type="button"
                  onClick={() => navigate(`/teacher/course/${courseId}`)}
                  className="w-full mt-3 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Question Bank Modal */}
        {showQuestionBank && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Ngân hàng câu hỏi</h2>
                  <button
                    onClick={() => setShowQuestionBank(false)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Tìm kiếm câu hỏi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {filteredQuestions.map((question) => (
                    <div
                      key={question.questionId}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <p className="text-gray-900 font-medium flex-1">{question.content}</p>
                        <button
                          onClick={() => handleAddQuestion(question)}
                          className="ml-4 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2"
                        >
                          <CheckCircle size={16} />
                          Chọn
                        </button>
                      </div>
                      
                      <div className="space-y-1">
                        {question.options.map((option) => (
                          <div
                            key={option.optionId}
                            className={`text-sm p-2 rounded ${
                              option.isCorrect ? 'bg-green-50 text-green-900' : 'text-gray-600'
                            }`}
                          >
                            {option.isCorrect && '✓ '}{option.content}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {filteredQuestions.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>Không tìm thấy câu hỏi nào</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTest;
