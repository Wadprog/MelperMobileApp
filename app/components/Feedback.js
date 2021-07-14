import React from 'react'
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import Colors from '../config/colors'
function Feedback({
  iconName,
  active = false,
  activeColor = Colors.white,
  IdleColor = Colors.lightGray,
  iconColor = Colors.mediumGray,
  onPress,
}) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View
        style={{
          padding: 5,
          backgroundColor: active ? activeColor : IdleColor,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
        }}
      >
        <FontAwesome name={iconName} size={12} color={iconColor} />
      </View>
    </TouchableNativeFeedback>
  )
}
const styles = StyleSheet.create({
  wrapper: {},
})

export default Feedback
