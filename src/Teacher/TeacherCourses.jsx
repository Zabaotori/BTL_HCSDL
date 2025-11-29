import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Clock, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TeacherCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // TODO: Thay instructorId bằng ID thực từ session/login
  const instructorId = 1;

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      // TODO Backend: Cần tạo API GET /api/instructors/{instructorId}/courses
      // API này nên trả về:
      // [
      //   {
      //     courseId: number,
      //     title: string,
      //     description: string,
      //     publishedDate: string,
      //     instructorId: number,
      //     instructorName: string,
      //     totalStudents: number (count từ Enrollment),
      //     totalSections: number (count từ Section),
      //     totalLessons: number (count từ Lesson),
      //     categories: string[] (từ Category table)
      //   }
      // ]
      // const response = await axios.get(`/api/instructors/${instructorId}/courses`);
      // setCourses(response.data);
      
      // Mock data tạm (dựa trên schema của database)
      setCourses([
        {
          courseId: 1,
          title: "Java Spring Boot - Từ Cơ Bản Đến Nâng Cao",
          description: "Khóa học toàn diện về Spring Boot, bao gồm REST API, JPA, Security",
          thumbnail: "https://dummyimage.com/600x400/3b82f6/ffffff&text=Spring+Boot",
          totalStudents: 150,
          totalLessons: 45,
          totalChapters: 8,
          duration: "40 giờ",
          category: "Backend Development"
        },
        {
          courseId: 4,
          title: "React JS - Xây Dựng Ứng Dụng Web Hiện Đại",
          description: "Học React từ đầu, bao gồm Hooks, Redux, Router",
          thumbnail: "https://dummyimage.com/600x400/10b981/ffffff&text=React",
          totalStudents: 89,
          totalLessons: 32,
          totalChapters: 6,
          duration: "28 giờ",
          category: "Frontend Development"
        }
      ]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Khóa học của tôi</h1>
          <p className="text-gray-600">Quản lý các khóa học bạn đang giảng dạy</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Tổng khóa học</p>
                <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
              </div>
              <BookOpen className="text-cyan-600" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Tổng học viên</p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses.reduce((sum, course) => sum + course.totalStudents, 0)}
                </p>
              </div>
              <Users className="text-green-600" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Tổng bài học</p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses.reduce((sum, course) => sum + course.totalLessons, 0)}
                </p>
              </div>
              <Clock className="text-blue-600" size={32} />
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.courseId}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/teacher/course/${course.courseId}`)}
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="inline-block bg-cyan-100 text-cyan-800 text-xs font-medium px-2 py-1 rounded mb-2">
                  {course.category}
                </span>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>{course.totalStudents} học viên</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen size={14} />
                    <span>{course.totalLessons} bài</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/teacher/course/${course.courseId}`);
                  }}
                  className="w-full bg-cyan-600 text-white py-2 px-4 rounded-lg hover:bg-cyan-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Không tìm thấy khóa học
            </h3>
            <p className="text-gray-600">Hãy thử thay đổi từ khóa tìm kiếm</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherCourses;
