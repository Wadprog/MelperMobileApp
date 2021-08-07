import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { useSelector, useDispatch } from 'react-redux'

// Custom dependencies
import Text from '../../components/AppText'
import Screen from '../../components/Screen'
import sizes from '../../config/size'
import colors from '../../config/colors'
import MoreLess from '../../components/IncrementDecrement'
import Orderer from '../../components/OrderDetails'
import { addProduct, removeProduct, getProducts } from '../../store/cart'

// import ImageBackground from '../../components/AppImageBackground'
// Components
const Background = styled.ImageBackground`
  width: 100%;
  height: 100%;
`
const DescriptionBox = styled.View`
  position: absolute;
  top: 33%;
  left: 30%;
  flex-direction: row;
  padding: ${sizes.padding}px;
  background-color: ${colors.transparentLightGray};
  width: 50%;
  border-radius: ${sizes.radius}px;
`
const PriceAndName = styled(Text)`
  color: ${colors.lightGray4};
`
const Title = styled(Text)`
  color: ${colors.white};
  font-size: ${sizes.h1}px;
`
const Type = styled(Text)`
  color: ${colors.lightGray2};
  font-size: ${sizes.body1}px;
  line-height: ${sizes.body1 * 1.1};
`
const BottomDetails = styled.View`
  position: absolute;
  bottom: 20%;
  left: ${sizes.padding3}px;
  padding: ${sizes.padding / 2}px;
`
const PriceContainer = styled.View`
  flex: 1.5;
  align-items: flex-end;
  justify-content: flex-end;
`
const Price = styled(PriceAndName)`
  font-size: ${sizes.h4}px;
  line-height: ${sizes.h4 * 1.1};
  margin-bottom: ${sizes.padding * 2}px;
`
const NameContainer = styled.View`
  flex: 2;
`
const CounterWrapper = styled.View`
  position: absolute;
  top: 93%;
  left: 50%;
  margin-top: ${sizes.base10}px;
`
const ItemDetail = ({ route }) => {
  let { itemInfo } = route.params
  // Hooks
  const dispatch = useDispatch()
  const orders = useSelector(getProducts)
  const [amountInCart, setAmountInCart] = useState(0)
  // ON Render
  useEffect(() => {
    const order = orders.find((order) => order.id == itemInfo.id)
    if (order) return setAmountInCart(order.amountInCart)
    return setAmountInCart(0)
  }, [orders])

  return (
    <Screen>
      <Background source={{ uri: itemInfo.image.original }} resizeMode="cover">
        <DescriptionBox>
          <NameContainer>
            <PriceAndName>{itemInfo.productName}</PriceAndName>
          </NameContainer>
          <PriceContainer>
            <Price>$ {itemInfo.price.toFixed(2)}</Price>
          </PriceContainer>
          <CounterWrapper>
            <MoreLess
              value={amountInCart}
              onIncrement={() =>
                dispatch({ type: addProduct, payload: itemInfo })
              }
              onDecrement={() =>
                dispatch({ type: removeProduct, payload: itemInfo.id })
              }
              style={{ position: 'relative' }}
            />
          </CounterWrapper>
        </DescriptionBox>
        <BottomDetails>
          <Type>Furniture</Type>
          <Title>{itemInfo.productName}</Title>
        </BottomDetails>
        <Orderer styleSize="small" />
      </Background>
    </Screen>
  )
}

export default ItemDetail
