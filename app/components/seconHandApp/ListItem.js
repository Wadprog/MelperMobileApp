import React from 'react'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
// Custom dependenciens
import sizes from '../../config/size'
import colors from '../../config/colors'
import env from '../../config'

//Components
const Container = styled.TouchableOpacity`
  margin-left: ${sizes.padding3};
`
const Card = styled.View`
  width: ${sizes.width / 2};
`
const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${sizes.radius};
`
const DetailsContainer = styled.View`
  position: absolute;
  top: 15px;
  left: 10%;
  right: 10%;
`
const DetailsTitle = styled.Text`
  color: ${colors.lightGray2};
  font-size: ${sizes.h3}px;
`
const Name = styled.Text`
  color: ${colors.white};
  font-size: ${sizes.h2}px;
  margin-top: ${sizes.base}px;
`

const Bottom = styled.View`
  position: absolute;
  bottom: ${sizes.base10 * 2}px;
  left: ${sizes.base10 * 3}px;
  padding-vertical: ${sizes.base10}px;
  padding-horizontal: ${sizes.h4}px;
  background-color: ${colors.transparentLightGray};
`
const Price = styled.Text`
  font-size: ${sizes.h2}px;
  line-height: ${sizes.body1}px;
`
const ListItem = ({ item }) => {
  const uri = env.BASE_URL + item.image
  const navigation = useNavigation()
  return (
    <Container
      onPress={() => navigation.navigate('Article Details', { itemInfo: item })}
    >
      <Card>
        <Image source={{ uri }} resizeMode="cover" />
        <DetailsContainer>
          <DetailsTitle>Furniture</DetailsTitle>
          <Name>{item.productName}</Name>
        </DetailsContainer>

        <Bottom
          style={{
            bottom: 20,
            left: 30,
            borderRadius: 15,
            paddingVertical: 10,
            backgroundColor: colors.transparentLightGray,
          }}
        >
          <Price>$ {item.price.toFixed(2)}</Price>
        </Bottom>
      </Card>
    </Container>
  )
}

export default ListItem
