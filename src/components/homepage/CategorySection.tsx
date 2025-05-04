import React, { useState } from 'react';

const categories = ['Today', 'This Weekend', 'Trending', 'Near Me', 'Rock', 'Pop', 'Hip Hop', 'Electronic'];

const CategorySection: React.FC = () => {
  const [active, setActive] = useState('Today');

  return (
    <div className="w-full py-8 bg-white drop-shadow-lg flex justify-center">
      <div className="flex gap-4 font-medium font-plus-jakarta-sans text-2xl overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={`px-10 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition
              ${active === category ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gray-100 text-black hover:bg-gray-200'}`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
