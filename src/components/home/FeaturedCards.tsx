import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';
import { BsFire, BsLightningChargeFill } from 'react-icons/bs';
import { MdNewReleases } from 'react-icons/md';
import { FaCalendarAlt, FaEye } from 'react-icons/fa';
import { formatDate } from '@utils/helper';

interface Review {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  category?: {
    id: string;
    name: string;
    slug: string;
  } | null;
  coverImage?: string;
  rating: number;
  createdAt: string;
  views?: number;
}

interface Props {
  featuredReviews: Review[];
  isLoading?: boolean;
}

const FeaturedCards: React.FC<Props> = ({ featuredReviews, isLoading }) => {
  if (!featuredReviews || featuredReviews.length === 0) {
    return null;
  }

  const mainFeatured = featuredReviews[0];
  const secondaryFeatured = featuredReviews.slice(1);

  return (
    <section className="py-8 md:py-12 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <BsFire className="text-2xl mr-2 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Featured Tech Reviews</h2>
          </div>
          {/* <Link href="/reviews" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center">
            View all <span className="ml-1">→</span>
          </Link> */}
        </div>
        {isLoading ? (
          <div className="grid grid-cols-12 gap-4">
            {/* {[...Array(5)].map((_, i) => (
              <div key={i} className={`col-span-12 ${i === 0 ? 'lg:col-span-6 row-span-2' : 'sm:col-span-6 lg:col-span-3'} animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-[300px]`}></div>
            ))} */}
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-4">
            {/* Main featured card - takes col-span-6 and has height of 2 rows */}
            <button className="col-span-12 text-start lg:col-span-6 row-span-2 mb-4 lg:mb-0 cursor-pointer group">
              <div className="relative h-[300px] md:h-[400px] lg:h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-transparent hover:border-blue-500 transition-all duration-300 hover:shadow-xl">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/30 to-blue-600/30 opacity-60 z-10 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative h-full">
                  {/* <Image
                    src={mainFeatured.coverImage || '/images/logo.png'}
                    alt={mainFeatured.title}
                    className="transition-transform duration-700 group-hover:scale-105"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  /> */}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20">
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-blue-600 text-white text-xs uppercase font-bold py-1 px-2 rounded">
                        {mainFeatured.category?.name || 'Tech'}
                      </span>
                      <span className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
                        <BsLightningChargeFill className="text-yellow-400" /> Editor's Choice
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {mainFeatured.title}
                    </h3>
                    <p className="text-gray-200 mb-4 line-clamp-2 md:line-clamp-3">
                      {mainFeatured.excerpt || 'Check out this featured review.'}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <AiFillStar
                            key={i}
                            className={`${i < Math.floor(mainFeatured.rating) ? 'text-yellow-400' : 'text-gray-500'} text-lg`}
                          />
                        ))}
                        <span className="ml-1 text-white font-medium">{mainFeatured.rating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center text-gray-300 text-sm">
                        <FaCalendarAlt className="mr-1" />
                        <span>{formatDate(mainFeatured.createdAt)}</span>
                      </div>
                    </div>
                    <Link href={`/reviews/${mainFeatured.slug}`} className="absolute inset-0 z-30" aria-label={`Read review: ${mainFeatured.title}`}>
                      <span className="sr-only">Read more</span>
                    </Link>
                  </div>
                </div>
              </div>
            </button>

            {/* Secondary featured cards - each takes col-span-3 and has height of 1 row */}
            {secondaryFeatured.map((review, index) => (
              <button key={review.id} className="cursor-pointer w-full text-start col-span-12 sm:col-span-6 lg:col-span-3 row-span-1 group">
                <div className="h-[200px] sm:h-[220px] md:h-[240px] bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative border border-transparent hover:border-blue-500 transition-all duration-300 hover:shadow-lg">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-50 z-10 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative h-full">
                    <Image
                      src={review.coverImage || '/images/logo.png'}
                      alt={review.title}
                      className="transition-transform duration-500 group-hover:scale-110"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20">
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                      {index === 0 && (
                        <span className="inline-flex items-center bg-red-600 text-white text-xs px-2 py-1 rounded mb-2">
                          <MdNewReleases className="mr-1" /> New
                        </span>
                      )}
                      <h3 className="text-sm md:text-base font-bold text-white mb-1 line-clamp-2 group-hover:text-blue-300 transition-colors">
                        {review.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <AiFillStar
                              key={i}
                              className={`${i < Math.floor(review.rating) ? 'text-yellow-400' : 'text-gray-500'} text-xs md:text-sm`}
                            />
                          ))}
                          <span className="ml-1 text-white text-xs">{review.rating.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center text-gray-300 text-xs">
                          {review.views && (
                            <div className="flex items-center mr-2">
                              <FaEye className="mr-1" />
                              <span>{review.views}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <Link href={`/reviews/${review.slug}`} className="absolute inset-0 z-30" aria-label={`Read review: ${review.title}`}>
                        <span className="sr-only">Read more</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCards;
