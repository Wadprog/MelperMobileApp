import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/secondHand/Home'
import ArticleDetails from '../screens/secondHand/ItemDetail'
// import Order from '../screens/foodAppRaw/screens/OrderDelivery'
const Stack = createStackNavigator()

const ArticleApp = () => (
  <Stack.Navigator screenOptions={{}}>
    <Stack.Screen name="Article List" component={Home} />
    <Stack.Screen name="Article Details" component={ArticleDetails} />
    {/* <Stack.Screen name="ScreenG1" component={Order} /> */}
  </Stack.Navigator>
)

export default ArticleApp
