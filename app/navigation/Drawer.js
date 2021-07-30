import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import DrawerContent from '../screens/DrawerContent'
import BottomTabNavigator from './Bottom'
import routes from './routes'


const Drawer = createDrawerNavigator()

const DrawerNav = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name={routes.BOTTOM_TAB} component={BottomTabNavigator} />
    </Drawer.Navigator>
  )
}

export default DrawerNav
