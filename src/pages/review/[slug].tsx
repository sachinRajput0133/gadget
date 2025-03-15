import { GetServerSideProps } from 'next';
import { useSelector } from 'react-redux';
import { wrapper } from '@/store';
import { RootState } from '@/store';
import { fetchReviewBySlug } from '@/store/slices/reviewSlice';
import { fetchCategories } from '@/store/slices/categorySlice';
import MainLayout from '@/components/layouts/MainLayout';
import { StarIcon } from '@heroicons/react/24/solid';
import { ShareIcon } from '@heroicons/react/24/outline';

interface ReviewDetailProps {
  slug: string;
}

export default function ReviewDetail({ slug }: ReviewDetailProps) {
  const review = useSelector((state: RootState) => state.reviews.currentReview);
  const loading = useSelector((state: RootState) => state.reviews.loading);
  const error = useSelector((state: RootState) => state.reviews.error);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </MainLayout>
    );
  }

  if (error || !review) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error || 'Review not found'}</p>
        </div>
      </MainLayout>
    );
  }

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(10)].map((_, index) => (
          <StarIcon
            key={index}
            className={`h-5 w-5 ${
              index < rating
                ? 'text-yellow-400'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
        <span className="ml-2 text-lg font-semibold">{rating}/10</span>
      </div>
    );
  };

  return (
    <MainLayout>
      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-primary-600 dark:text-primary-400">
              {review.category.name}
            </div>
            <button
              onClick={() => {
                navigator.share({
                  title: review.title,
                  text: review.excerpt,
                  url: window.location.href,
                });
              }}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ShareIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {review.title}
          </h1>
          <div className="flex items-center justify-between text-gray-600 dark:text-gray-400 mb-4">
            <div className="flex items-center space-x-4">
              <img
                src={review.author.avatar || '/default-avatar.png'}
                alt={review.author.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {review.author.name}
                </div>
                <div className="text-sm">
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            {renderRating(review.rating)}
          </div>
        </header>

        {/* Main content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
          <div className="aspect-w-16 aspect-h-9 mb-8">
            <img
              src={review.coverImage}
              alt={review.title}
              className="rounded-lg object-cover w-full"
            />
          </div>
          <div
            className="mb-8"
            dangerouslySetInnerHTML={{ __html: review.content }}
          />
        </div>

        {/* Specifications */}
        <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Specifications</h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(review.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <dt className="font-medium text-gray-600 dark:text-gray-400">
                  {key}
                </dt>
                <dd className="text-gray-900 dark:text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <section className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
              Pros
            </h2>
            <ul className="space-y-2">
              {review.pros.map((pro, index) => (
                <li
                  key={index}
                  className="flex items-start text-gray-700 dark:text-gray-300"
                >
                  <span className="mr-2">✓</span>
                  {pro}
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-4">
              Cons
            </h2>
            <ul className="space-y-2">
              {review.cons.map((con, index) => (
                <li
                  key={index}
                  className="flex items-start text-gray-700 dark:text-gray-300"
                >
                  <span className="mr-2">✗</span>
                  {con}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Affiliate link */}
        {review.affiliateLink && (
          <div className="text-center mb-8">
            <a
              href={review.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Buy Now
            </a>
          </div>
        )}

        {/* Comments section */}
        <section className="border-t dark:border-gray-700 pt-8">
          <h2 className="text-2xl font-bold mb-8">Comments</h2>
          <div className="space-y-6">
            {review.comments.map((comment) => (
              <div
                key={comment.id}
                className="flex space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
              >
                <img
                  src={comment.author.avatar || '/default-avatar.png'}
                  alt={comment.author.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {comment.author.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { slug } = context.params as { slug: string };
    
    await Promise.all([
      store.dispatch(fetchReviewBySlug(slug)),
      store.dispatch(fetchCategories()),
    ]);

    return {
      props: {
        slug,
      },
    };
  }
);
