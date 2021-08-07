import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentUser } from '../store/auth'

import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './Auth'
import AppNavigation from './Drawer'

import AppTheme from './theme'
import storage from '../utility/secureCache'
import { logged } from '../store/auth'

import Map from '../components/Map'
function Routes() {
  const auth = useSelector(getCurrentUser)
  const dispatch = useDispatch()
  const restoreUser = async () => {
    const token = await storage.get('auth')
    if (!token) return
    dispatch({ type: logged, payload: { token } })
  }

  useEffect(() => {
    restoreUser()
  }, [])
  return (
    <NavigationContainer theme={AppTheme}>
      {auth.user ? <AppNavigation /> : <AuthNavigator />}
    </NavigationContainer>
  )
}

export default Routes
