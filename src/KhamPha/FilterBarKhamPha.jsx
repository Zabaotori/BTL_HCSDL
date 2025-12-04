import React, { useState } from 'react';
import { Filter, Star, StarIcon } from 'lucide-react';
import axios from 'axios';

const FilterBarKhamPha = ({ onFilterChange }) => {
  const [minRating, setMinRating] = useState('');
  const [minEnrollments, setMinEnrollments] = useState('');

  const handleFilter = async () => {
    try {
      const params = {};
      if (minRating) params.minRating = minRating;
      if (minEnrollments) params.minEnrollments = minEnrollments;

      const res = await axios.get('http://localhost:8080/api/course-rating', { params });
      
      // Lấy danh sách courseId từ API course-rating
      const filteredCourseIds = res.data.map(course => course.courseId);
      onFilterChange(filteredCourseIds);
    } catch (err) {
      console.log('Error filtering courses:', err);
      onFilterChange([]); // Nếu lỗi, trả về mảng rỗng
    }
  };

  const clearFilter = () => {
    setMinRating('');
    setMinEnrollments('');
    onFilterChange(null); // Trả về null để hiển thị tất cả
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center gap-4">
        <Filter className="text-gray-400" size={20} />
        <span className="text-gray-600">Lọc theo:</span>
        
        {/* Min Rating Input */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Rating từ:</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            placeholder="0"
            className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span>
            <Star className='text-yellow-600'></Star>
          </span>
        </div>

        {/* Min Enrollments Input */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Số lượt đăng ký từ:</label>
          <input
            type="number"
            min="0"
            value={minEnrollments}
            onChange={(e) => setMinEnrollments(e.target.value)}
            placeholder="0"
            className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Filter Button */}
        <button
          onClick={handleFilter}
          className="px-4 py-2 bg-blue-600 text-white cursor-pointer rounded-lg hover:bg-blue-700 transition-colors"
        >
          Lọc
        </button>

        {/* Clear Button */}
        <button
          onClick={clearFilter}
          className="px-4 py-2 bg-gray-100 text-gray-700 cursor-pointer rounded-lg hover:bg-gray-300 transition-colors"
        >
          Hiển thị tất cả
        </button>
      </div>
    </div>
  );
};

export default FilterBarKhamPha;