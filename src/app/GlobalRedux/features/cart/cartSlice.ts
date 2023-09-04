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
        state.value = [...state.value, {...product, quantity: 1}];
      }
    },
    removeProduct: (state: cartState, action: any): void => {
      const product = action.payload;

      state.value = state.value.filter( (p) => {
        return p.id !== product.id
      }
      );
    },
    changeQuantity: (state: cartState, action: any): void => {
      const { product, quantity } = action.payload;

      state.value = state.value.map( (p) => {
        if (p.id === product.id) {
          p.quantity = quantity;
          return p;
        }

        return p;
      });
    }
  }
})

export const { addProduct, removeProduct, changeQuantity } = cartSlice.actions;

export default cartSlice.reducer;
