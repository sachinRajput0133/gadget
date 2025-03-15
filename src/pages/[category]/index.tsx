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
import LoadingState from "@/components/ui/states/LoadingState";
import ErrorState from "@/components/ui/states/ErrorState";

import HomeContent from "@/components/home";
import Category from "@/components/Category";



export default function CategoryPage() {
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

  return <Category reviews={reviews} featuredReviews={featuredReviews}  />;
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
