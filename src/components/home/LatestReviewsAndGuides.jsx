import React from "react";
import Link from "next/link";
import ReviewCard from "@/components/reviews/cards/ReviewCard";
import EmptyState from "@/components/ui/states/EmptyState";

const LatestStories = ({ data, isSeeAll = false }) => {
  // If no data is provided, return empty state
  if (!data || data.length === 0) {
    return <EmptyState />;
  }

  // Limit the number of reviews if isSeeAll is false (homepage view)
  const displayData = isSeeAll ? data : data.slice(0, 5);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold dark:text-white">
          Latest Stories
        </h2>
        {!isSeeAll && (
          <Link
            href="/reviews"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            See All &rarr;
          </Link>
        )}
      </div>

      <div className="">
        {/* Left side: Reviews (7/12 columns) */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          {displayData.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestStories;
