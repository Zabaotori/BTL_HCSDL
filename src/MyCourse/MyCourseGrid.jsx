import React, { useState } from 'react';
import CourseCard from './MyCourseCard';
import { Star } from 'lucide-react';
import axios from 'axios';

const MyCourseGrid = ({
  courses,
  studentId,
  viewMode
}) => {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRateCourse = async () => {
    if (rating === 0 || !selectedCourse) return;

    setIsSubmitting(true);
    try {
      await axios.put('http://localhost:8080/student/review-course', {
        courseId: selectedCourse.courseId,
        studentId: studentId,
        rating: rating,
        comment: comment || "Khóa học rất hay!"
      });
      
      setShowRatingModal(false);
      window.location.reload();
    } catch (err) {
      console.log('Error rating course:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openRatingModal = (course) => {
    setSelectedCourse(course);
    setRating(0);
    setComment('');
    setShowRatingModal(true);
  };

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📚</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy khóa học</h3>
        <p className="text-gray-600">Hãy thử thay đổi bộ lọc hoặc tìm kiếm khác</p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {courses.map(course => (
          <div
            key={course?.courseId}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
          >
            <div className="flex gap-4">
              <img
                src="https://dummyimage.com/600x400/000/fff"
                alt={course.title}
                className="w-32 h-24 object-cover rounded-lg shrink-0"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {course.courseName}
                </h3>

                <p className="text-sm text-gray-600">
                  Giảng viên: {course.instructorName}
                </p>

                <p className="text-sm text-gray-400">
                  Ngày đăng ký: {course.date}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span>{course.rating || 0}</span>
                  </div>

                  <button 
                    onClick={() => openRatingModal(course)}
                    className='bg-amber-50 text-amber-700 px-3 py-1 border rounded-lg cursor-pointer hover:bg-amber-700 hover:text-white transition-colors text-sm'
                  >
                    Đánh giá
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Rating Modal */}
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
                      size={20}
                      className={`${
                        star <= rating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      } cursor-pointer`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg resize-none"
                  rows="3"
                  placeholder="Nhận xét..."
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowRatingModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleRateCourse}
                  disabled={isSubmitting || rating === 0}
                  className="flex-1 bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 disabled:opacity-50 transition-colors"
                >
                  {isSubmitting ? 'Đang gửi...' : 'Gửi'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {courses.map(course => (
        <CourseCard
          key={course.courseId}
          course={course}
          studentId={studentId}
        />
      ))}
    </div>
  );
};

export default MyCourseGrid;