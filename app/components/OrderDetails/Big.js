import React, { useState } from 'react'

import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import Text from '../AppText'
import Button from '../AppButton'
import size from '../../config/size'
import colors from '../../config/colors'
import { getProducts } from '../../store/cart'
import { Modal, View } from 'react-native'
import Screen from '../Screen'

import Map from '../Map'
// Components
const Container = styled.View`
  background-color: ${colors.white};
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
`
const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: ${size.padding * 2}px;
  padding-horizontal: ${size.padding * 3}px;
`
const FirstRow = styled(Row)`
  border-bottom-color: ${colors.lightGray2};
  border-bottom-width: 1px;
`
const CTAContainer = styled.View`
  padding: ${size.padding * 2}px;
  align-items: center;
  justify-content: center;
`
const TextContainer = styled.TouchableOpacity`
  flex-direction: row;
`
const Icon = styled(MaterialCommunityIcons)`
  margin-right: ${size.base}px;
`

function OrderDetails(props) {
  const orders = useSelector(getProducts)
  const navigation = useNavigation()
  const [toggleCard, setToggleCard] = useState(false)
  return (
    <Container>
      <FirstRow>
        <Text style={{ fontWeight: 'medium' }}>
          {orders.length} items in cart
        </Text>
        <Text style={{ fontWeight: '700' }}>
          ${orders.reduce((amount, unit) => amount + unit?.price, 0).toFixed(2)}
        </Text>
      </FirstRow>
      <Row>
        <TextContainer>
          <Icon name="map-marker" size={size.base * 3} />
          <Text>Location</Text>
        </TextContainer>
        <TextContainer onPress={() => setToggleCard(true)}>
          <Icon name="credit-card" size={size.base * 3} />
          <Text>4532</Text>
        </TextContainer>
      </Row>
      <CTAContainer>
        <Button title="Order" onPress={() => navigation.navigate('cart')} />
      </CTAContainer>

      <Modal animationType="slide" transparent={true} visible={toggleCard}>
        <CloseBtn onPress={() => setToggleCard(false)}>
          <MaterialCommunityIcons size={20} name="close-circle" />
        </CloseBtn>
        <W>
          <Map />
          {/* <Page>
          <CloseBtn onPress={() => setToggleCard(false)}>
            <MaterialCommunityIcons size={20} name="close-circle" />
          </CloseBtn>
          <CreditCard />
        </Page> */}
        </W>
      </Modal>
    </Container>
  )
}

const W = styled.View`
  flex: 1;
  position: relative;
`
const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  top:10px;
  left:10px;
  z-index:5;
  margin-top: 20px;
  margin-vertical: 10px;
`
const Page = styled(Screen)`
  background-color: #f6cfdf;
  position: relative;
`
const CT = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f6cfdf;
  width: 100%;
  height: 100%;
`
const Payment = styled.View`
  position: relative;
`
const PaymentBG = styled.View`
  position: absolute;
`
const Card = styled.View`
  position: relative;
  width: ${size.width * 0.85}px;
  height: 250px;
  background-color: #fcfcdc;
  border-radius: 15px;
  margin: 10px 15px 25px 10px;
  padding: 40px;
`

const CreditCard = () => {
  return (
    <CT>
      <Payment>
        <PaymentBG></PaymentBG>
        <Card>
          <Text>Sonme user card details</Text>
          <Text>Logo</Text>
          <Text>Logo</Text>
        </Card>
      </Payment>
    </CT>
  )
}

export default OrderDetails
