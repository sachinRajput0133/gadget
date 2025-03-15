import React from "react";
import Link from "next/link";
import ReviewCard from "@/components/reviews/cards/ReviewCard";
import EmptyState from "@/components/ui/states/EmptyState";
import Image from "next/image";

interface Review {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null | undefined;
  rating: number;
  featuredImage?: string;
  createdAt: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

interface LatestReviewAndGuideProps {
  data: Review[];
  isSeeAll?: boolean;
  className?: string;
}

const LatestReviewAndGuide: React.FC<LatestReviewAndGuideProps> = ({
  data,
  isSeeAll = false,
  className = "",
}) => {
  // If no data is provided, return empty state
  if (!data || data.length === 0) {
    return <EmptyState />;
  }

  // Limit the number of reviews if isSeeAll is false (homepage view)
  const displayData = isSeeAll ? data : data.slice(0, 5);

  return (
    <div className={`w-full  space-y-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold dark:text-white">
          Latest reviews and guides
        </h2>
        {isSeeAll && (
          <Link
            href="/reviews"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            See All &rarr;
          </Link>
        )}
      </div>
      <div className="">
        <div className="grid grid-cols-12 gap-4 ">
          {/* {displayData.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))} */}
          {displayData.map((review) => (
            <button
              key={review.id}
              className="text-left col-span-12 sm:col-span-6 lg:col-span-3 row-span-1"
            >
              <div className="h-[200px] sm:h-[220px] md:h-[240px] bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative">
                <div className="relative h-full">
                  <Image
                    src={"/images/logo.png"}
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
                    <span className="text-xs">{review.category?.name}</span>
                  </div>

                  <h3 className="text-lg font-semibold mb-1 line-clamp-2">
                    {review.title}
                  </h3>

                  <Link
                    href={`/reviews/${review.slug}`}
                    className="text-blue-300 hover:text-blue-100 text-sm"
                  >
                    Read Review &rarr;
                  </Link>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestReviewAndGuide;
