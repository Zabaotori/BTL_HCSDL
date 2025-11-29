import React, { useState, useMemo } from 'react';
import FilterBar from './FilterBar';
import { courses } from '../data/courses.js';
import CourseCard from './CourseCard.jsx';

function KhamPha() {
  const [filters, setFilters] = useState({
    category: 'Tất cả',
    level: 'all',
    rating: '',
    search: ''
  });
  const [viewMode, setViewMode] = useState('grid');

  // Filter courses
  const filteredCourses = useMemo(() => {
    return courses.recommended.filter(course => {
      const matchesCategory = filters.category === 'Tất cả' || course.category === filters.category;
      const matchesLevel = filters.level === 'all' || course.level === filters.level;
      const matchesRating = !filters.rating || course.rating >= parseFloat(filters.rating);
      const matchesSearch = !filters.search || 
        course.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(filters.search.toLowerCase());

      return matchesCategory && matchesLevel && matchesRating && matchesSearch;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Filter Bar */}
        <FilterBar
          onFilterChange={setFilters}
          onViewModeChange={setViewMode}
          viewMode={viewMode}
          totalCourses={filteredCourses.length}
        />

        {/* Course Sections */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Được đề xuất cho bạn</h2>
          <div className={`grid grid-cols-1 ${viewMode === 'grid' ? 'md:grid-cols-2 xl:grid-cols-3' : ''} gap-6`}>
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy khóa học</h3>
            <p className="text-gray-600">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        )}

        <div className="border-t border-gray-200 my-8"></div>
      </div>
    </div>
  );
}

export default KhamPha;