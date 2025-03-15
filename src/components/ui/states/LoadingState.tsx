import React from 'react';

const LoadingState: React.FC = () => (
  <div className="container mx-auto py-12">
    <div className="flex justify-center items-center h-64">
      <p className="text-xl font-semibold dark:text-white">Loading reviews...</p>
    </div>
  </div>
);

export default LoadingState;
