import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../store/cart'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Screen from '../components/Screen'
import styled from 'styled-components/native'
import colors from '../config/colors'
import sizes from '../config/size'
import env from '../config'
import { images, FONTS } from '../constants'
const EXPECTED_HEADER = env.EXPECTED_HEADER

const Container = styled.View`
  margin-vertical: ${sizes.padding3}px;
  padding: ${sizes.radius}px;
  height: 110px;
  border-radius: 20px;
  background-color: ${colors.white};
  flex: 1;
`

function Cart(props) {
  const orders = useSelector(getProducts)
  const dispatch = useDispatch()

  return (
    <Screen>
      <Container>
        <FlatList
          data={orders}
          renderItem={({ item }) => <LIstItem item={item} />}
          keyExtractor={(item) => `${item.id}`}
        />
      </Container>
    </Screen>
  )
}

const LIstItem = ({ item }) => {
  const uri = EXPECTED_HEADER + item.image
  return (
    
      <View
        style={[
          styles.shadow,
          {
            flexDirection: 'row',
            marginHorizontal: sizes.padding,
            padding: sizes.radius,
            height: 110,
            borderRadius: 20,
            backgroundColor: colors.white,
            with: '100%',
          },
        ]}
      >
        <View
          style={{
            width: 50,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.lightGray2,
            borderRadius: 20,
          }}
        >
          {/* <Image
          source={{ uri }}
          resizeMode="contain"
          style={{
            width: '60%',
            height: '60%',
          }}
        /> */}
        </View>

        {/* Wordings section */}
        <View
          style={{
            flex: 1,
            marginLeft: sizes.radius,
            justifyContent: 'center',
          }}
        >
          <Text style={{ ...FONTS.h2 }}>Product name</Text>
          <Text style={{ ...FONTS.body3 }}>Adding to your cart</Text>
        </View>

        {/* Button */}
        <View
          style={{
            marginRight: sizes.radius,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              height: '70%',
              width: 40,
              borderRadius: 10,
            }}
            onPress={() => {
              console.log('Promo on clicked')
            }}
          >
            <MaterialCommunityIcons name="home" />
          </TouchableOpacity>
        </View>
      </View>
   
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
})
export default Cart
