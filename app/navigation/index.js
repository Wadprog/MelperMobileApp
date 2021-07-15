import React from 'react'
import { useSelector } from 'react-redux'
import { getCurrentUser } from '../store/auth'

import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './Auth'
import AppNavigation from './Drawer'

import AppTheme from './theme'

function Routes() {
  const auth = useSelector(getCurrentUser)
  return (
    <NavigationContainer theme={AppTheme}>
      {auth.user ? <AppNavigation /> : <AuthNavigator />}
    </NavigationContainer>
  )
}

export default Routes
