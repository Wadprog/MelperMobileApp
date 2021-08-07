import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import size from '../../config/size'
import IncrementDecrement from '../IncrementDecrement'
import Text from '../AppText'
import { useSelector } from 'react-redux'
import { getProducts } from '../../store/cart'
import { Image } from 'react-native-expo-image-cache'
const Photo = styled(Image)`
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
  const orders = useSelector(getProducts)

  const handleMore = () => setAmountInCart(amountInCart + 1)
  const handleLess = () =>
    amountInCart > 0 ? setAmountInCart(amountInCart - 1) : setAmountInCart(0)


  const [amountInCart, setAmountInCart] = useState(0)

  useEffect(() => {
    const order = orders.find((order) => order.id == food.id)
    if (order) return setAmountInCart(order.amountInCart)
    else setAmountInCart(0)
  }, [orders])
  return (
    <Container>
      <Header>
        <Photo
          uri={food.photo.original}
          preview={{ uri: food.photo.thumbnail }}
        />
        <AmountModifierContainer>
          <IncrementDecrement
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            value={amountInCart}
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
