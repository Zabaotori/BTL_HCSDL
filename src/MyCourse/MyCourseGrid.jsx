import React from 'react';
import CourseCard from './MyCourseCard';
import { Star } from 'lucide-react';

const MyCourseGrid = ({ 
  courses, 
  viewMode
}) => {
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
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-300">
            <div className="flex gap-4">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-32 h-24 object-cover rounded-lg shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                      {course.category}
                    </span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      course.status === 'completed' ? 'bg-green-100 text-green-800' :
                      course.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {course.status === 'completed' ? 'Đã hoàn thành' :
                       course.status === 'in-progress' ? 'Đang học' : 'Chưa bắt đầu'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span>{course.rating}</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-2">Giảng viên: {course.instructor}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>Thời lượng: {course.duration}</span>
                  <span>Bài học: {course.lessonsCompleted}/{course.totalLessons}</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => onContinue(course.id)}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm whitespace-nowrap"
                >
                  {course.status === 'not-started' ? 'Bắt đầu học' :
                   course.status === 'completed' ? 'Xem lại' : 'Tiếp tục học'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {courses.map(course => (
        <CourseCard
          key={course.id}
          course={course}
        />
      ))}
    </div>
  );
};

export default MyCourseGrid;