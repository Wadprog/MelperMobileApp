import React, { useState } from 'react'

//Custom dependencies
import Routes from './app/navigation'
import AuthContext from './app/auth/context'
import { Provider } from 'react-redux'
import { store } from './app/store'

export default function App() {
  const [user, setUser] = useState()
  return (
    <Provider store={store}>
      <AuthContext.Provider value={{ user, setUser }}>
        <Routes />
      </AuthContext.Provider>
    </Provider>
  )
}
