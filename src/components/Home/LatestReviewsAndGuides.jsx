import React from 'react';
import ReviewCard from './ReviewCard';
import Link from 'next/link';

const LatestReviewsAndGuides = ({ data, isSeeAll = false }) => {
  // If no data is provided, return nothing
  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl font-semibold dark:text-white">No reviews found.</p>
      </div>
    );
  }

  // Limit the number of reviews if isSeeAll is false (homepage view)
  const displayData = isSeeAll ? data : data.slice(0, 5);

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold dark:text-white">Latest Reviews</h2>
        {!isSeeAll && (
          <Link 
            href="/reviews" 
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            See All
          </Link>
        )}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left side: Reviews (7/12 columns) */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          {displayData.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Right side: Google Ads (5/12 columns) */}
        <div className="hidden lg:block lg:col-span-5">
          <div className="sticky top-24 bg-gray-100 dark:bg-gray-700 rounded-lg p-4 h-[600px] flex items-center justify-center border border-gray-200 dark:border-gray-600">
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Advertisement</p>
              <div className="mt-4 text-gray-400 dark:text-gray-500">
                {/* Google Ads will be inserted here */}
                <p className="italic">Google Ad Space</p>
                <p className="text-xs mt-2">300x600 ad unit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Ad Space (only visible on mobile) */}
      <div className="block lg:hidden mt-6">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 h-[250px] flex items-center justify-center border border-gray-200 dark:border-gray-600">
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Advertisement</p>
            <div className="mt-4 text-gray-400 dark:text-gray-500">
              {/* Mobile Google Ads will be inserted here */}
              <p className="italic">Google Ad Space</p>
              <p className="text-xs mt-2">320x250 ad unit</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestReviewsAndGuides;
