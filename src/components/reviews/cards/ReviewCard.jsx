import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';
import { FaCalendarAlt, FaEye } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { BsLightningChargeFill } from 'react-icons/bs';
import { formatDate } from '@utils/helper';



const ReviewCard = ({ review }) => {
  return (
    <button className="w-full group flex text-left flex-col md:flex-row bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] border border-transparent hover:border-blue-400 dark:hover:border-blue-600">
      <div className="md:w-1/2 h-[250px] md:h-auto relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 z-10"></div>
        <Image
          src={review.coverImage || '/images/logo.png'}
          alt={review.title}
          width={500}
          height={150}
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-500 group-hover:scale-110 h-[250px]"
        />
        {review.verified && (
          <div className="absolute top-2 right-2 bg-green-600 text-white p-1 rounded-md z-20 flex items-center gap-1 text-xs font-medium">
            <MdVerified className="text-white" /> Verified
          </div>
        )}
        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-sm py-1 px-2 rounded-md z-20 flex items-center gap-1">
          <BsLightningChargeFill className="text-yellow-400" /> Hot Take
        </div>
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold py-1 px-2 rounded">REVIEW</span>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <FaCalendarAlt className="mr-1" />
              <span>{formatDate(review.date)}</span>
            </div>
          </div>
          <Link href={`/reviews/${review.slug}`} passHref>
            <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {review.title}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
            {review.excerpt}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between mt-auto">
          <div className="flex items-center space-x-1 mb-2 md:mb-0">
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {[...Array(5)].map((_, i) => (
                <AiFillStar
                  key={i}
                  className={`${
                    i < Math.floor(review.rating)
                      ? 'text-yellow-500'
                      : 'text-gray-300 dark:text-gray-600'
                  } text-lg`}
                />
              ))}
              <span className="ml-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
                {review.rating.toFixed(1)}
              </span>
            </div>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <div className="flex items-center mr-3">
              <FaEye className="mr-1" />
              <span>{review.views}</span>
            </div>
            <span className="text-blue-500 dark:text-blue-400 font-medium group-hover:underline">Read Full Review</span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ReviewCard;
