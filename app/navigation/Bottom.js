import React from 'react'
import { Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// Importing the App Navigators.
import AccountNavigator from './Account'
import MarketNavigator from './Market'
import ChatNavigator from './Chat'
import SocialNavigator from './SocialMedia'
import MiddleNavigator from './Middle'
// Middle Button Menu
import MiddleButton from './MainButton'
import routes from './routes'

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={routes.MARKET}
        component={MarketNavigator}
        options={{
          headerTitle: "() => <Text>Hell</Text>",
          headerRight: () => (
            <MaterialCommunityIcons size={34} name="home" color="red" />
          ),
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="shopping" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.CHAT}
        component={ChatNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="chat" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.HOME}
        component={MiddleNavigator}
        options={({ navigation }) => ({
          tabBarButton: ({ size, color }) => (
            <MiddleButton
              size={size}
              color={color}
              onPress={() => navigation.navigate(routes.HOME)}
            />
          ),
        })}
      />
      <Tab.Screen
        name={routes.SOCIAL}
        component={SocialNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="camera-iris"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name={routes.ACCOUNT}
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
export default BottomTabNavigator
