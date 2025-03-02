import React from 'react';
import FoodCard from './FoodCard';
import { foodItems } from '../../data/foodItems';

const FoodCardGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {foodItems.map(item => (
        <FoodCard key={item.id} food={item} />
      ))}
    </div>
  );
};

export default FoodCardGrid;