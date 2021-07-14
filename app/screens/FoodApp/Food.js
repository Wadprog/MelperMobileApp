import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styled from 'styled-components/native'

//Custom dependencies
import colors from '../../config/colors'
import Text from '../../components/AppText'
// Components
const Container = styled.TouchableOpacity`
  margin-bottom: 20px;
`
const Row = styled.View`
  flex-direction: row;
`
const ImageContainer = styled.View`
  margin-bottom: 10px;
`
const Photo = styled.Image`
  width: '100%';
  height: 200px;
  border-radius: 30px;
`
const TimeContainer = styled.View`
  position: absolute;
  bottom: 0;
  height: 50px;
  width: 100px;
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
  margin-top: 10;
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
  return (
    <Container onPress={onPress}>
      <ImageContainer>
        <Photo source={item.photo} resizeMode="cover" />
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
