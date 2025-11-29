import React from 'react';
import { Star } from 'lucide-react';

const Rating = ({ rating, reviews }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={`${
              index < fullStars
                ? 'fill-yellow-400 text-yellow-400'
                : index === fullStars && hasHalfStar
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-medium">{rating}</span>
      <span className="text-sm text-gray-500">({reviews})</span>
    </div>
  );
};

export default Rating;