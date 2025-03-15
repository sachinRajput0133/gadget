import FeaturedCards from "./FeaturedCards";
import LatestReviewAndGuide from "./LatestReviewAndGuide";
import LatestStories from "./LatestReviewsAndGuides";


// Home page content component
const HomeContent = ({
  reviews,
  featuredReviews,
  isHome = false,
}) => (
  <>
    <div className=" mx-auto py-12">
      <FeaturedCards featuredReviews={featuredReviews} />
    </div>{" "}
    <div className=" mx-auto py-12 grid grid-cols-12 gap-6">
      <div className="col-span-9">
        <LatestStories data={reviews} isSeeAll={true} />
      </div>
      <div className="hidden lg:block lg:col-span-3">
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
    {isHome ? (
      <div className=" mx-auto">
        <LatestReviewAndGuide reviews={reviews} isLoading={false} />
      </div>
    ) : null}
  </>
);

export default HomeContent;
