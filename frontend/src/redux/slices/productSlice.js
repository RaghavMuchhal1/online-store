import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

// Fetch products
export const fetchProducts = createAsyncThunk('products/fetch', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/products');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
});

// Add a new product
export const addProduct = createAsyncThunk('products/add', async (productData, { rejectWithValue }) => {
    try {
        const response = await axios.post('/products', productData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to add product');
    }
});

// Delete a product
export const deleteProduct = createAsyncThunk('products/delete', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`/products/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
    }
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, productData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/products/${id}`, productData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to update product');
    }
});

const productSlice = createSlice({
    name: 'products',
    initialState: { list: [], loading: false, error: null },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.list.findIndex((product) => product.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.list = state.list.filter((product) => product.id !== action.payload);
            });


    },
});

export default productSlice.reducer;
