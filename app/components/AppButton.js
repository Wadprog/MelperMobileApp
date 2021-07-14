import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../config/colors'
import styled from 'styled-components/native'
const Wrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
function AppButton({ icon, title, color = 'primary', onPress, style }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }, { ...style }]}
      onPress={onPress}
    >
      <Wrapper>
        {icon && <MaterialCommunityIcons {...icon} size={20} />}
        <Text style={styles.text}>{title}</Text>
      </Wrapper>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '100%',
    marginVertical: 5,
  },
  text: {
    color: colors.white,
    marginLeft: 2,
  },
})
export default AppButton
