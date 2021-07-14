import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SocialNetwork from '../screens/SocialNetwork'

const Stack = createStackNavigator()

const Social = () => (
  <Stack.Navigator screenOptions={{}}>
    <Stack.Screen name="My Account" component={SocialNetwork} />
  </Stack.Navigator>
)

export default Social