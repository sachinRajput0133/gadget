import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

interface UiState {
  isDarkMode: boolean;
  isMenuOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UiState = {
  isDarkMode: false,
  isMenuOpen: false,
  isLoading: false,
  error: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { toggleTheme, toggleMenu, setLoading, setError } = uiSlice.actions;

export const selectDarkMode = (state: RootState) => state.ui.isDarkMode;
export const selectMenuOpen = (state: RootState) => state.ui.isMenuOpen;
export const selectLoading = (state: RootState) => state.ui.isLoading;
export const selectError = (state: RootState) => state.ui.error;

export default uiSlice.reducer;
