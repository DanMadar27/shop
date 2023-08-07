'use client';

import { createSlice } from '@reduxjs/toolkit';
import Product from '@/models/Product';

export interface cartState {
  value: Product[];
}

const initialState: cartState = {
    value: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state: cartState, action: any): void => {
      const product = action.payload;
      
      if (!state.value.find( (p) => p.id === product.id)) {
        state.value = [...state.value, {...product, amount: 1}];
      }
    },
    removeProduct: (state: cartState, action: any): void => {
      const product = action.payload;

      state.value = state.value.filter( (p) => {
        return p.id !== product.id
      }
      );
    },
    changeAmount: (state: cartState, action: any): void => {
      const { product, amount } = action.payload;

      state.value = state.value.map( (p) => {
        if (p.id === product.id) {
          p.amount = amount;
          return p;
        }

        return p;
      });
    }
  }
})

export const { addProduct, removeProduct, changeAmount } = cartSlice.actions;

export default cartSlice.reducer;
