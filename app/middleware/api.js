import axios from 'axios'
import * as actions from '../store/api'
import env from '../config'

const api = (store) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action)
  const { onSuccess, onError, onStart } = action.payload
  if (onStart) store.dispatch({ type: onStart })
  next(action)
  try {
    const response = await axios({
      baseURL: env.BASE_URL,
      ...action.payload,
    })
  
    console.log('FINE')
    store.dispatch({
      type: actions.apiCallSucceeded.type,
      payload: response.data,
    })
    if (onSuccess) store.dispatch({ type: onSuccess, payload: response.data })
  } catch (error) {
    store.dispatch({ type: actions.apiCallFailed.type, payload: error.message })
    if (onError) store.dispatch({ type: onError, payload: error.message })
  }
}

const Head = (headerKey, headerVal) =>
  (axios.defaults.headers.common[headerKey] = headerVal)

export default api
export const setHeader = Head
