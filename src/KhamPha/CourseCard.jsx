import React from 'react';
import Rating from './Rating';

const CourseCard = ({ course }) => {
  const formatPrice = (price) => {
    if (!price) return null;
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      {/* {course.badge && (
        <div className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded mb-2">
          {course.badge}
        </div>
      )} */}

      <img src="https://dummyimage.com/600x400/000/fff" alt="" />
      
      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>
      
      <div className="mb-3">
        <Rating rating={course.rating} reviews={course.reviews} />
      </div>

      <button
        type="button"
        class="btn bg-cyan-400 p-2 rounded cursor-pointer border border-cyan-700 hover:bg-cyan-600 hover:text-gray-200"
      >
        Đăng ký khoá học
      </button>
      
      
    </div>
  );
};

export default CourseCard;