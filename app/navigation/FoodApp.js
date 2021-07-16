import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/foodApp/FoodList'
import FoodDetails from '../screens/foodApp/FoodDetails'
// import Order from '../screens/foodAppRaw/screens/OrderDelivery'
const Stack = createStackNavigator()

const FoodApp = () => (
  <Stack.Navigator screenOptions={{}}>
    <Stack.Screen name="Food List" component={Home} />
    <Stack.Screen name="ScreenG" component={FoodDetails} />
    {/* <Stack.Screen name="ScreenG1" component={Order} /> */}
  </Stack.Navigator>
)

export default FoodApp
