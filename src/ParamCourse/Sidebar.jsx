import React, { useState } from 'react';
import { PlayCircle, CheckCircle2, Circle, ChevronDown, ChevronRight, FileQuestion } from 'lucide-react';

const Sidebar = ({ 
  chapters, 
  currentLesson, 
  onLessonSelect,
  progress 
}) => {
  const [expandedChapters, setExpandedChapters] = useState([1]);

  const toggleChapter = (chapterId) => {
    setExpandedChapters(prev =>
      prev.includes(chapterId)
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const getLessonIcon = (lesson) => {
    if (lesson.type === 'quiz') {
      return <FileQuestion size={16} className="text-purple-500" />;
    }
    return <PlayCircle size={16} className="text-green-500" />;
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      {/* Header */}
      <div className="pt-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900 mb-2">Nội dung khóa học</h1>
      </div>

      {/* Chapters List */}
      <div className="p-4">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="mb-4">
            {/* Chapter Header */}
            <div 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => toggleChapter(chapter.id)}
            >
              <div className="flex items-center gap-3">
                {expandedChapters.includes(chapter.id) ? 
                  <ChevronDown size={16} className="text-gray-600" /> : 
                  <ChevronRight size={16} className="text-gray-600" />
                }
                <span className="font-semibold text-gray-900">{chapter.title}</span>
              </div>
              <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded">
                {chapter.lessons.filter(l => l.completed).length}/{chapter.lessons.length}
              </span>
            </div>

            {/* Lessons List */}
            {expandedChapters.includes(chapter.id) && (
              <div className="mt-2 space-y-1">
                {chapter.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      currentLesson?.id === lesson.id
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => onLessonSelect(lesson, chapter)}
                  >
                    {getLessonIcon(lesson)}
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium ${
                        currentLesson?.id === lesson.id ? 'text-blue-700' : 'text-gray-900'
                      }`}>
                        {lesson.title}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <span>{lesson.duration}</span>
                        {lesson.type === 'quiz' && (
                          <span className="bg-purple-100 text-purple-800 px-1 rounded text-xs">
                            Quiz
                          </span>
                        )}
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