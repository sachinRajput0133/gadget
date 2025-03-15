import { GetServerSideProps } from "next";
import { useSelector } from "react-redux";
import { wrapper } from "@/store";
import {
  fetchReviews,
  selectReviews,
  selectReviewsLoading,
  selectReviewsError,
} from "@/store/slices/reviewSlice";
import { fetchCategories } from "@/store/slices/categorySlice";
import LatestStories from "@/components/home/LatestStories";
import LoadingState from "@/components/ui/states/LoadingState";
import ErrorState from "@/components/ui/states/ErrorState";
import { Review } from "@/types/review";
import FeaturedCards from "@/components/home/FeaturedCards";
import LatestReviewAndGuide from "@/components/home/LatestReviewAndGuide";
import HomeContent from "@/components/home";

// interface HomeContentProps {
//   reviews: Review[];
//   featuredReviews: Review[];
//   isHome?: boolean;
// }

// // Home page content component
// const HomeContent: React.FC<HomeContentProps> = ({
//   reviews,
//   featuredReviews,
//   isHome=false
// }) => (
//   <>
//     <div className=" mx-auto py-12">
//       <FeaturedCards featuredReviews={featuredReviews} />
//     </div>{" "}
//     <div className=" mx-auto py-12 grid grid-cols-12 gap-6">
//       <LatestStories data={reviews} isSeeAll={true} />
//       <div className="hidden lg:block lg:col-span-5">
//         <div className="sticky top-24 bg-gray-100 dark:bg-gray-700 rounded-lg p-4 h-[600px] flex items-center justify-center border border-gray-200 dark:border-gray-600">
//           <div className="text-center">
//             <p className="text-gray-500 dark:text-gray-400 text-sm">
//               Advertisement
//             </p>
//             <div className="mt-2 w-full h-[550px] bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
//               <span className="text-gray-400 dark:text-gray-500">
//                 300x600 Ad Unit
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="block lg:hidden mt-6">
//         <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-center">
//           <div className="text-center text-gray-500 dark:text-gray-400">
//             <p className="text-sm font-semibold mb-2">Advertisement</p>
//             <div className="w-full h-[250px] bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
//               <span className="text-gray-400 dark:text-gray-500">
//                 300x250 Ad Unit
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className=" mx-auto">
//       <LatestReviewAndGuide data={reviews} isSeeAll={true} />
//     </div>
//   </>
// );
// const FeaturedReview: React.FC<HomeContentProps> = ({ featuredReviews }) => (
//   <div className="container mx-auto py-12">
//     <h1 className="text-3xl font-bold mb-8 dark:text-white">Latest Gadget Reviews</h1>
//     <FeaturedCards featuredReviews={featuredReviews} />
//   </div>
// );
export default function Home() {
  const reviews = useSelector(selectReviews);
  const loading = useSelector(selectReviewsLoading);
  const error = useSelector(selectReviewsError);
  const featuredReviews = useSelector(selectReviews);
  console.log("🚀 ~ Home ~ featuredReviews:", featuredReviews)
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return <HomeContent reviews={reviews} featuredReviews={featuredReviews} isHome={true} />;
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    try {
      await Promise.all([
        store.dispatch(fetchReviews({})),
        store.dispatch(fetchCategories()),
      ]);

      return {
        props: {},
      };
    } catch (error) {
      console.error("Error in getServerSideProps:", error);
      return {
        props: {},
      };
    }
  });
