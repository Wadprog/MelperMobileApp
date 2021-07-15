import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Market from '../screens/MarketList'
import StoreScreen from '../screens/StoreScreen'
import StoreItemDetailsScreen from '../screens/StoreItemDetailsScreen'

import FoodApp from './FoodApp'
const Stack = createStackNavigator()

const ProductNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerRight: () => (
        <MaterialCommunityIcons
          size={24}
          name="plus"
          style={{ marginHorizontal: 12 }}
          onPress={() => console.log('More')}
        />
      ),
      headerLeft: () => (
        <MaterialCommunityIcons
          size={24}
          name="menu"
          style={{ marginHorizontal: 12 }}
          onPress={() => console.log('More')}
        />
      ),
      headerMiddle: () => (
        <MaterialCommunityIcons
          size={24}
          name="menu"
          style={{ marginHorizontal: 12 }}
          onPress={() => console.log('More')}
        />
      ),
    }}
  >
    <Stack.Screen name="Market" component={Market} />
    <Stack.Screen name="Store" component={StoreScreen} />
    <Stack.Screen name="Item" component={StoreItemDetailsScreen} />
    <Stack.Screen name="FoodStore" component={FoodApp} />
  </Stack.Navigator>
)

export default ProductNavigator
