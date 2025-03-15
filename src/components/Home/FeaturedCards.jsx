import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FeaturedCards = ({ featuredReviews }) => {
  // Make sure we have at least 3 reviews to display
  if (!featuredReviews || featuredReviews.length < 3) {
    return null;
  }

  // Get the first review for the main featured card
  const mainFeatured = featuredReviews[0];
  
  // Get the next two reviews for the smaller cards
  const secondaryFeatured = featuredReviews.slice(1, 3);

  return (
    <div className="w-full bg-white dark:bg-gray-800 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Featured Reviews</h2>
        
        <div className="grid grid-cols-12 gap-4">
          {/* Main featured card - takes col-span-6 and has height of 2 rows */}
          <div className="col-span-12 lg:col-span-6 row-span-2 mb-4 lg:mb-0">
            <div className="relative h-[300px] md:h-[400px] lg:h-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="relative h-full">
                <Image
                  src={mainFeatured.coverImage || '/placeholder.jpg'}
                  alt={mainFeatured.title}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center mb-2">
                  <span className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm mr-3">
                    Rating: {mainFeatured.rating}/5
                  </span>
                  <span className="text-sm">
                    {mainFeatured.category?.name}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{mainFeatured.title}</h3>
                
                <p className="mb-4 line-clamp-2 text-gray-200">
                  {mainFeatured.excerpt}
                </p>
                
                <Link
                  href={`/reviews/${mainFeatured.slug}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors"
                >
                  Read Review
                </Link>
              </div>
            </div>
          </div>
          
          {/* Secondary featured cards - each takes col-span-3 and has height of 1 row */}
          {secondaryFeatured.map((review, index) => (
            <div key={review.id} className="col-span-12 sm:col-span-6 lg:col-span-3 row-span-1">
              <div className="h-[200px] sm:h-[220px] md:h-[240px] bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative">
                <div className="relative h-full">
                  <Image
                    src={review.coverImage || '/placeholder.jpg'}
                    alt={review.title}
                    className="object-cover"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex items-center mb-1">
                    <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs mr-2">
                      {review.rating}/5
                    </span>
                    <span className="text-xs">
                      {review.category?.name}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-1 line-clamp-2">{review.title}</h3>
                  
                  <Link
                    href={`/reviews/${review.slug}`}
                    className="text-blue-300 hover:text-blue-100 text-sm"
                  >
                    Read Review &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCards;
