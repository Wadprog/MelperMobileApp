import { createSlice } from '@reduxjs/toolkit'
import env from '../config'
import * as action from './api'
import moment from 'moment'

const url = env.endpoints.STORE
const initialState = {
  loading: false,
  list: {},
  lastFetch: null,
  error: null,
}

export const Store = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    storeDataRequested: (store) => {
      store.loading = true
    },
    storeDataReceived: (store, action) => {
      store.loading = false
      store.list[action.payload.name] = action.payload.data
    },

    storeDataFailed: (store, action) => {
      store.loading = false
      store.error = action.payload.msg
    },
  },
})

export const getStoreData = (storeName) => (dispatch, getState) => {
  //   const { lastFetch } = getState().authentication
  //   if (lastFetch) {
  //     const diff = moment().diff(moment(lastFetch), 'minutes')
  //     if (diff < env.requestRateInMinutes && user !== null) return
  //   }

  dispatch(
    action.apiCallBegan({
      url: url + storeName,
      method: 'GET',
      onSuccess: Store.actions.storeDataReceived.type,
      onStart: Store.actions.storeDataRequested.type,
      onError: Store.actions.storeDataFailed.type,
    })
  )
}

export const getCurrentStore = (name) => (state) => state.store.list[name]

export default Store.reducer
