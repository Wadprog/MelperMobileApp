import * as action from './api'
import { createSlice } from '@reduxjs/toolkit'
import env from '../config'
const url = env.endpoints.MAKE_PAYMENT
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
      console.log('Called ')
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
    productsPayRequestSucceeded: (state, action) => {
      state.loading = false
      state.orders = action.payload
      state.error = null
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
export const payOrders = () => (dispatch, getState) => {
  dispatch(
    action.apiCallBegan({
      url,
      data: getState().cart.orders,
      method: 'POST',
      onSuccess: Cart.actions.productsPayRequestSucceeded.type,
      onStart: Cart.actions.productsPayRequest.type,
      onError: Cart.actions.productsPayRequestFailed.type,
    })
  )
}
export const getProducts = (state) => state.cart.orders
