import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  BookOpen, 
  PlayCircle, 
  FileQuestion, 
  Users, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  ClipboardList,
  Edit,
  Trash2,
  Award
} from 'lucide-react';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    fetchCourseDetail();
    fetchTests();
  }, [courseId]);

  const fetchCourseDetail = async () => {
    try {
      setLoading(true);
      // TODO: Backend cần implement API này
      const response = await axios.get(`http://localhost:8080/api/courses/${courseId}/details`);
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course detail:', error);
      // Mock data khi API chưa có
      setCourse({
        id: courseId,
        title: 'Khóa học lập trình Web',
        description: 'Khóa học toàn diện về phát triển web từ cơ bản đến nâng cao',
        thumbnail: 'https://via.placeholder.com/800x400',
        enrollmentCount: 150,
        lessonCount: 45,
        duration: '12 tuần',
        sections: [
          {
            id: 1,
            title: 'Chương 1: Giới thiệu HTML/CSS',
            orderIndex: 1,
            lessons: [
              { id: 1, title: 'Bài 1: HTML cơ bản', duration: '15:30', type: 'video' },
              { id: 2, title: 'Bài 2: CSS cơ bản', duration: '20:00', type: 'video' },
              { id: 3, title: 'Quiz: Kiểm tra kiến thức HTML/CSS', type: 'quiz', questionCount: 10 }
            ]
          },
          {
            id: 2,
            title: 'Chương 2: JavaScript cơ bản',
            orderIndex: 2,
            lessons: [
              { id: 4, title: 'Bài 1: Biến và kiểu dữ liệu', duration: '18:45', type: 'video' },
              { id: 5, title: 'Bài 2: Hàm và vòng lặp', duration: '22:30', type: 'video' },
              { id: 6, title: 'Quiz: JavaScript căn bản', type: 'quiz', questionCount: 15 }
            ]
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTests = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/tests`, {
        params: { courseId }
      });
      setTests(response.data);
    } catch (error) {
      console.error('Error fetching tests:', error);
      // Mock data fallback
      setTests([
        {
          id: 1,
          title: 'Kiểm tra giữa kỳ',
          description: 'Bài kiểm tra toàn bộ kiến thức từ chương 1-3',
          timeLimit: 60,
          passScore: 70,
          weight: 30,
          questionCount: 30
        },
        {
          id: 2,
          title: 'Kiểm tra cuối kỳ',
          description: 'Bài kiểm tra tổng hợp toàn bộ khóa học',
          timeLimit: 90,
          passScore: 65,
          weight: 40,
          questionCount: 50
        }
      ]);
    }
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleDeleteTest = async (testId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bài test này?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/tests/${testId}`, {
        params: { courseId }
      });
      setTests(tests.filter(test => test.id !== testId));
      alert('Xóa bài test thành công!');
    } catch (error) {
      console.error('Error deleting test:', error);
      alert('Có lỗi xảy ra khi xóa bài test!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Đang tải...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Không tìm thấy khóa học</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Course Info */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate('/teacher')}
            className="mb-4 text-white/80 hover:text-white flex items-center gap-2"
          >
            ← Quay lại danh sách khóa học
          </button>
          
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full md:w-64 h-40 object-cover rounded-lg shadow-lg"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
              <p className="text-white/90 mb-4">{course.description}</p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{course.enrollmentCount} học viên</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.lessonCount} bài học</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate(`/teacher/course/${courseId}/questions`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <FileQuestion className="w-5 h-5" />
            Ngân hàng câu hỏi
          </button>
          <button
            onClick={() => navigate(`/teacher/course/${courseId}/create-test`)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <ClipboardList className="w-5 h-5" />
            Tạo bài test
          </button>
        </div>
      </div>

      {/* Main Content: Sections & Tests */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Sections & Lessons */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Nội dung khóa học</h2>
            
            {course.sections.map((section) => (
              <div key={section.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-800">{section.title}</span>
                    <span className="text-sm text-gray-500">
                      ({section.lessons.length} bài)
                    </span>
                  </div>
                  {expandedSections[section.id] ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>

                {expandedSections[section.id] && (
                  <div className="divide-y divide-gray-100">
                    {section.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="px-6 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            {lesson.type === 'video' ? (
                              <PlayCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <FileQuestion className="w-4 h-4 text-purple-600" />
                            )}
                            <span className="text-gray-700">{lesson.title}</span>
                          </div>
                          {lesson.type === 'video' && lesson.duration && (
                            <span className="text-sm text-gray-500">{lesson.duration}</span>
                          )}
                          {lesson.type === 'quiz' && lesson.questionCount && (
                            <span className="text-sm text-purple-600">
                              {lesson.questionCount} câu hỏi
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Column: Tests List (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Bài kiểm tra</h2>
                <span className="text-sm text-gray-500">
                  {tests.length} bài test
                </span>
              </div>

              {tests.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
                  <ClipboardList className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>Chưa có bài test nào</p>
                  <button
                    onClick={() => navigate(`/teacher/course/${courseId}/create-test`)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Tạo bài test đầu tiên
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {tests.map((test) => (
                    <div
                      key={test.id}
                      className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-800 flex-1">
                          {test.title}
                        </h3>
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/teacher/test/${test.id}/edit`)}
                            className="text-blue-600 hover:text-blue-700"
                            title="Chỉnh sửa"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTest(test.id)}
                            className="text-red-600 hover:text-red-700"
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      {test.description && (
                        <p className="text-sm text-gray-600 mb-3">
                          {test.description}
                        </p>
                      )}
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>Thời gian: {test.timeLimit} phút</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-gray-400" />
                          <span>Điểm đạt: {test.passScore}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileQuestion className="w-4 h-4 text-gray-400" />
                          <span>{test.questionCount} câu hỏi</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Trọng số: {test.weight}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
