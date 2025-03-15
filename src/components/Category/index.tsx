import React from 'react'
import { Review } from '@/types/review';
import ExploreSection from './ExploreSection';
import CategoryCard from './CategoryCard';

interface CategoryProps {
  reviews: Review[];
  featuredReviews: Review[];
}

const Category = ({ reviews , featuredReviews }: CategoryProps) => {
  return (
    <div>

        <ExploreSection  />
        <CategoryCard reviews={reviews} featuredReviews={featuredReviews} isHome={false}  />
    </div>
  )
}

export default Category