import React, { useState } from 'react';
import { Search, Filter, Grid, List, Users, Clock } from 'lucide-react';
import { categories, levels } from '../data/courses.js';

const FilterBar = ({ 
  onFilterChange,
  totalCourses = 0
}) => {
  const [filters, setFilters] = useState({
    category: 'Tất cả',
    level: 'all',
    rating: '',
    search: ''
  });

  const ratings = [
    { value: '', label: 'Tất cả đánh giá' },
    { value: '4.5', label: '4.5★ trở lên' },
    { value: '4.0', label: '4.0★ trở lên' },
    { value: '3.5', label: '3.5★ trở lên' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = {
      ...filters,
      [key]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">Khám phá khóa học</h2>
        </div>
      </div>

      {/* Search và Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* Search Bar */}
        <div className="flex-1 w-full">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm khóa học, giảng viên..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-3 w-full lg:w-auto">

          {/* Level Filter */}
          <select
            value={filters.level}
            onChange={(e) => handleFilterChange('level', e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors min-w-[150px]"
          >
            {levels.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>

          {/* Rating Filter */}
          <select
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors min-w-[180px]"
          >
            {ratings.map(rating => (
              <option key={rating.value} value={rating.value}>
                {rating.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;