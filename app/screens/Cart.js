import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../store/cart'
import { StyleSheet, View, Text, Image, FlatList } from 'react-native'
import IncrementDecrement from '../components/IncrementDecrement'
import Screen from '../components/Screen'
import styled from 'styled-components/native'
import colors from '../config/colors'
import sizes from '../config/size'
import env from '../config'
import { addProduct, removeProduct } from '../store/cart'
import Button from '../components/AppButton'

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

  return (
    <Screen>
      <Container>
        <FlatList
          data={orders}
          renderItem={({ item }) => <ListItem key={item.id} item={item} />}
          keyExtractor={(item) => `${item.id}`}
        />
        <Button title="Order" />
      </Container>
    </Screen>
  )
}

const ListItem = ({ item }) => {
  const dispatch = useDispatch()
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
          backgroundColor: colors.lightGray3,
          with: '100%',
          marginVertical: sizes.padding / 2,
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
        />  */}
      </View>

      {/* Wordings section */}
      <View
        style={{
          flex: 1,
          marginLeft: sizes.radius,
          justifyContent: 'center',
        }}
      >
        <Text> {item.name}</Text>
        <Text>
          {item.amountInCart}* ${item.price} = $
          {(item.price * item.amountInCart).toFixed(2)}
        </Text>
      </View>

      {/* Buttons*/}
      <View
        style={{
          marginRight: sizes.radius,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <IncrementDecrement
          value={item.amountInCart}
          onIncrement={() => dispatch({ type: addProduct, payload: item })}
          onDecrement={() =>
            dispatch({ type: removeProduct, payload: item.id })
          }
        />
       
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
