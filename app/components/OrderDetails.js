import React from 'react'
import styled from 'styled-components/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Text from './AppText'
import Button from './AppButton'
import size from '../config/size'
import colors from '../config/colors'

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
const TextContainer = styled.View`
  flex-direction: row;
`
const Icon = styled(MaterialCommunityIcons)`
  margin-right: ${size.base}px;
`
function OrderDetails(props) {
  return (
    <Container>
      <FirstRow>
        <Text style={{ fontWeight: 'medium' }}>0 items in cart</Text>
        <Text style={{ fontWeight: '700' }}>$0.00</Text>
      </FirstRow>
      <Row>
        <TextContainer>
          <Icon name="map-marker" size={size.base * 3} />
          <Text>Location</Text>
        </TextContainer>
        <TextContainer>
          <Icon name="credit-card" size={size.base * 3} />
          <Text>4532</Text>
        </TextContainer>
      </Row>
      <CTAContainer>
        <Button title="Order" />
      </CTAContainer>
    </Container>
  )
}

export default OrderDetails
