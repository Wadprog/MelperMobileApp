// Dependencies
import React from 'react'
import { Text } from 'react-native'
// Customs Dependencies
import defaultStyles from '../config/styles'
// Main function
function AppText({ children, style }) {
  return <Text style={[defaultStyles.text, style]}>{children}</Text>
}

export default AppText
