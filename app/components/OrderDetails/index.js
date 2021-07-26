import React from 'react'
import OrderDetails from './Big'
import Little from './Little'
const index = ({ styleSize = 'big', ...rest }) =>
  styleSize === 'big' ? <OrderDetails {...rest} /> : <Little {...rest} />

export default index
