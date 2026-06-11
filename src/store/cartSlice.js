// cartSlice.js — manages all cart and search state using Redux Toolkit

import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    // Array of cart items: each item is a product + quantity
    items: [],
    // Search query string used to filter products on the home page
    searchQuery: '',
  },
  reducers: {
    // Add a product to cart — if it already exists, increase quantity
    addToCart: (state, action) => {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      )
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },

    // Remove a product from cart entirely by its id
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      )
    },

    // Increase quantity of a specific cart item by 1
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload)
      if (item) {
        item.quantity += 1
      }
    },

    // Decrease quantity — minimum quantity is 1, never goes below
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload)
      if (item && item.quantity > 1) {
        item.quantity -= 1
      }
    },

    // Clear all items from cart (used after order is placed)
    clearCart: (state) => {
      state.items = []
    },

    // Update the search query (used to filter products in ProductList)
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
  },
})

// Export all actions for use in components
export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  setSearchQuery,
} = cartSlice.actions

// ── Selectors ──
// Returns all cart items
export const selectCartItems = (state) => state.cart.items

// Returns total number of unique items in cart (for the cart icon badge)
export const selectCartCount = (state) => state.cart.items.length

// Returns the total price of all cart items
export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

// Returns the current search query
export const selectSearchQuery = (state) => state.cart.searchQuery

export default cartSlice.reducer