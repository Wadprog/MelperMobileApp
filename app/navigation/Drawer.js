import React from 'react'
import { Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'

// Importing the App Navigators.
import AccountNavigator from './Account'
import MarketNavigator from './Market'
import ChatNavigator from './Chat'
import SocialNavigator from './SocialMedia'
import MiddleNavigator from './Middle'
//import Drawer from './Drawer'

//Import the drwer design library
import DrawerContent from '../screens/DrawerContent'

import routes from './routes'

import BottomTabNavigator from './Bottom'

const Drawer = createDrawerNavigator()

const DrawerNav = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent />}>
      <Drawer.Screen name="Tabs-1" component={BottomTabNavigator} />
    </Drawer.Navigator>
  )
}

export default DrawerNav
