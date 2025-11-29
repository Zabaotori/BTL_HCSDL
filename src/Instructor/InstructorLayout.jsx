import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LogOut, BookOpen } from 'lucide-react';

const InstructorLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate('/instructor')}
            className="flex items-center gap-2 text-xl font-bold text-blue-600 hover:text-blue-700"
          >
            <BookOpen className="w-6 h-6" />
            Instructor Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            Đăng xuất
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default InstructorLayout;
