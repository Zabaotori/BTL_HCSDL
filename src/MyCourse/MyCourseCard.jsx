import React from 'react';
import { Play, Star, Clock, BookOpen, Heart, MoreVertical } from 'lucide-react';

const MyCourseCard = ({ course}) => {

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Course Thumbnail */}
      <div className="relative">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
            {course.category}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          <button className="p-2 rounded-full bg-white/90 text-gray-600 hover:bg-white backdrop-blur-sm transition-colors">
            <MoreVertical size={16} />
          </button>
        </div>
        
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button 
            // onClick={() => onContinue(course.id)}
            className="bg-white text-blue-600 rounded-full p-4 hover:scale-110 transition-transform duration-300"
          >
            <Play size={24} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
            {course.category}
          </span>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span>{course.rating}</span>
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {course.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3">Giảng viên: {course.instructor}</p>

        {/* Course Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen size={14} />
            <span>{course.lessonsCompleted}/{course.totalLessons} bài</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex gap-2">
          <button 
            // onClick={() => onContinue(course.id)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            Học
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCourseCard;