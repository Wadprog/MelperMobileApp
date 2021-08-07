import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import Market from '../screens/MarketList'
import Cart from '../screens/Cart'
import StoreScreen from '../screens/StoreScreen'
import StoreItemDetailsScreen from '../screens/StoreItemDetailsScreen'

import FoodApp from './FoodApp'
import SecondHand from './SecondHand'
import Clothes from './ClothesApp'
import Taxi from './TaxiApp'
import routes from './routes'
const Stack = createStackNavigator()

const ProductNavigator = () => {
  const navigation = useNavigation()
  return (
    <Stack.Navigator
      screenOptions={{
        title: '',
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
            onPress={() => navigation.openDrawer()}
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
      <Stack.Screen name="SecondHand" component={SecondHand} />
      <Stack.Screen name="Clothes" component={Clothes} />
      <Stack.Screen name="cart" component={Cart} />
      <Stack.Screen
        name={routes.TAXI_HOME}
        component={Taxi}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default ProductNavigator
