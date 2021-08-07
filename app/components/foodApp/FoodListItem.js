import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styled from 'styled-components/native'
import { Image } from 'react-native-expo-image-cache'
//Custom dependencies
import colors from '../../config/colors'
import sizes from '../../config/size'
import Text from '../AppText'
import { Surface } from 'react-native-paper'
// Components
const Container = styled.TouchableOpacity`
  margin-bottom: ${sizes.maxMargin1 / 2}px;
`
const Row = styled.View`
  flex-direction: row;
`
const ImageContainer = styled.View`
  margin-bottom: 10px;
`
const Photo = styled(Image)`
  width: 100%;
  height: ${sizes.maxMargin * 2}px;
  border-radius: ${sizes.radius}px;
`
const TimeContainer = styled(Surface)`
  position: absolute;
  bottom: 0;
  height: ${sizes.maxMargin / 2}px;
  width: ${sizes.maxMargin}px;
  border-top-right-radius: 30px;
  border-bottom-left-radius: 30px;
  align-items: center;
  justify-content: center;
  elevation: ${sizes.padding}px;
  padding: ${sizes.padding}px;
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

  return (
    <Container onPress={onPress}>
      <ImageContainer>
        <Photo
          uri={item.photo?.original}
          preview={{ uri: item.photo.thumbnail }}
          resizeMode="cover"
        />

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
