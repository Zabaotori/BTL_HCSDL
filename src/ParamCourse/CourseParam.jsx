import React, { useState } from 'react';
import Sidebar from './Sidebar.jsx';
import VideoPlayer from './VideoPlayer.jsx';
import Quiz from './Quiz.jsx';
import { courseData } from '../data/courseData.js';

function CourseParam() {
  const [currentLesson, setCurrentLesson] = useState(courseData.chapters[0].lessons[0]);
  const [currentChapter, setCurrentChapter] = useState(courseData.chapters[0]);

  const progress = (courseData.completedLessons / courseData.totalLessons) * 100;

  const handleLessonSelect = (lesson, chapter) => {
    setCurrentLesson(lesson);
    setCurrentChapter(chapter);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          chapters={courseData.chapters}
          currentLesson={currentLesson}
          onLessonSelect={handleLessonSelect}
          progress={progress}
        />
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6">
            {/* Course Info */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {courseData.title}
              </h1>
              <p className="text-gray-600 mb-4">{courseData.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>Giảng viên: {courseData.instructor}</span>
                <span>•</span>
                <span>{courseData.completedLessons}/{courseData.totalLessons} bài học</span>
              </div>
            </div>

            {/* Current Chapter/Lesson Info */}
            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-1">Đang học</div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                {currentChapter.title}
              </h2>
              <h3 className="text-xl font-bold text-blue-600">
                {currentLesson.title}
              </h3>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {currentLesson.type === 'video' ? (
                <VideoPlayer lesson={currentLesson} />
              ) : (
                <Quiz lesson={currentLesson} />
              )}
            </div>

            {/* Lesson Content */}
            {currentLesson.type === 'video' && currentLesson.content && (
              <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Nội dung bài học</h3>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {currentLesson.content}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseParam;