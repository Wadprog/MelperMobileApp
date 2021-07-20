import React, { useEffect } from 'react'
import { View, Animated } from 'react-native'
import size from '../../config/size'
import colors from '../../config/colors'
import Dots from '../../components/Dots'
import Screen from '../../components/Screen'
import OrderDetails from '../../components/OrderDetails'
import FoodInfo from '../../components/foodApp/FoodInfo'


const FoodDetails = ({ route, navigation }) => {

  const [restaurant, setRestaurant] = React.useState(null)

  useEffect(() => {
    setRestaurant(route.params.item)
  }, [])
  return (
    <Screen style={{ backgroundColor: colors.lightGray2 }}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
      >
        {restaurant?.menu.map((item, index) => (
          <FoodInfo food={item} key={`menu-${index}`} />
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
