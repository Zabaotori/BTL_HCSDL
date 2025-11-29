import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, FileQuestion, LogOut } from 'lucide-react';

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const [instructorName, setInstructorName] = useState('');

  useEffect(() => {
    // Lấy thông tin từ localStorage
    const name = localStorage.getItem('name') || 'Giảng viên';
    setInstructorName(name);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Mock data - sau này sẽ gọi API
  const courses = [
    {
      id: 1,
      title: 'Khóa học lập trình Web',
      students: 150,
      lessons: 45,
      thumbnail: 'https://via.placeholder.com/300x200'
    },
    {
      id: 2,
      title: 'Khóa học React nâng cao',
      students: 80,
      lessons: 30,
      thumbnail: 'https://via.placeholder.com/300x200'
    },
    {
      id: 3,
      title: 'Khóa học Node.js Backend',
      students: 120,
      lessons: 38,
      thumbnail: 'https://via.placeholder.com/300x200'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Tổng khóa học</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">
                  {courses.length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Tổng học viên</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {courses.reduce((sum, c) => sum + c.students, 0)}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Tổng bài học</p>
                <p className="text-3xl font-bold text-purple-600 mt-1">
                  {courses.reduce((sum, c) => sum + c.lessons, 0)}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <FileQuestion className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Khóa học của bạn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                onClick={() => navigate(`/instructor/course/${course.id}`)}
                className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    {course.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students} học viên</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.lessons} bài</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
