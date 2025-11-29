import React from 'react';
import CourseSection from './CourseSection';
import { courses } from '../data/courses.js';
import CourseCard from './CourseCard.jsx';

function KhamPha() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* <Header /> */}
        
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Được đề xuất cho bạn</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courses.recommended.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 my-8"></div>
      </div>
    </div>
  );
}

export default KhamPha;
