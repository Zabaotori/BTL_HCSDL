import React, { useState, useMemo } from 'react';
// import Header from './Header';
import FilterBar from './FilterBar';
import MyCourseGrid from './MyCourseGrid';
import { myCourses, categories, statusFilters } from '../data/myCourses.js';

function MyCourse() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  // Filter courses based on selections
  const filteredCourses = useMemo(() => {
    return myCourses.filter(course => {
      const matchesCategory = selectedCategory === 'Tất cả' || course.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || course.status === selectedStatus;
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [selectedCategory, selectedStatus, searchTerm]);


  const handleFavorite = (courseId) => {
    console.log('Toggle favorite for course:', courseId);
    // Toggle favorite status
  };

  // Calculate stats
  const stats = useMemo(() => {
    const total = myCourses.length;
    const inProgress = myCourses.filter(course => course.status === 'in-progress').length;
    const completed = myCourses.filter(course => course.status === 'completed').length;
    const notStarted = myCourses.filter(course => course.status === 'not-started').length;

    return { total, inProgress, completed, notStarted };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">Khoá học của tôi</h2>
        </div>
      
      
      <main className="container mx-auto px-4 py-6">

        {/* Filter Bar */}
        <FilterBar
          categories={categories}
          statusFilters={statusFilters}
          selectedCategory={selectedCategory}
          selectedStatus={selectedStatus}
          viewMode={viewMode}
          onCategoryChange={setSelectedCategory}
          onStatusChange={setSelectedStatus}
          onViewModeChange={setViewMode}
          onSearch={setSearchTerm}
        />

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-gray-600">
            Tìm thấy <span className="font-semibold text-gray-900">{filteredCourses.length}</span> khóa học
          </div>
        </div>

        {/* Courses Grid/List */}
        <MyCourseGrid
          courses={filteredCourses}
          viewMode={viewMode}
        />
      </main>
    </div>
  );
}

export default MyCourse;