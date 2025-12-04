import React, { useState } from 'react';
import { PlayCircle, ChevronDown, ChevronRight, FileQuestion } from 'lucide-react';

const Sidebar = ({ 
  courseData, 
  currentLesson, 
  onLessonSelect
}) => {
  const [expandedSections, setExpandedSections] = useState([1]);

  const toggleSection = (sectionNo) => {
    setExpandedSections(prev =>
      prev.includes(sectionNo)
        ? prev.filter(id => id !== sectionNo)
        : [...prev, sectionNo]
    );
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      {/* Header */}
      <div className="pt-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900 mb-2">Nội dung khóa học</h1>
      </div>

      {/* Sections List */}
      <div className="p-4">
        {courseData.sections.map((section) => (
          <div key={section.sectionNo} className="mb-4">
            {/* Section Header */}
            <div 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => toggleSection(section.sectionNo)}
            >
              <div className="flex items-center gap-3">
                {expandedSections.includes(section.sectionNo) ? 
                  <ChevronDown size={16} className="text-gray-600" /> : 
                  <ChevronRight size={16} className="text-gray-600" />
                }
                <span className="font-semibold text-gray-900">{section.title}</span>
              </div>
              <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded">
                {section.lessons.length} bài
              </span>
            </div>

            {/* Lessons List */}
            {expandedSections.includes(section.sectionNo) && (
              <div className="mt-2 space-y-1">
                {section.lessons.map((lesson) => (
                  <div
                    key={`${section.sectionNo}-${lesson.lessonNo}`}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      currentLesson?.lessonNo === lesson.lessonNo
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => onLessonSelect(lesson, section)}
                  >
                    <PlayCircle size={16} className="text-green-500" />
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium ${
                        currentLesson?.lessonNo === lesson.lessonNo ? 'text-blue-700' : 'text-gray-900'
                      }`}>
                        {lesson.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        Bài {lesson.lessonNo}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;