import React, { useState } from 'react';
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';
import { RiComputerLine } from 'react-icons/ri';
import { MdOutlinePhoneIphone, MdLaptopMac, MdGamepad, MdLocalOffer } from 'react-icons/md';
import { FaCalendarAlt, FaEye, FaUserTie } from 'react-icons/fa';
import { formatDate } from '@utils/helper';



const LatestReviewAndGuide = ({ reviews, isLoading }) => {
  console.log("🚀 ~ reviews:", reviews)
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Filter reviews by category (normally would filter API data, but for demo will just show all)
  const displayData = reviews?.length ? reviews.slice(0, 5) : [];

  return (
    <section className="py-12 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0 flex items-center">
            <span className="w-8 h-8 inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-md text-white mr-3">
              <FaEye className="text-lg" />
            </span>
            Latest Reviews & Guides
          </h2>
          
          {/* <div className="flex overflow-x-auto no-scrollbar py-2 -mx-2 md:mx-0">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category.name)}
                className={`flex items-center px-4 py-2 mx-2 rounded-full border transition-all duration-300 whitespace-nowrap ${
                  activeCategory === category.name
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-medium shadow-sm'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <span className="mr-2 text-lg">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div> */}
        </div>

        <div className="grid grid-cols-12 gap-6">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="col-span-12 sm:col-span-6 lg:col-span-3 animate-pulse">
                <div className="h-44 bg-gray-300 dark:bg-gray-700 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))
          ) : (
            displayData.map((review) => (
              <button
                key={review.id}
                className="text-left col-span-12 sm:col-span-6 lg:col-span-3 group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-transparent hover:border-blue-400 dark:hover:border-blue-600">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 z-10"></div>
                    {/* <Image
                      src={review.coverImage || '/images/logo.png'}
                      alt={review.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    /> */}
                    {review.category && (
                      <span className="absolute top-2 left-2 z-20 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                        {review.category.name}
                      </span>
                    )}
                    <div className="absolute top-2 right-2 z-20 flex items-center bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                      <AiFillStar className="mr-1" />
                      {review.rating.toFixed(1)}
                    </div>
                  </div>
                  
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {review.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 flex-grow">
                      {review.excerpt || 'Check out this latest tech review.'}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-auto">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-1" />
                        <span>{formatDate(review.createdAt)}</span>
                      </div>
                      
                      {review.author && (
                        <div className="flex items-center">
                          <FaUserTie className="mr-1" />
                          <span>{review.author.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Link href={`/reviews/${review.slug}`} className="absolute inset-0" aria-label={`Read review: ${review.title}`}>
                    <span className="sr-only">Read more</span>
                  </Link>
                </div>
              </button>
            ))
          )}
        </div>
        
        <div className="flex justify-center mt-10">
          <Link 
            href="/reviews" 
            className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            View All Reviews
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestReviewAndGuide;
