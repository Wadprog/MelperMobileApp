import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
import env from '../config'
import * as action from './api'
import moment from 'moment'
import storage from '../utility/secureCache'
import { setHeader } from '../middleware/api'
const url = env.endpoints.LOG_IN
const registerUrl = env.endpoints.REGISTER
const { EXPECTED_HEADER } = env
const initialState = {
  loading: false,
  user: null,
  lastFetch: null,
  token: null,
  error: null,
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
      state.token = action.payload.token
      setHeader(EXPECTED_HEADER, action.payload.token)
      state.user = jwtDecode(action.payload.token)
      state.lastFetch = Date.now
      storage.set('auth', action.payload.token)
    },

    LoginFailed: (state, action) => {
      state.loading = false
      state.token = null
      state.error = action.payload
    },
    LogOut: (state) => {
      state.loading = false
      state.token = null
      state.user = null
      storage.remove('auth')
    },
  },
})

export const Register = (newUser) => (dispatch) => {
  console.log('Register')
  dispatch(
    action.apiCallBegan({
      url: registerUrl,
      data: newUser,
      method: 'POST',
      onSuccess: Auth.actions.loginSucceed.type,
      onStart: Auth.actions.loginRequested.type,
      onError: Auth.actions.LoginFailed.type,
    })
  )
}
export const Login = (credentials) => (dispatch, getState) => {
  const { lastFetch } = getState().authentication
  if (lastFetch) {
    const diff = moment().diff(moment(lastFetch), 'minutes')
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

export const logout = () => (dispatch) => dispatch(Auth.actions.LogOut())
export const getCurrentUser = (state) => state.authentication
export const logged = Auth.actions.loginSucceed.type
export default Auth.reducer
