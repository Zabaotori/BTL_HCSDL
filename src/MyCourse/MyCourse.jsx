import React, { useState, useMemo, useEffect } from 'react';
import FilterBar from './FilterBar';
import MyCourseGrid from './MyCourseGrid';
import axios from 'axios';

function MyCourse() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const studentId = localStorage.getItem('id')
  const [courses, setCourses] = useState([])

  const getMyCourses = async () => {
    try {
      let res = await axios({
        url: `http://localhost:8080/student/${studentId}/my-courses`,
        method: "GET"
      })
      setCourses(res.data)
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getMyCourses();
  }, [])

  // Filter courses based on selections
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.instructorName?.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });
  }, [searchTerm, courses]);

  return (
    <div className="min-h-screen bg-gray-50">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">Khoá học của tôi</h2>
        </div>
      
      <main className="container mx-auto px-4 py-6">

        {/* Filter Bar */}
        <FilterBar
          viewMode={viewMode}
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
          studentId={studentId}
        />
      </main>
    </div>
  );
}

export default MyCourse;