import { useState } from 'react'

import HttpCodes from '../api/HttpCodes'

export default  (apiFunc) => {
  const [data, setData] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const request = async (...args) => {
    setError(false)
    setLoading(true)
    const response = await apiFunc(...args)
    setLoading(false)
    if (response.data.statusCode === HttpCodes.NOT_FOUND)
      return setError(response.data.msg)
    setError(false)
    setData(response.data)
  }
  return { request, data, error, loading, setError }
}
