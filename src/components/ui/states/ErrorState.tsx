import React from 'react';

interface ErrorStateProps {
  error: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => (
  <div className="container mx-auto py-12">
    <div className="flex justify-center items-center h-64">
      <p className="text-xl font-semibold text-red-600 dark:text-red-400">
        Error: {error}
      </p>
    </div>
  </div>
);

export default ErrorState;
