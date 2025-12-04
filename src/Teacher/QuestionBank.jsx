import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, ArrowLeft, Search } from 'lucide-react';
import axios from 'axios';

const QuestionBank = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const instructorId = localStorage.getItem('id') || 1;

  useEffect(() => {
    fetchQuestions();
  }, [courseId]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/questions`, {
        params: { 
          courseId: courseId, 
          instructorId: instructorId 
        }
      });
      setQuestions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setQuestions([]);
      setLoading(false);
    }
  };

  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setShowAddModal(true);
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setShowAddModal(true);
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')) return;

    try {
      await axios.delete(`http://localhost:8080/api/questions/${questionId}?instructorId=${instructorId}`);
      setQuestions(questions.filter(q => q.questionId !== questionId));
      alert('Xóa câu hỏi thành công!');
    } catch (error) {
      console.error('Error deleting question:', error);
      alert('Có lỗi xảy ra khi xóa câu hỏi!');
    }
  };

  const filteredQuestions = questions.filter(q =>
    q.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Đang tải...</div>
      </div>
    );
  }

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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ngân hàng câu hỏi</h1>
            <p className="text-gray-600">
              Quản lý các câu hỏi cho khóa học: <span className="font-semibold">{questions[0]?.courseTitle || 'Khóa học'}</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Tổng số: {questions.length} câu hỏi
            </p>
          </div>
          <button
            onClick={handleAddQuestion}
            className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Thêm câu hỏi
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
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

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((question, index) => (
            <div
              key={question.questionId}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-cyan-100 text-cyan-800 text-xs font-medium px-2 py-1 rounded">
                      Câu {index + 1}
                    </span>
                    <span className="text-xs text-gray-500">ID: {question.questionId}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{question.content}</h3>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditQuestion(question)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Chỉnh sửa"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(question.questionId)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Xóa"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2">
                {question.options.map((option, optIndex) => (
                  <div
                    key={option.optionId}
                    className={`p-3 rounded-lg border ${
                      option.correct
                        ? 'bg-green-50 border-green-300'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 flex items-center justify-center rounded text-sm font-medium ${
                        option.correct 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {String.fromCharCode(65 + optIndex)}
                      </span>
                      {option.correct && (
                        <span className="text-green-600 font-bold text-sm">✓ Đúng</span>
                      )}
                      <span className={option.correct ? 'font-medium text-green-900' : 'text-gray-700'}>
                        {option.content}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <div className="text-gray-400 text-6xl mb-4">❓</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchTerm ? 'Không tìm thấy câu hỏi' : 'Chưa có câu hỏi nào'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Hãy thử thay đổi từ khóa tìm kiếm' : 'Hãy thêm câu hỏi đầu tiên cho khóa học'}
            </p>
            <button
              onClick={handleAddQuestion}
              className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors inline-flex items-center gap-2"
            >
              <Plus size={20} />
              Thêm câu hỏi
            </button>
          </div>
        )}

        {/* Add/Edit Question Modal */}
        {showAddModal && (
          <QuestionModal
            question={editingQuestion}
            courseId={courseId}
            instructorId={instructorId}
            onClose={() => setShowAddModal(false)}
            onSave={() => {
              fetchQuestions();
              setShowAddModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

// Question Modal Component
const QuestionModal = ({ question, courseId, instructorId, onClose, onSave }) => {
  const [content, setContent] = useState(question?.content || '');
  const [options, setOptions] = useState(
    question?.options || [
      { content: '', correct: false },
      { content: '', correct: false },
      { content: '', correct: false },
      { content: '', correct: false }
    ]
  );

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    if (field === 'correct') {
      // Chỉ cho phép 1 đáp án đúng
      newOptions.forEach((opt, i) => {
        opt.correct = i === index;
      });
    } else {
      newOptions[index][field] = value;
    }
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!content.trim()) {
      alert('Vui lòng nhập nội dung câu hỏi!');
      return;
    }

    const hasCorrectAnswer = options.some(opt => opt.correct);
    if (!hasCorrectAnswer) {
      alert('Vui lòng chọn đáp án đúng!');
      return;
    }

    const allOptionsFilled = options.every(opt => opt.content.trim());
    if (!allOptionsFilled) {
      alert('Vui lòng điền đầy đủ các đáp án!');
      return;
    }

    try {
      if (question) {
        // Update question content
        await axios.put(`http://localhost:8080/api/questions/${question.questionId}`, {
          instructorId,
          content
        });

        // Update options - cần implement API cho từng option
        // Tạm thời chỉ update content, giữ nguyên options structure
        alert('Cập nhật câu hỏi thành công!');
      } else {
        // Create new question
        const response = await axios.post('http://localhost:8080/api/questions', {
          instructorId,
          courseId: parseInt(courseId),
          content,
          options: options.map(opt => ({
            content: opt.content,
            correct: opt.correct
          }))
        });
        alert('Thêm câu hỏi thành công!');
      }
      onSave();
    } catch (error) {
      console.error('Error saving question:', error);
      alert('Có lỗi xảy ra khi lưu câu hỏi!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {question ? 'Chỉnh sửa câu hỏi' : 'Thêm câu hỏi mới'}
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Question Content */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nội dung câu hỏi *
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Nhập nội dung câu hỏi..."
              />
            </div>

            {/* Options */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Các đáp án *
              </label>
              <div className="space-y-3">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={option.correct}
                      onChange={() => handleOptionChange(index, 'correct', true)}
                      className="w-4 h-4 text-cyan-600"
                    />
                    <div className="flex-1 flex items-center gap-2">
                      <span className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded text-sm font-medium">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <input
                        type="text"
                        value={option.content}
                        onChange={(e) => handleOptionChange(index, 'content', e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder={`Nhập đáp án ${String.fromCharCode(65 + index)}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                * Chọn radio button để đánh dấu đáp án đúng
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
              >
                {question ? 'Cập nhật' : 'Thêm'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuestionBank;