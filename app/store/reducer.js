import { combineReducers } from 'redux'

import storeDetails from './storeDetails'
import authentication from './auth'
export default combineReducers({
  authentication,
  transactions: storeDetails,
})
