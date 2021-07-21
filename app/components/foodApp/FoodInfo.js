import React, { useState } from 'react'
import styled from 'styled-components/native'
import size from '../../config/size'
import IncrementDecrement from '../IncrementDecrement'
import Text from '../AppText'
import env from '../../config'

const Image = styled.Image`
  width: ${size.width}px;
  height: 100%;
`
const Header = styled.View`
  height: ${size.height * 0.35}px;
`
const Container = styled.View`
  align-items: center;
`
const AmountModifierContainer = styled.View`
  position: absolute;
  bottom: -20px;
  width: ${size.width}px;
  height: 50px;
  justify-content: center;
  flex-direction: row;
`
const Bottom = styled.View`
  width: ${size.width}px;
  align-items: center;
  margin-top: 15px;
  padding-horizontal: ${size.padding * 2}px;
`
const Name = styled(Text)`
  font-size: ${size.h1}px;
  margin-vertical: ${size.padding2 / 2}px;
`
const Price = styled(Text)`
  font-size: ${size.h2}px;
  margin-bottom: ${size.padding}px;
  font-weight: bold;
`
const FoodInfo = ({ food, onIncrement, onDecrement, amountOrdered = 0 }) => {
  const [val, setVal] = useState(amountOrdered)
  const handleMore = () => setVal(val + 1)
  const handleLess = () => (val > 0 ? setVal(val - 1) : setVal(0))
  const uri = env.BASE_URL + food.photo

  return (
    <Container>
      <Header>
        <Image source={{ uri }} />
        <AmountModifierContainer>
          <IncrementDecrement
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            value={val}
          />
        </AmountModifierContainer>
      </Header>
      <Bottom>
        <Name>{food.name}</Name>
        <Price> ${food.price.toFixed(2)}</Price>
      </Bottom>
    </Container>
  )
}

export default FoodInfo
