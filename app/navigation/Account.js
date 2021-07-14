import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import AccountScreen from '../screens/AccountScreen'

const Stack = createStackNavigator()

const Account = () => (
  <Stack.Navigator screenOptions={{}}>
    <Stack.Screen name="My Account" component={AccountScreen} />
  </Stack.Navigator>
)

export default Account
