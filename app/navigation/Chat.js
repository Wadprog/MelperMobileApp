import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ChatScreen from '../screens/ChatScreen'

const Stack = createStackNavigator()

const ChatNavigator = () => (
  <Stack.Navigator screenOptions={{}}>
    <Stack.Screen name="My Account" component={ChatScreen} />
  </Stack.Navigator>
)

export default ChatNavigator