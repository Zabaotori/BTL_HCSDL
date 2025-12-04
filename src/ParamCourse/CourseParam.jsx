import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MessageCircle, Award, CheckCircle, Lock } from 'lucide-react';
import YouTube from 'react-youtube';

const CourseParam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentSection, setCurrentSection] = useState(null);
  const [hasCertificate, setHasCertificate] = useState(false);
  const studentId = localStorage.getItem("id");

  // Fetch course details
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/courses/${id}/details`);
        setCourseData(response.data);
        
        // Lấy thông tin hasCertificate từ API courses list
        const coursesListResponse = await axios.get(`http://localhost:8080/student/${studentId}/courses`);
        const courseInfo = coursesListResponse.data.find(course => course.courseId === parseInt(id));
        
        if (courseInfo) {
          setHasCertificate(courseInfo.hasCertificate || false);
        }

        // Set first lesson as default
        if (response.data.sections.length > 0 && response.data.sections[0].lessons.length > 0) {
          const firstSection = response.data.sections[0];
          const firstLesson = firstSection.lessons[0];
          setCurrentSection(firstSection);
          setCurrentLesson({
            ...firstLesson,
            type: 'video'
          });
        }
      } catch (err) {
        console.log('Error fetching course details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const handleLessonSelect = (lesson, section) => {
    setCurrentLesson({
      ...lesson,
      type: 'video'
    });
    setCurrentSection(section);
  };

  const goToForum = () => {
    console.log(courseData.forumId);
    navigate(`/student/courseParam/${id}/forum/${courseData.forumId}`);
  };

  // Hàm xử lý khi click vào bài kiểm tra
  const handleTestClick = (testId) => {
    if (hasCertificate) {
      alert('Bạn đã hoàn thành khóa học và có chứng chỉ. Không thể làm bài kiểm tra nữa.');
      return;
    }
    navigate(`/student/courseParam/${id}/test/${testId}`);
  };

  if (loading) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">⏳</div>
          <p className="text-gray-600">Đang tải nội dung khóa học...</p>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">❌</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy khóa học</h3>
          <p className="text-gray-600">Khóa học không tồn tại hoặc đã bị xóa</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          courseData={courseData}
          currentLesson={currentLesson}
          onLessonSelect={handleLessonSelect}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6">
            {/* Course Info */}
            <div className="mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {courseData.title}
                  </h1>
                  <p className="text-gray-600 mb-4">{courseData.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Giảng viên: {courseData.instructorName}</span>
                    <span>•</span>
                    <span>Ngày xuất bản: {courseData.publishedDate}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Certificate Status */}
                  {hasCertificate && (
                    <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded-lg">
                      <Award size={20} />
                      <span className="font-semibold">Đã có chứng chỉ</span>
                    </div>
                  )}
                  
                  <button
                    onClick={goToForum}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <MessageCircle size={20} />
                    Diễn đàn
                  </button>
                </div>
              </div>
            </div>

            {/* Current Section/Lesson Info */}
            {currentSection && currentLesson && (
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">Đang học</div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  {currentSection.title}
                </h2>
                <h3 className="text-xl font-bold text-blue-600">
                  {currentLesson.title}
                </h3>
              </div>
            )}

            {/* Material Links */}
            {currentLesson && currentLesson.materialLinks && currentLesson.materialLinks.length > 0 && (
              <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
                <div className="space-y-2">
                  {currentLesson.materialLinks.map((item, index) => {
                    // Trích xuất video ID từ URL
                    const getYouTubeVideoId = (url) => {
                      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                      const match = url.match(regExp);
                      return (match && match[2].length === 11) ? match[2] : null;
                    };

                    const videoId = getYouTubeVideoId(item.materialLink);

                    return (
                      <div key={index} className="mb-6 last:mb-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">{item.title}</h3>
                        {videoId ? (
                          <YouTube
                            videoId={videoId}
                            opts={{
                              width: '100%',
                              height: '315',
                              playerVars: {
                                autoplay: 0,
                              },
                            }}
                            className="rounded-lg overflow-hidden"
                          />
                        ) : (
                          <p className="text-red-500">Link YouTube không hợp lệ: {item.materialLink}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tests Section */}
            {courseData.tests && courseData.tests.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Bài kiểm tra</h3>
                  
                  {hasCertificate && (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle size={20} />
                      <span className="text-sm font-medium">Đã hoàn thành khóa học</span>
                    </div>
                  )}
                </div>
                
                <div className="grid gap-4">
                  {courseData.tests.map(test => (
                    <div key={test.testId} className={`bg-white rounded-lg border ${hasCertificate ? 'border-gray-200 opacity-75' : 'border-gray-200'} p-4`}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{test.title}</h4>
                            {hasCertificate && (
                              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                Đã hoàn thành
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">Thời gian: {test.timeLimit} phút</p>
                        </div>
                        
                        {hasCertificate ? (
                          <div className="flex items-center gap-2 text-gray-500">
                            <Lock size={20} />
                            <button
                              disabled
                              className="bg-gray-200 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed"
                            >
                              Đã khóa
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleTestClick(test.testId)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Bắt đầu làm bài
                          </button>
                        )}
                      </div>
                      
                      {hasCertificate && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Award size={16} />
                            <span>Bạn đã nhận được chứng chỉ cho khóa học này. Các bài kiểm tra đã bị khóa.</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Certificate Info Banner */}
                {hasCertificate && (
                  <div className="mt-6 bg-linear-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Award className="text-green-600" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-800 mb-1">Chúc mừng bạn đã hoàn thành khóa học!</h4>
                        <p className="text-green-700 text-sm">
                          Bạn đã nhận được chứng chỉ cho khóa học "{courseData.title}". 
                          Hãy truy cập trang hồ sơ để xem và tải về chứng chỉ của bạn.
                        </p>
                        <button
                          onClick={() => navigate('/student/profile')}
                          className="mt-3 text-green-700 hover:text-green-800 font-medium text-sm flex items-center gap-1"
                        >
                          Xem chứng chỉ →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseParam;