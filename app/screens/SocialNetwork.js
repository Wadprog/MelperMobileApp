import React from 'react'

import { StyleSheet, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
// Customs imports

import Screen from '../components/Screen'
import Text from '../components/AppText'
//Main Function to Return
function Account({ navigation }) {
  return (
    <Screen>
      <Text> I am the Social Network screen</Text>
    </Screen>
  )
}

export default Account
