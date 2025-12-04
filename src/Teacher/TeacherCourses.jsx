import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Eye, Calendar, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TeacherCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Lấy instructorId từ localStorage
  const instructorId = localStorage.getItem('id') || 12;

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/courses/user/${instructorId}`, {
        params: { role: 'instructor' }
      });
      
      setCourses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses([]);
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  // Tạo màu nền dựa trên courseId - giống với CourseCard
  const getBackgroundColor = (id) => {
    const colors = [
      'bg-gradient-to-br from-blue-400 to-blue-500',
      'bg-gradient-to-br from-green-400 to-green-500',
      'bg-gradient-to-br from-purple-400 to-purple-500',
      'bg-gradient-to-br from-orange-400 to-orange-500',
      'bg-gradient-to-br from-teal-400 to-teal-500',
      'bg-gradient-to-br from-red-400 to-red-500',
      'bg-gradient-to-br from-indigo-400 to-indigo-500',
      'bg-gradient-to-br from-pink-400 to-pink-500'
    ];
    return colors[id % colors.length];
  };

  // Lấy icon theo loại khóa học - giống với CourseCard
  const getCourseIcon = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('sql')) return '📊';
    if (lowerTitle.includes('java')) return '☕';
    if (lowerTitle.includes('python')) return '🐍';
    if (lowerTitle.includes('react') || lowerTitle.includes('javascript')) return '⚛️';
    if (lowerTitle.includes('html') || lowerTitle.includes('css')) return '🌐';
    if (lowerTitle.includes('c#')) return '🔷';
    return '📚';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Đang tải khóa học...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Khóa học của tôi</h1>
          <p className="text-gray-600">Quản lý các khóa học bạn đang giảng dạy</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm khóa học theo tiêu đề hoặc mô tả..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.courseId}
              className="bg-white rounded-xl shadow-lg font-bold border border-gray-300 hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1 cursor-pointer"
              onClick={() => navigate(`/teacher/course/${course.courseId}`)}
            >
              {/* Header với icon và màu nền - giống với CourseCard */}
              <div className={`${getBackgroundColor(course.courseId)} h-32 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    {getCourseIcon(course.title)}
                    <span>{course.category || 'Lập trình'}</span>
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg line-clamp-2 drop-shadow-md">
                    {course.title}
                  </h3>
                </div>
              </div>

              <div className="p-5">
                {/* Mô tả khóa học */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-12">
                  {course.description}
                </p>

                {/* Thông tin giảng viên và ngày */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users size={16} className="text-gray-400" />
                    <span className="font-bold">Giảng viên:</span>
                    <span>{course.instructorName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={16} className="text-gray-400" />
                    <span>Ngày xuất bản: {formatDate(course.publishedDate)}</span>
                  </div>
                </div>

                {/* Nút quản lý khóa học */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/teacher/course/${course.courseId}`);
                  }}
                  className="w-full bg-linear-to-r from-cyan-600 to-cyan-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Eye size={18} />
                  Quản lý khóa học
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchTerm ? 'Không tìm thấy khóa học' : 'Chưa có khóa học nào'}
            </h3>
            <p className="text-gray-600">
              {searchTerm ? 'Hãy thử thay đổi từ khóa tìm kiếm' : 'Bạn chưa tạo khóa học nào'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherCourses;