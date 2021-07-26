import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/clothes'

const Stack = createStackNavigator()

const ClothesApp = () => (
  <Stack.Navigator>
    <Stack.Screen name="Clothes List" component={Home} />
  </Stack.Navigator>
)

export default ClothesApp
