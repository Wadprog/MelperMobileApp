import React from 'react'
import { TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../config/colors'

function Dot({ active = true, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ marginHorizontal: 5, height: 45, marginBottom: 15 }}
    >
      <MaterialCommunityIcons
        size={48}
        name="circle-small"
        color={active ? colors.primary : colors.darkgray}
      />
    </TouchableOpacity>
  )
}

export default Dot
