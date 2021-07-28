import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styled from 'styled-components/native'
import env from '../../config/index'
//Custom dependencies
import colors from '../../config/colors'
import sizes from '../../config/size'
import Text from '../AppText'
// Components
const Container = styled.TouchableOpacity`
  margin-bottom: ${sizes.maxMargin1/2}px;
`
const Row = styled.View`
  flex-direction: row;
`
const ImageContainer = styled.View`
  margin-bottom: 10px;
`
const Photo = styled.Image`
  width: 100%;
  height: ${sizes.maxMargin*2}px;
  border-radius: ${sizes.radius}px;
`
const TimeContainer = styled.View`
  position: absolute;
  bottom: 0;
  height: ${sizes.maxMargin / 2}px;
  width: ${sizes.maxMargin}px;
  background-color: ${colors.white};
  border-top-right-radius: 30px;
  border-bottom-left-radius: 30px;
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: {width: 0, height: 1};
  shadow-opacity: 0.4;
  shadow-radius: 2;
  elevation: 1;
`
const Time = styled(Text)`
  font-weight: bold;
`
const DetailsContainer = styled.View`
  margin-top: ${sizes.padding}px;
  flex-direction: row;
`

const CategoriesContainer = styled.View`
  flex-direction: row;
  margin-left: 10px;
`

// Main function
const Food = ({ item, onPress }) => {
  const getCategoryNameById = (id) => {
    return 'Food'
  }
  const uri = env.BASE_URL + item.photo
  console.log({ uri, env })
  return (
    <Container onPress={onPress}>
      <ImageContainer>
        <Photo source={{ uri }} resizeMode="cover" />
        <TimeContainer>
          <Time>{item.duration}</Time>
        </TimeContainer>
      </ImageContainer>
      <Text>{item.name}</Text>
      <DetailsContainer>
        <MaterialCommunityIcons name="star" size={20} color={colors.primary} />
        <Text>{item.rating}</Text>
        <CategoriesContainer>
          {item.categories.map((categoryId) => (
            <Row key={categoryId}>
              <Text>{getCategoryNameById(categoryId)}</Text>
              <Text> . </Text>
            </Row>
          ))}
          <Text>$%</Text>
        </CategoriesContainer>
      </DetailsContainer>
    </Container>
  )
}

export default Food
