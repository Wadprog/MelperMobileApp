import React from 'react'
import styled from 'styled-components/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// Custom imports
import Text from '../AppText'
import Button from '../AppButton'
import size from '../../config/size'
import colors from '../../config/colors'

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
// Main function
export default function OrderDetails({ amountOfOrders, Total, ...rest }) {
  return (
    <Container>
      <FirstRow>
        <Text style={{ fontWeight: 'medium' }}>
          {amountOfOrders} items in cart
        </Text>
        <Text style={{ fontWeight: '700' }}>${Total}</Text>
      </FirstRow>
      <Row>
        <TextContainer onPress={() => rest.onSetLocation()}>
          <Icon name="map-marker" size={size.base * 3} />
          <Text>Location</Text>
        </TextContainer>
        <TextContainer onPress={() => rest.onSetCreditCard()}>
          <Icon name="credit-card" size={size.base * 3} />
          <Text>4532</Text>
        </TextContainer>
      </Row>
      <CTAContainer>
        <Button title="Order" onPress={() => rest.onOrder()} />
      </CTAContainer>
    </Container>
  )
}
