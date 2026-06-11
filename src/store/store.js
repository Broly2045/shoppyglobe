// store.js — configures the Redux store and registers the cart reducer

import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'

export const store = configureStore({
  reducer: {
    // All cart and search state is managed under the 'cart' key
    cart: cartReducer,
  },
})