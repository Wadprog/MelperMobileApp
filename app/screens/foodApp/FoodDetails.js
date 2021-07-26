import React, { useEffect } from 'react'
import { View, Animated } from 'react-native'
import size from '../../config/size'
import colors from '../../config/colors'
import Dots from '../../components/Dots'
import Screen from '../../components/Screen'
import OrderDetails from '../../components/OrderDetails'
import FoodInfo from '../../components/foodApp/FoodInfo'
import { useDispatch } from 'react-redux'
import { addProduct, removeProduct } from '../../store/cart'


const FoodDetails = ({ route, navigation }) => {
  const [restaurant, setRestaurant] = React.useState(null)

  useEffect(() => {
    setRestaurant(route.params.item)
  }, [])
  const dispatch = useDispatch()
  return (
    <Screen>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
      >
        {restaurant?.menu.map((item, index) => (
          <FoodInfo
            food={item}
            key={`menu-${index}`}
            onIncrement={() => {
              dispatch({ type: addProduct, payload: item })
            }}
            onDecrement={() => {
              dispatch({ type: removeProduct, payload: item })
            }}
          />
        ))}
      </Animated.ScrollView>
      {/* Dots  */}
      <View style={{ height: 30 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: size.padding,
          }}
        >
          <Dots amountOfDots={restaurant?.menu.length} />
        </View>
      </View>
      {/* Order  */}
      <OrderDetails />
    </Screen>
  )
}

export default FoodDetails
