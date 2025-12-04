import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Download, 
  Filter, 
  Search, 
  Calendar, 
  Star, 
  Clock,
  FileText,
  Trophy,
  Medal,
  Zap,
  Sparkles
} from 'lucide-react';
import axios from 'axios';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRank, setFilterRank] = useState('all');

  const studentId = localStorage.getItem('id');

  const getCertificates = async () => {
    try {
      const res = await axios({
        url: `http://localhost:8080/student/${studentId}/certificates`,
        method: "GET"
      });
      setCertificates(res.data);
    } catch (err) {
      console.log('Error fetching certificates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCertificates();
  }, []);

  const filteredCertificates = certificates.filter(certificate => {
    const matchesSearch = certificate.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRank = filterRank === 'all' || certificate.rank === filterRank;
    
    return matchesSearch && matchesRank;
  });

  const handleDownload = (certificate) => {
    // Mock download function
    alert(`Tải chứng chỉ: ${certificate.courseName}`);
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 'A': return 'text-green-600 bg-green-100 border-green-200';
      case 'B': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'C': return 'text-amber-600 bg-amber-100 border-amber-200';
      case 'D': return 'text-orange-600 bg-orange-100 border-orange-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 'A': return <Trophy className="text-green-500" size={20} />;
      case 'B': return <Medal className="text-blue-500" size={20} />;
      case 'C': return <Award className="text-amber-500" size={20} />;
      case 'D': return <Zap className="text-orange-500" size={20} />;
      default: return <FileText className="text-gray-500" size={20} />;
    }
  };

  const getHeaderIcon = (rank) => {
    switch (rank) {
      case 'A': return <Trophy size={32} className="text-white" />;
      case 'B': return <Medal size={32} className="text-white" />;
      case 'C': return <Award size={32} className="text-white" />;
      case 'D': return <Zap size={32} className="text-white" />;
      default: return <FileText size={32} className="text-white" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Clock className="text-gray-400 mx-auto mb-4" size={48} />
          <p className="text-gray-600">Đang tải chứng chỉ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="text-amber-500" size={48} />
            <h1 className="text-3xl font-bold text-gray-900">Chứng chỉ của tôi</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Các chứng chỉ bạn đã đạt được sau khi hoàn thành khóa học
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FileText className="text-gray-500" size={24} />
              <div className="text-2xl font-bold text-gray-900">{certificates.length}</div>
            </div>
            <div className="text-sm text-gray-600">Tổng số chứng chỉ</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="text-green-500" size={24} />
              <div className="text-2xl font-bold text-green-600">
                {certificates.filter(c => c.rank === 'A').length}
              </div>
            </div>
            <div className="text-sm text-gray-600">Hạng A</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Medal className="text-blue-500" size={24} />
              <div className="text-2xl font-bold text-blue-600">
                {certificates.filter(c => c.rank === 'B').length}
              </div>
            </div>
            <div className="text-sm text-gray-600">Hạng B</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="text-amber-500" size={24} />
              <div className="text-2xl font-bold text-amber-600">
                {certificates.filter(c => c.rank === 'C').length}
              </div>
            </div>
            <div className="text-sm text-gray-600">Hạng C</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Tìm kiếm chứng chỉ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Rank Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400" size={20} />
              <select
                value={filterRank}
                onChange={(e) => setFilterRank(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Tất cả hạng</option>
                <option value="A">Hạng A</option>
                <option value="B">Hạng B</option>
                <option value="C">Hạng C</option>
                <option value="D">Hạng D</option>
              </select>
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        {filteredCertificates.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <FileText className="text-gray-400 mx-auto mb-4" size={64} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy chứng chỉ</h3>
            <p className="text-gray-600">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((certificate) => (
              <div
                key={certificate.certificateId}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                {/* Certificate Header */}
                <div className="bg-linear-to-r from-amber-400 to-amber-500 p-4 text-center relative">
                  <div className="absolute top-4 left-4">
                    {getHeaderIcon(certificate.rank)}
                  </div>
                  <Sparkles className="absolute top-4 right-4 text-white" size={20} />
                  <h3 className="text-lg font-bold text-white mb-1">Chứng chỉ hoàn thành</h3>
                  <div className="text-amber-100 text-sm">Khóa học</div>
                </div>

                {/* Certificate Content */}
                <div className="p-6">
                  <div className="text-center mb-4">
                    <h4 className="font-semibold text-gray-900 text-lg mb-3 line-clamp-2">
                      {certificate.courseName}
                    </h4>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getRankColor(certificate.rank)}`}>
                      {getRankIcon(certificate.rank)}
                      <span>Hạng {certificate.rank}</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span>Ngày cấp: {certificate.dateOfIssue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award size={16} className="text-gray-400" />
                      <span>Mã chứng chỉ: #{certificate.certificateId}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(certificate)}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <Download size={18} />
                    Tải chứng chỉ
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Count */}
        <div className="mt-6 text-center text-gray-600 flex items-center justify-center gap-2">
          <FileText size={16} className="text-gray-400" />
          Hiển thị {filteredCertificates.length} trên tổng số {certificates.length} chứng chỉ
        </div>
      </div>
    </div>
  );
};

export default Certificates;