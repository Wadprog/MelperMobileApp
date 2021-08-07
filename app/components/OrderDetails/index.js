import React from 'react'
import { Modal } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'

// Custom dependencies
import Big from './Big'
import Little from './Little'
import { getProducts } from '../../store/cart'
import useToggle from '../../hooks/useToggle'
import Screen from '../../components/Screen'
import Map from '../../components/Map'
import Credit from '../Credit'
import routes from '../../navigation/routes'
const CloseBtn = styled.TouchableOpacity`
  left: 10px;
  z-index: 5;
`
const Page = styled(Screen)`
  position: relative;
`
const index = ({ styleSize = 'big', ...rest }) => {
  const [editingCredit, toggleSetCredit] = useToggle()
  const [editingLocation, toggleLocation] = useToggle()
  // Hooks
  const navigation = useNavigation()
  const orders = useSelector(getProducts)

  const amountOfOrders = orders.length
  const Total = orders.reduce((amount, unit) => amount + unit?.price, 0)

  const props = { ...rest, Total, amountOfOrders }

  const handleOrder = () => {
    if (rest.onOrder) return rest.onOrder()
    return navigation.navigate(routes.CART)
  }
  const handleLocation = () => {
    if (rest.onSetLocation) return rest.onSetLocation()
    return toggleLocation()
  }
  const handleCreditCard = () => {
    if (rest.onSetCreditCard) return rest.onSetCreditCard()
    return toggleSetCredit()
  }
  const closeModal = () => {
    const fn = editingCredit ? toggleSetCredit : toggleLocation
    return fn(false)
  }
  return (
    <>
      {styleSize == 'big' ? (
        <Big
          {...props}
          onOrder={handleOrder}
          onSetCreditCard={handleCreditCard}
          onSetLocation={handleLocation}
        />
      ) : ( 
        <Little
          {...props}
          onOrder={handleOrder}
          onSetCreditCard={handleCreditCard}
          onSetLocation={handleLocation}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editingCredit || editingLocation}
      >
        <Page>
          <CloseBtn onPress={() => closeModal()}>
            <MaterialCommunityIcons size={20} name="close-circle" />
          </CloseBtn>
          {editingLocation ? <Map /> : <Credit />}
        </Page>
      </Modal>
    </>
  )
}

export default index
