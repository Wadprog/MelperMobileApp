import React from 'react'
// Dependencies
import styled from 'styled-components/native'
import { TouchableHighlight } from 'react-native'

//Custom dependencies
import color from '../config/colors'
import { appLogo } from '../config/image'

const Button = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 999;
  background-color: ${color.primary};
  bottom: 20px;
  border-color: ${color.white};
  border-width: 10px;
  align-items: center;
  justify-content: center;
`
const Logo = styled.Image`
  width: 40px;
  height: 30px;
`
export default function MainButton({ onPress }) {
  return (
    <TouchableHighlight onPress={onPress}>
      <Button>
        <Logo source={appLogo} />
      </Button>
    </TouchableHighlight>
  )
}
