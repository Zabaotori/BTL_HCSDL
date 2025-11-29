import React from 'react';
import { Play, Pause, Volume2, Maximize } from 'lucide-react';

const VideoPlayer = ({ lesson }) => {
  return (
    <div className="bg-black rounded-lg overflow-hidden">
      {/* Video Placeholder */}
      <div className="aspect-video bg-gray-800 flex items-center justify-center relative">
        <div className="text-center text-white">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play size={24} className="ml-1" />
          </div>
          <p className="text-lg font-semibold">{lesson.title}</p>
          <p className="text-gray-300 mt-2">Video player sẽ hiển thị ở đây</p>
        </div>
        
        {/* Video Controls */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="w-full bg-gray-600 rounded-full h-1 mb-2">
            <div className="bg-blue-500 h-1 rounded-full w-1/3"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="text-white hover:text-blue-400 transition-colors">
                <Play size={20} />
              </button>
              <div className="flex items-center gap-2 text-white">
                <Volume2 size={16} />
                <div className="w-20 bg-gray-600 rounded-full h-1">
                  <div className="bg-white h-1 rounded-full w-3/4"></div>
                </div>
              </div>
              <span className="text-sm text-gray-300">12:34 / 25:40</span>
            </div>
            <button className="text-white hover:text-blue-400 transition-colors">
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;