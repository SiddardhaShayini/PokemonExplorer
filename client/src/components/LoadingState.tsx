import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 border-4 border-pokered border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-lg text-gray-600">Loading Pokémon data...</p>
    </div>
  );
};

export default LoadingState;
