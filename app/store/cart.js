import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  orders: [],
}
const Cart = createSlice({
  name: 'shopingCart',
  initialState,
  reducers: {
    productAdded: (orders, action) => {
      orders.orders.push(action.payload)
    },
    productRemoved: (state, action) => {
      state.orders = state.orders.map((order) => {
        if (order != action.payload) return order
      })
    },
  },
})

export default Cart.reducer
export const addProduct = Cart.actions.productAdded.type
export const removeProduct = Cart.actions.productRemoved.type

export const getProducts = (state) => state.cart.orders
