import React, { useState, useEffect } from 'react';
import FilterBarKhamPha from './FilterBarKhamPha.jsx';
import CourseCard from './CourseCard.jsx';
import axios from 'axios';

function KhamPha() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const studentId = localStorage.getItem("id")

  const getAllCourse = async() => {
    try {
      let res = await axios({
        url: `http://localhost:8080/student/${studentId}/courses`,
        method: `GET`
      })
      setCourses(res.data);
      setFilteredCourses(res.data); // Ban đầu hiển thị tất cả
    }
    catch (err) {
      console.log(err);
    }
  } 

  useEffect(()=>{
    getAllCourse();
  }, [])

  const handleFilterChange = (filteredCourseIds) => {
    if (filteredCourseIds === null) {
      setFilteredCourses(courses);
    } else if (filteredCourseIds.length === 0) {
      setFilteredCourses([]);
    } else {
      const filtered = courses.filter(course => 
        filteredCourseIds.includes(course.courseId)
      );
      setFilteredCourses(filtered);
    }
  };

  const handleEnrollmentChange = () => {
    getAllCourse();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Filter Bar */}
        <FilterBarKhamPha onFilterChange={handleFilterChange} />

        {/* Course Sections */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Được đề xuất cho bạn</h2>
          <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6`}>
            {filteredCourses?.map((course) => (
              <CourseCard 
                key={course.courseId} 
                course={course} 
                studentId={studentId}
                onEnrollmentChange={handleEnrollmentChange}
              />
            ))}
          </div>
        </div>

        {filteredCourses?.length === 0 && courses.length > 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy khóa học phù hợp</h3>
            <p className="text-gray-600">Hãy thử thay đổi bộ lọc</p>
          </div>
        )}

        <div className="border-t border-gray-200 my-8"></div>
      </div>
    </div>
  );
}

export default KhamPha;