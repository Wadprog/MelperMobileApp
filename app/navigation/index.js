import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { getCurrentUser } from '../store/auth'

import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './Auth'
import AppNavigation from './App'
import AppTheme from './theme'
import AuthContext from '../auth/context'

import Restaurant from '../screens/FoodApp/Home'
function Routes() {
  const authContext = useContext(AuthContext)
  const auth = useSelector(getCurrentUser)
  return (
    <NavigationContainer theme={AppTheme}>
      {auth.user ? <AppNavigation /> : <AuthNavigator />}
    </NavigationContainer>
  )
}

export default Routes
