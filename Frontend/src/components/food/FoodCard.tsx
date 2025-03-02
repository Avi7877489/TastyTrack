import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { FoodCardProps } from '../../types';


const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <img 
        src={food.imgUrl} 
        className="w-full h-48 object-cover rounded-lg mb-4" 
        alt={food.name}
      />
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{food.name}</h3>
        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{food.rating} ★</span>
      </div>
      <p className="text-gray-600 text-sm mb-2">{food.restaurant}</p>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">
          <FontAwesomeIcon icon={faLocationArrow} className="mr-1" />
          {food.distance} miles
        </span>
        <span className="font-medium text-gray-900">{food.price}</span>
      </div>
    </div>
  );
};

export default FoodCard;