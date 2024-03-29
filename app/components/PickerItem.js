import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import Text from './AppText'
function PickerItem({ label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
})
export default PickerItem
