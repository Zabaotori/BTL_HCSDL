import React, { useState } from 'react';
import { Play, Star, MoreVertical, BookOpen, Users, Calendar, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const MyCourseCard = ({ course, studentId }) => {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRateCourse = async () => {
    if (rating === 0) return;

    setIsSubmitting(true);
    try {
      let res = await axios({
        url: `http://localhost:8080/student/review-course`,
        method: "PUT",
        data: {
          courseId: course.courseId,
          studentId: studentId,
          rating: rating,
          comment: comment || "Không có comment"
        }
      })
      console.log("Đánh giá thành công");

      setShowRatingModal(false);
      window.location.reload();
    } catch (err) {
      console.log('Error rating course:', err);
    } finally {
      setIsSubmitting(false);
    }
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

  return (
    <div className="bg-white rounded-xl shadow-lg font-bold border border-gray-300 hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1">
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

        {/* Thông tin giảng viên và rating */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users size={16} className="text-gray-400" />
            <span className="font-bold">Giảng viên:</span>
            <span>{course.instructorName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Star size={16} className="text-yellow-400 fill-current" />
            <span>Đánh giá: {course.rating ? course.rating.toFixed(1) : 'Chưa có'}</span>
          </div>
        </div>

        {/* Nút học và đánh giá */}
        <div className="flex gap-2">
          <NavLink 
            to={`/student/courseParam/${course.courseId}`} 
            className="flex-1 bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <BookOpen size={18} />
            Học ngay
          </NavLink>
          
          <button
            onClick={() => setShowRatingModal(true)}
            className="bg-linear-to-r from-amber-500 to-amber-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Star size={18} />
            Đánh giá
          </button>
        </div>
      </div>

      {/* Modal đánh giá */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Đánh giá khóa học</h3>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Chọn số sao:</p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={`${star <= rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                      } cursor-pointer hover:scale-110 transition-transform`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>

            <div className="mb-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                rows="3"
                placeholder="Nhận xét của bạn về khóa học..."
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowRatingModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
              >
                Hủy
              </button>
              <button
                onClick={handleRateCourse}
                disabled={isSubmitting || rating === 0}
                className="flex-1 bg-linear-to-r from-amber-500 to-amber-600 text-white py-3 rounded-lg hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 transition-all duration-300 font-semibold"
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCourseCard;