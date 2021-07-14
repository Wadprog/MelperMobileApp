import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'

import env from '../config'
import * as action from './api'

const url = env.endpoints.LOG_IN
const initialState = {
  loading: false,
  user: null,
  lastFetch: null,
  token: null,
}

export const Auth = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    loginRequested: (state) => {
      state.loading = true
    },
    loginSucceed: (state, action) => {
      state.loading = false
      state.token = action.payload
      state.user = jwtDecode(action.payload)
    },

    LoginFailed: (state) => {
      state.loading = false
      state.token = null
      state.user = null
    },
    LogOut: (state) => {
      state.loading = false
      state.token = null
      state.user = null
    },
  },
})

export const Login = (credentials) => (dispatch, getState) => {
  const { lastFetch } = getState().transactions
  if (lastFetch) {
    const diff = moment().diff(moment(lastFetch), 'minutes')
    console.log({ diff })
    if (diff < env.requestRateInMinutes && user !== null) return
  }

  dispatch(
    action.apiCallBegan({
      url,
      data: credentials,
      method: 'POST',
      onSuccess: Auth.actions.loginSucceed.type,
      onStart: Auth.actions.loginRequested.type,
      onError: Auth.actions.LoginFailed.type,
    })
  )
}

export const getCurrentUser = (state) => state.authentication

export default Auth.reducer
