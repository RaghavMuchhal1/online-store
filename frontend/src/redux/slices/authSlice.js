import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/users/login', credentials);
      const token = response.data.token;
      const decoded = jwtDecode(token);
      localStorage.setItem('token', token);
      localStorage.setItem('role', decoded.role);
      toast.success('Login successful');
      return { user: decoded, token };
    } catch (error) {
      toast.error('Login failed');
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Signup user
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/users/signup', userData);
      const token = response.data.token;
      const decoded = jwtDecode(token);

      // Store token and role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', decoded.role);
      toast.success('Signup successful');
      return { user: decoded, token };
    } catch (error) {
      toast.error('Signup failed');
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

// Check authentication status from local storage
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: token || null,
    role: role || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      toast.success('Logged out successfully');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.user.role;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.user.role;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
