import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  orders: [],
  loading: false,
  error: null,
}
const Cart = createSlice({
  name: 'shopingCart',
  initialState,
  reducers: {
    productAdded: (orders, action) => {
      const index = orders.orders.findIndex(
        (order) => order.id == action.payload.id
      )
      if (index > -1) orders.orders[index].amountInCart += 1
      else {
        const newOrder = { ...action.payload, amountInCart: 1 }
        orders.orders.push(newOrder)
      }
    },
    productRemoved: (state, action) => {
      const firstIndex = state.orders.findIndex(
        (order) => order.id == action.payload
      )

      if (state.orders[firstIndex].amountInCart == 1)
        state.orders.splice(firstIndex, 1)
      else state.orders[firstIndex].amountInCart -= 1
    },
    productsPayRequest: (sate, action) => {
      sate.loading = true
    },
    productsPayRequestSucceeded: (sate, action) => {
      sate.loading = false
      state.orders = action.payload
      sate.error=null
    },
    productsPayRequestFailed: (sate, action) => {
      sate.loading = false
      state.orders = []
      state.error = action.payload
    },
  },
})

export default Cart.reducer
export const addProduct = Cart.actions.productAdded.type
export const removeProduct = Cart.actions.productRemoved.type

export const getProducts = (state) => state.cart.orders
