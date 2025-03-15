import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
const ReviewCard = ({ review }) => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
      <div className="flex flex-col md:flex-row">
        {/* Left side - Image (taking about 1/3 of the space) */}
        <div className="md:w-1/3">
          <div className="relative h-48 md:h-full">
            {/* <Ima
              src={review.coverImage || '/placeholder.jpg'}
              alt={review.title}
              className="w-full h-full object-cover"
            /> */}
            <Image
            src={review.coverImage || '/placeholder.jpg'}
            className={`h-[230px] w-[450px] min-w-[40px] object-cover rounded-md`}
            alt={review.title}
            width={450}
            height={230}
          />
          </div>
        </div>
        
        {/* Right side - Content (taking about 7/12 of the space) */}
        <div className="p-4 md:p-6 md:w-7/12">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
            <span className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm">
              Rating: {review.rating}/10
            </span>
          </div>
          
          <h2 className="text-xl font-semibold mb-2 dark:text-white">
            {review.title}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {review.excerpt}
          </p>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {review.category?.name || 'Uncategorized'}
            </span>
            <Link
              href={`/reviews/${review.slug}`}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Read more &rarr;
            </Link>
          </div>
        </div>
        
        {/* This space is reserved for Google Ads (5/12 of the total width) */}
        {/* It's deliberately not rendered here as ads will be handled separately */}
      </div>
    </div>
  );
};

export default ReviewCard;
