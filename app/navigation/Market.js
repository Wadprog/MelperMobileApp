import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import MainList from '../screens/MainList'
import StoreScreen from '../screens/StoreScreen'
import StoreItemDetailsScreen from '../screens/StoreItemDetailsScreen'

const Stack = createStackNavigator()

const ProductNavigator = () => (
  <Stack.Navigator screenOptions={{  }}>
    <Stack.Screen name="Market" component={MainList} />
    <Stack.Screen name="Store" component={StoreScreen} />
    <Stack.Screen name="Item" component={StoreItemDetailsScreen} />
  </Stack.Navigator>
)

export default ProductNavigator
