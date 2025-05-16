import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { toast } from 'react-toastify';

// Fetch all products at once (no pagination in API)
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/products');
      return response.data;
    } catch (error) {
      toast.error('Failed to fetch products');
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

// Add a new product
export const addProduct = createAsyncThunk(
  'products/add',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/products', productData);
      toast.success('Product added successfully');
      return response.data;
    } catch (error) {
      toast.error('Failed to add product');
      return rejectWithValue(error.response?.data?.message || 'Failed to add product');
    }
  }
);

// Update a product
export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/products/${id}`, productData);
      toast.success('Product updated successfully');
      return response.data;
    } catch (error) {
      toast.error('Failed to update product');
      return rejectWithValue(error.response?.data?.message || 'Failed to update product');
    }
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/products/${id}`);
      toast.success('Product deleted successfully');
      return id;
    } catch (error) {
      toast.error('Failed to delete product');
      return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    pageSize: 5,  // Default number of products per page
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
      state.totalPages = Math.ceil(state.list.length / state.pageSize);  // Recalculate total pages
      state.currentPage = 1;  // Reset to the first page after page size change
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];        
        state.totalPages = Math.ceil(state.list.length / state.pageSize);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.list = [];
      })

      // Add Product
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
        state.totalPages = Math.ceil(state.list.length / state.pageSize);  // Update total pages
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((product) => product.id !== action.payload);
        state.totalPages = Math.ceil(state.list.length / state.pageSize);  // Update total pages
        if (state.currentPage > state.totalPages) {
          state.currentPage = state.totalPages;  // Adjust current page if last page is empty
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, setPageSize } = productSlice.actions;
export default productSlice.reducer;
