import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('role');
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/users/login', credentials);
      const { token, username, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('role', role);
      return { token, username, role };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/users/signup', userData);
      const { token, username, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('role', role);
      return { token, username, role };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || null,
    role: localStorage.getItem('role') || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.username = null;
      state.role = null;
      removeToken();
      window.location.href = '/login';
    },
    checkAuth: (state) => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      const role = localStorage.getItem('role');
      if (token) {
        state.token = token;
        state.username = username;
        state.role = role;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.username = action.payload.username;
        state.role = action.payload.role;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.username = action.payload.username;
        state.role = action.payload.role;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
