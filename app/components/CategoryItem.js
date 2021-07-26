import React from 'react'
import styled from 'styled-components/native'
import { TouchableHighlight } from 'react-native'

// Custom dependencies
import colors from '../config/colors'
import { FontAwesome } from '@expo/vector-icons'
import Text from './AppText'

const Container = styled.View`
  margin-horizontal: 5px;
  width: 90px;
  overflow: hidden;
  align-self: center;
`
const Name = styled(Text)`
  margin-top: 3px;
  font-size:15px
  text-align: center;
`
const Icon = styled(FontAwesome)`
  text-align: center;
`
const IconContainer = styled.View`
  background-color: ${colors.white};
  width: 60px;
  height: 60px;
  border-radius: 999px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`
const Image = styled.Image`
  width: 70px;
  height: 70px;
`
function CategoryItem({ icon, photo, name, color, onPress }) {
  return (
    <TouchableHighlight onPress={onPress} underlayColor={colors.light}>
      <Container>
        {
          <IconContainer>
            {photo ? (
              <Image source={photo} />
            ) : (
              <Icon name={icon} size={34} color={color} />
            )}
          </IconContainer>
        }
        <Name>{name}</Name>
      </Container>
    </TouchableHighlight>
  )
}

export default CategoryItem
