'use client';

import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products/productSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
