import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'
import env from '../config'
import * as action from './api'

const initialState = {
  loading: false,
  list: [],
  lastFetch: null,
}

const url = env.endpoints.MARKET

const Market = createSlice({
  name: 'market',
  initialState,
  reducers: {
    marketListRequest: (market) => {
      market.loading = true
    },
    marketListReceived: (market, action) => {
      market.loading = false
      market.list = action.payload
      market.lastFetch = Date.now()
    },
    marketListRequestFailed: (market) => {
      market.loading = false
      market.list = []
      market.lastFetch = null
    },
  },
})

export const getMarketList = () => (dispatch, getState) => {
  console.log(getState())
  const { lastFetch } = getState().market

  if (lastFetch) {
    const diff = moment().diff(moment(lastFetch), 'minutes')
    if (diff < env.requestRateInMinutes) return
  }

  dispatch(
    action.apiCallBegan({
      url,
      method: 'GET',
      onSuccess: Market.actions.marketListReceived.type,
      onStart: Market.actions.marketListRequest.type,
      onError: Market.actions.marketListRequestFailed.type,
    })
  )
}
export const getMarkets = (state) => state.market
export default Market.reducer
