import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { MdNewReleases } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";

const FeaturedCard = ({ review, index }) => {
  return (
    <div
      key={index}
      className="w-full col-span-12 sm:col-span-6 lg:col-span-3 row-span-1 group"
    >
      <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-transparent hover:border-blue-500 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
        <div className="relative h-[180px] sm:h-[200px] overflow-hidden">
          {index === 0 && (
            <div className="absolute top-3 left-3 z-30 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs px-3 py-1 rounded-full shadow-md flex items-center font-semibold">
              <MdNewReleases className="mr-1 animate-pulse" /> New
            </div>
          )}
          
          <Image
            src={"/images/logo.png"}
            alt={review.title}
            className="transition-transform duration-500 group-hover:scale-110"
            fill
            style={{ objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            {/* <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              {review?.category || "Gadget"}
            </span> */}
            
            {review?.views && (
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                <FaEye className="mr-1" />
                <span>{review?.views}</span>
              </div>
            )}
          </div>
          
          <h3 className="text-base md:text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {review?.title}
          </h3>
          
          {/* <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
            {review?.description || "Discover the latest features and performance insights in our comprehensive review."}
          </p> */}
          
          {/* <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <AiFillStar
                  key={i}
                  className={`${
                    i < Math.floor(review.rating || 4)
                      ? "text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  } text-sm`}
                />
              ))}
              <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                {(review.rating || 4).toFixed(1)}
              </span>
            </div>
            
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <BiTimeFive className="mr-1" />
              <span>{review.date || "2 days ago"}</span>
            </div>
          </div> */}
          
          {/* Read More Button - Visible on hover */}
          {/* <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link
              href={`/reviews/${review.slug}`}
              className="inline-block w-full text-center py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-sm font-medium rounded-md transition-all duration-300 shadow-sm hover:shadow-md"
              aria-label={`Read review: ${review.title}`}
            >
              Read Full Review
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
