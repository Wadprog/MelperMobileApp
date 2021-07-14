import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'
import thunkMiddleware from 'redux-thunk'

import logger from '../middleware/logger'
import api from '../middleware/api'
export const store = configureStore({
  reducer,
  middleware: [thunkMiddleware, api],
})
