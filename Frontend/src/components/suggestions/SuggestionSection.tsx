import React from 'react';

const SuggestionSection: React.FC = () => {
  const suggestions: string[] = [
    "Find spicy food nearby",
    "What's the best burger around here?",
    "Show me vegetarian options",
    "Find restaurants under $20"
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-lg font-semibold mb-4">Try asking...</h2>
      <div className="flex flex-wrap gap-3">
        {suggestions.map((suggestion, index) => (
          <span key={index} className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm">
            "{suggestion}"
          </span>
        ))}
      </div>
    </div>
  );
};

export default SuggestionSection;