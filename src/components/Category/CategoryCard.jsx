import { Review } from "@/types/review";
import FeaturedCards from "../home/FeaturedArticle";
import LatestReviewAndGuide from "../home/LatestReviewAndGuide";
import LatestStories from "../home/LatestReviewsAndGuides";



// Home page content component
const CategoryCard = ({
  reviews,
  featuredReviews,
  isHome = false,
}) => {
  console.log("🚀 ~ reviews:", reviews)

  return (
    <>
      <div className=" mx-auto py-12">
        <FeaturedCards featuredReviews={featuredReviews}  className="border-b pb-10 border-t py-10"/>
        <LatestReviewAndGuide  data={reviews?.length ?  reviews?.slice(0, 4) : []} isSeeAll={true} className="border-b pb-10  py-10" />
    </div>{" "}
    <div className=" mx-auto py-12 grid grid-cols-12 gap-6">
      <div className="col-span-7">
        <LatestStories data={reviews} isSeeAll={true} />
      </div>
      <div className="hidden lg:block lg:col-span-5">
        <div className="sticky top-24 bg-gray-100 dark:bg-gray-700 rounded-lg p-4 h-[600px] flex items-center justify-center border border-gray-200 dark:border-gray-600">
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Advertisement
            </p>
            <div className="mt-2 w-full h-[550px] bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
              <span className="text-gray-400 dark:text-gray-500">
                300x600 Ad Unit
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="block lg:hidden mt-6">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p className="text-sm font-semibold mb-2">Advertisement</p>
            <div className="w-full h-[250px] bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
              <span className="text-gray-400 dark:text-gray-500">
                300x250 Ad Unit
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* {isHome ? (
      <div className=" mx-auto">
        <LatestReviewAndGuide data={reviews} isSeeAll={true} />
      </div>
    ) : null} */}
  </>
);
}

export default CategoryCard;
