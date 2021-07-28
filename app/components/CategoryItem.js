import React from 'react'
import styled from 'styled-components/native'
import { TouchableHighlight } from 'react-native'

// Custom dependencies
import colors from '../config/colors'
import sizes from '../config/size'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Text from './AppText'

const Container = styled.View`
  margin-horizontal: 5px;
  width: ${sizes.maxMargin1 + sizes.margin1}px;
  overflow: hidden;
  align-self: center;
  justify-content: center;
`
const Name = styled(Text)`
  margin-top: ${sizes.base/2}px;
  font-size:${sizes.font}px;
  text-align: center;
  margin-right:${sizes.margin1}px
`

const IconContainer = styled.View`
  background-color: ${colors.white};
  width: ${sizes.maxMargin1}px;
  height: ${sizes.maxMargin1}px;
  border-radius: ${sizes.maxMargin}px;
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
              <MaterialCommunityIcons
                name={icon}
                size={sizes.maxMargin1/2}
                color={color}
              />
            )}
          </IconContainer>
        }
        <Name>{name}</Name>
      </Container>
    </TouchableHighlight>
  )
}

export default CategoryItem
