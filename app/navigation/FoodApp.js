import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/FoodApp/Home'

const Stack = createStackNavigator()

const FoodApp = () => (
  <Stack.Navigator screenOptions={{}}>
    <Stack.Screen name="Food List" component={Home} />
  </Stack.Navigator>
)

export default FoodApp
