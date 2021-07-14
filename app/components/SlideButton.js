import React from 'react'
import { TouchableHighlight } from 'react-native'
import styled from 'styled-components/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Wrapper = styled.View``

export default function SlideButton({ onPress, ...rest }) {
  return (
    <TouchableHighlight onPress={onPress}>
      <Wrapper>
        <MaterialCommunityIcons {...rest} />
      </Wrapper>
    </TouchableHighlight>
  )
}
