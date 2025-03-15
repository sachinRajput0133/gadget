import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '..';
import CONFIG from '@config/index';

// Define the category interface
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string | null;
  subcategories?: Category[];
}

// Define the state interface
interface CategoryState {
  items: {
    data: Category[] | null;
    count: number;
  };
  currentCategory: Category | null;
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

// Define the initial state
const initialState: CategoryState = {
  items: {
    data: null,
    count: 0,
  },
  currentCategory: null,
  loading: false,
  error: null,
  lastFetched: null
};

// Create an async thunk for fetching categories
export const fetchCategories = createAsyncThunk<
  { data: Category[]; count: number },
  void,
  { rejectValue: string; state: RootState }
>('categories/fetchCategories', async (_, { rejectWithValue, getState }) => {
  try {
    // Get the current state
    const state = getState();
    
    // Check if we've recently fetched categories (within the last 60 seconds)
    const now = Date.now();
    const lastFetched = state.categories.lastFetched;
    if (lastFetched && now - lastFetched < 60000 && state.categories.items.data) {
      // Return the existing items to avoid too many requests
      return state.categories.items;
    }
    
    const response = await axios.get(`${CONFIG.NEXT_PUBLIC_API_URL}/api/categories`);
    const categories = response.data.data || [];
    
    // Organize categories into a hierarchy
    const categoryMap: Record<string, Category> = {};
    const rootCategories: Category[] = [];
    
    // First pass: create a map of all categories
    categories.forEach((category: Category) => {
      categoryMap[category.id] = {...category, subcategories: []};
    });
    
    // Second pass: build the hierarchy
    categories.forEach((category: Category) => {
      if (category.parentId && categoryMap[category.parentId]) {
        // This is a subcategory - add it to its parent
        if (!categoryMap[category.parentId].subcategories) {
          categoryMap[category.parentId].subcategories = [];
        }
        categoryMap[category.parentId].subcategories?.push(categoryMap[category.id]);
      } else {
        // This is a root category
        rootCategories.push(categoryMap[category.id]);
      }
    });
    
    return {
      data: rootCategories,
      count: rootCategories.length,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // If rate limited (429), add a delay and still return any existing data
      if (error.response?.status === 429) {
        const state = getState();
        if (state.categories.items.data) {
          return state.categories.items;
        }
      }
      return rejectWithValue(error.response?.data?.message || 'Network error');
    }
    return rejectWithValue('Unknown error occurred');
  }
});

// Create an async thunk for fetching a single category by slug
export const fetchCategoryBySlug = createAsyncThunk<
  Category,
  string,
  { rejectValue: string }
>('categories/fetchCategoryBySlug', async (slug, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${CONFIG.NEXT_PUBLIC_API_URL}/api/categories/${slug}`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || 'Network error');
    }
    return rejectWithValue('Unknown error occurred');
  }
});

// Create the category slice
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCategoryErrors: (state) => {
      state.error = null;
    },
    clearCurrentCategory: (state) => {
      state.currentCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error occurred';
        // Don't clear existing items on error, so we can still show cached data
      })
      .addCase(fetchCategoryBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCategory = action.payload;
      })
      .addCase(fetchCategoryBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error occurred';
      });
  },
});

// Export the actions
export const { clearCategoryErrors, clearCurrentCategory } = categorySlice.actions;

// Export the reducer
export default categorySlice.reducer;
