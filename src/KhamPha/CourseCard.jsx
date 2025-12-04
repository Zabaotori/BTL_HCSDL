import React, { useState } from 'react';
import axios from 'axios';
import { 
  Calendar, 
  Users, 
  BookOpen, 
  Clock, 
  CheckCircle,
  Loader2,
  Star
} from 'lucide-react';

const CourseCard = ({ course, studentId, onEnrollmentChange }) => {
  const [loading, setLoading] = useState(false);

  const isEnrolled = course.enrolled;

  const handleEnroll = async () => {
    if (!studentId) {
      alert('Vui lòng đăng nhập để đăng ký khoá học');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:8080/student/enroll', {
        courseId: course.courseId,
        studentId: studentId,
        rating: null,
        comment: "Đăng ký khoá học",
        date: new Date().toISOString().split('T')[0]
      });

      if (onEnrollmentChange) {
        onEnrollmentChange();
      }
      alert('Đăng ký khoá học thành công!');
    } catch (err) {
      console.log('Error enrolling:', err);
      alert('Không đủ điều kiện môn tiên quyết');
    } finally {
      setLoading(false);
    }
  };

  // Tạo màu nền dựa trên courseId
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

  // Lấy icon theo loại khóa học
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

  return (
    <div className="bg-white rounded-xl shadow-lg font-bold border border-gray-300 hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1">
      {/* Header với icon và màu nền */}
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
            <span>Ngày xuất bản: {course.publishedDate}</span>
          </div>
        </div>

        {/* Nút đăng ký */}
        {isEnrolled ? (
          <button
            className="w-full bg-green-100 text-green-800 border-2 border-green-200 py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-100 transition-colors"
            disabled
          >
            <CheckCircle size={18} />
            Đã đăng ký
          </button>
        ) : (
          <button
            onClick={handleEnroll}
            disabled={loading}
            className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Đang xử lý...
              </>
            ) : (
              <>
                <BookOpen size={18} />
                Đăng ký khoá học
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;