import axios from 'axios'

import * as actions from '../store/api'
import env from '../config'
const api = (store) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action)
  const { onSuccess, onError, onStart } = action.payload
  console.log({ onStart })
  if (onStart) store.dispatch({ type: onStart })
  next(action)
  console.log({ onError })
  try {
    const response = await axios({
      baseURL: env.BASE_URL,
      ...action.payload,
    })
    console.log({ data: response.data })
    store.dispatch({
      type: actions.apiCallSucceeded.type,
      payload: response.data,
    })
    if (onSuccess) store.dispatch({ type: onSuccess, payload: response.data })
  } catch (error) {
    console.log({ error })
    store.dispatch({ type: actions.apiCallFailed.type, payload: error.message })
    if (onError) store.dispatch({ type: onError, payload: error.message })
  }
}

export default api
