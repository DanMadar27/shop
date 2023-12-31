'use client';

import { createSlice } from '@reduxjs/toolkit';
import Product from '@/models/Product';

export interface ProductState {
  value: Product[];
}

const initialState: ProductState = {
    value: []
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProduct: (state: ProductState, action: any): void => {
      const product = action.payload;
      
      state.value = state.value.map( (p) => {
        return p.id === product.id ? product : p
      });
    },
    setProducts: (state: ProductState, action: any): void => {
      state.value = action.payload;
    },
  }
})

export const { setProduct, setProducts } = productSlice.actions;

export default productSlice.reducer;
