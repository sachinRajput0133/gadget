import React from 'react';

interface EmptyStateProps {
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message = 'No reviews found.' }) => (
  <div className="flex justify-center items-center h-64">
    <p className="text-xl font-semibold dark:text-white">{message}</p>
  </div>
);

export default EmptyState;
