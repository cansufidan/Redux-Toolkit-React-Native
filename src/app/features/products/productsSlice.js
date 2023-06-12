import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

//Async Api Request

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const response = await axios.get('https://dummyjson.com/products');

  return response.data.products;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers:{},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
        state.data = [];
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log('fetchProducts.fulfilled', action.payload);

        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.data = [];
      });
  },
});

export default productsSlice.reducer;