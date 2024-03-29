import React from 'react'
// Dependencies
import { View, TextInput, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// Customs Dependencies
import defaultStyles from '../config/styles'
// Main Function
function AppInput({ style, icon, ...otherProps }) {
  return (
    <View style={[styles.container, style]}>
      {icon && (
        <MaterialCommunityIcons name={icon} size={20} style={styles.icon} />
      )}
      <TextInput {...otherProps} style={[styles.input, defaultStyles.text]} />
    </View>
  )
}
// Styles
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: 'row',
    marginVertical: 10,
    overflow: 'hidden',
    padding: 15,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },

  input: {
    color: defaultStyles.colors.dark,
    marginLeft: 5,
    width: '100%',
  },
})
export default AppInput
