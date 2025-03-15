import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ReviewCardProps {
  review: {
    id: string;
    title: string;
    slug: string;
    excerpt?: string | null;
    rating: number;
    coverImage?: string;
    createdAt: string;
    category?: {
      id: string;
      name: string;
      slug: string;
    } | null;
  };
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="flex flex-col md:flex-row  bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:translate-y-[-4px]">
      <div className="md:w-1/3 h-[180px] md:h-auto relative">
        <Image
          src={review.coverImage || '/images/logo.png'}
          alt={review.title}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-4 md:p-6 md:w-2/3">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
            <span className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm">
              Rating: {review.rating}/5
            </span>
          </div>
          
          <h2 className="text-xl font-semibold mb-2 dark:text-white">
            {review.title}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
            {review.excerpt || 'No excerpt available.'}
          </p>
          
          <div className="flex justify-between items-center mt-auto">
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
      </div>
    </div>
  );
};

export default ReviewCard;
