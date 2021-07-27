import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { COLORS, SIZES, FONTS } from '../../constants'
import sizes from '../../config/size'
import colors from '../../config/colors'
import env from '../../config'
import MoreLess from '../../components/IncrementDecrement'
import Orderer from '../../components/OrderDetails'
import { useSelector, useDispatch } from 'react-redux'
import { addProduct, removeProduct, getProducts } from '../../store/cart'
const ItemDetail = ({ route, navigation, OnIncrement, onDecrement }) => {
  // Render
  let { itemInfo } = route.params
  const dispatch = useDispatch()
  const orders = useSelector(getProducts)
  const { log } = console
  const [amountInCart, setAmountInCart] = useState(0)

  const reducer = (acc, item) => {
    if (item.productId == itemInfo.productId) {
      return amount + 1
    }
    return amount + 0
  }

  function renderInfo() {
    if (itemInfo) {
      const uri = env.BASE_URL + itemInfo.image
      return (
        <ImageBackground
          source={{ uri }}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
        >
          <Text>in cart at the moment {amountInCart}</Text>
          {/* Product Tag */}
          <View
            style={{
              position: 'absolute',
              top: '45%',
              left: '15%',
              borderRadius: 80,
              backgroundColor: colors.transparentLightGray1,
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                borderRadius: 20,
                backgroundColor: colors.blue,
                height: 10,
                width: 10,
              }}
            ></View>
          </View>

          <View
            style={{
              position: 'absolute',
              top: '43%',
              left: '30%',
              flexDirection: 'row',
              padding: SIZES.radius * 1.5,
              backgroundColor: COLORS.transparentLightGray1,
              width: '50%',
              borderRadius: 10,
            }}
          >
            <View style={{ flex: 2 }}>
              <Text style={{ color: colors.darkGray, ...FONTS.h3 }}>
                {itemInfo.productName}
              </Text>
            </View>

            <View
              style={{
                flex: 1.5,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
            >
              <Text
                style={{
                  color: colors.darkGreen,
                  fontSize: sizes.h4,
                  lineHeight: 22,
                }}
              >
                $ {itemInfo.price.toFixed(2)}
              </Text>
              <View style={{ position: 'relative', marginTop: 25 }}>
                <MoreLess
                  onIncrement={() =>
                    dispatch({ type: addProduct, payload: itemInfo })
                  }
                  onDecrement={() => log('Decrementing')}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              position: 'absolute',
              bottom: '20%',
              left: SIZES.padding,
              right: SIZES.padding,
            }}
          >
            <Text style={{ color: colors.lightGray2, ...FONTS.body2 }}>
              Furniture
            </Text>
            <Text
              style={{
                marginTop: SIZES.radius,
                color: COLORS.white,
                ...FONTS.h1,
              }}
            >
              {itemInfo.productName}
            </Text>
          </View>
        </ImageBackground>
      )
    } else {
      ;<View></View>
    }
  }
  useEffect(() => {
    setAmountInCart(orders.reduce(reducer, 0))
  }, [])
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <Text> Hello App</Text>
      {renderInfo()}

      {/* <Orderer styleSize="small" /> */}
    </View>
  )
}

export default ItemDetail
