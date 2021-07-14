import { createSlice } from '@reduxjs/toolkit'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import moment from 'moment'
import env from '../config/'
const url = env.endpoints.transactions

import * as action from './api'

const initialState = { loading: false, list: [], lastFetch: null, error: null }

export const Transaction = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    transactionsRequested: (expense) => {
      expense.loading = true
    },
    transactionsReceived: (expenses, action) => {
      expenses.loading = false
      expenses.list = action.payload
      expenses.lastFetch = Date.now()
    },
    removeTransaction: (expenses, action) => {
      expenses.list = expenses.list
        .filter((expense) => expense.id !== action.payload.id)
        .push(action.payload)
    },
    transactionsFailed: (expenses, action) => {
      expenses.loading = false
      expenses.list = []
      expenses.error = action.payload
    },
    testError: (expense) => {
      expense.loading = expense.loading
    },
  },
})

export const loadTransaction = () => (dispatch, getState) => {
  const { lastFetch } = getState().transactions
  console.log({lastFetch})
  if (lastFetch) {
    const diff = moment().diff(moment(lastFetch), 'minutes')
    console.log({diff})
    if (diff < env.requestRateInMinutes) return
  }

  dispatch(
    action.apiCallBegan({
      url,
      method: 'GET',
      onSuccess: Transaction.actions.transactionsReceived.type,
      onStart: Transaction.actions.transactionsRequested.type,
      onError: Transaction.actions.transactionsFailed.type,
    })
  )
}
// Action creators are generated for each case reducer function
export const { transactionReceived, removeExpense } = Transaction.actions
export const transactionList = (state) => {
  console.log({ state })
  state.transaction
}

export default Transaction.reducer
