import { combineReducers } from 'redux'

import authentication from './auth'
import store from './store'
import market from './markets'
import cart from './cart'
import map from './map'
export default combineReducers({
  authentication,
  market,
  store,
  cart,
  map,
})
