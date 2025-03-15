import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '@/store';
import CONFIG from '@config/index';

// Define the review interface
interface Review {
  id: string;
  title: string;
  content: string;
  slug: string;
  rating: number;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
  excerpt: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

// Define the state interface
interface ReviewsState {
  items: Review[] | null;
  selectedReview: Review | null;
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

// Define the initial state
const initialState: ReviewsState = {
  items: null,
  selectedReview: null,
  loading: false,
  error: null,
  lastFetched: null
};

// Define query parameters interface
interface QueryParams {
  page?: number;
  limit?: number;
  categoryId?: string;
}

// Create an async thunk for fetching reviews
export const fetchReviews = createAsyncThunk<
  Review[],
  QueryParams,
  { rejectValue: string; state: RootState }
>('reviews/fetchReviews', async (queryParams, { rejectWithValue, getState }) => {
  try {
    console.log("🚀 ~ fetchReviews ~ queryParams:", CONFIG.NEXT_PUBLIC_API_URL);
    
    // Get the current state
    const state = getState();
    
    // Check if we've recently fetched reviews (within the last 30 seconds)
    const now = Date.now();
    const lastFetched = state.reviews.lastFetched;
    if (lastFetched && now - lastFetched < 30000 && state.reviews.items) {
      // Return the existing items to avoid too many requests
      return state.reviews.items;
    }
    
    const {
      page = 1,
      limit = 10,
      categoryId,
    } = queryParams;

    const queryParamsString = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(categoryId && { categoryId }),
    });
    
    const response = await axios.get(`${CONFIG.NEXT_PUBLIC_API_URL}/api/reviews?${queryParamsString}`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // If rate limited (429), add a delay and still return any existing data
      if (error.response?.status === 429) {
        const state = getState();
        if (state.reviews.items) {
          return state.reviews.items;
        }
      }
      return rejectWithValue(error.response?.data?.message || 'Network error');
    }
    return rejectWithValue('Unknown error occurred');
  }
});

// Create an async thunk for fetching a single review
export const fetchReviewBySlug = createAsyncThunk<
  Review,
  string,
  { rejectValue: string }
>('reviews/fetchReviewBySlug', async (slug, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${CONFIG.NEXT_PUBLIC_API_URL}/api/reviews/${slug}`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || 'Network error');
    }
    return rejectWithValue('Unknown error occurred');
  }
});

// Create the review slice
const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearReviewErrors: (state) => {
      state.error = null;
    },
    clearSelectedReview: (state) => {
      state.selectedReview = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error occurred';
        // Don't clear existing items on error, so we can still show cached data
      })
      .addCase(fetchReviewBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedReview = action.payload;
      })
      .addCase(fetchReviewBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error occurred';
      });
  },
});

// Export the actions
export const { clearReviewErrors, clearSelectedReview } = reviewSlice.actions;

// Export selectors
export const selectReviews = (state: RootState) => state.reviews.items;
export const selectSelectedReview = (state: RootState) => state.reviews.selectedReview;
export const selectReviewsLoading = (state: RootState) => state.reviews.loading;
export const selectReviewsError = (state: RootState) => state.reviews.error;

// Export the reducer
export default reviewSlice.reducer;
