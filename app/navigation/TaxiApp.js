import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/taxi/Home'
import MapScreen from '../screens/taxi/TaxiMap'
const Stack = createStackNavigator()

import routes from './routes'
const TaxiApp = () => (
  <Stack.Navigator screenOptions={{}}>
    <Stack.Screen name={routes.TAXI_MAP} component={MapScreen} />
    <Stack.Screen name={routes.TAXI_HOME} component={Home} />
    {/* <Stack.Screen name="ScreenG1" component={Order} /> */}
  </Stack.Navigator>
)

export default TaxiApp
