import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Stupid from '../screens/Stupid'

const Stack = createStackNavigator()

const ChatNavigator = () => (
  <Stack.Navigator screenOptions={{}}>
    <Stack.Screen name="My Account" component={Stupid} />
  </Stack.Navigator>
)

export default ChatNavigator