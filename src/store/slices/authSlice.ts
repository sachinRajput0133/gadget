import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '@/store';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      const { token, user } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      
      // Set default Authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return { token, user };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/register', userData);
      const { token, user } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      
      // Set default Authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return { token, user };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Registration failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/api/auth/logout');
      
      // Clear token from localStorage
      localStorage.removeItem('token');
      
      // Remove Authorization header
      delete axios.defaults.headers.common['Authorization'];
      
      return;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Logout failed');
    }
  }
);

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      // Set default Authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const response = await axios.get('/api/auth/me');
      return { token, user: response.data };
    } catch (error) {
      // Clear invalid token
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Authentication check failed');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectIsAuthenticated = (state: RootState) => !!state.auth.token;
export const selectIsAdmin = (state: RootState) => state.auth.user?.role === 'admin';

export default authSlice.reducer;
