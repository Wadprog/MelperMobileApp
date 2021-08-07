import React, { useState } from 'react'

import { View, StyleSheet, TextInput, Button, Alert } from 'react-native'
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native'
import Text from './AppText'
const API_URL = 'http://localhost:4000'


function Credit(props) {

  const [email, setEmail] = useState()
  const [cardDetails, setCardDetails] = useState()
  const { confirmPayment, loading } = useConfirmPayment()

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const { clientSecret, error } = await response.json()
    return { clientSecret, error }
  }
const handlePayPress = async () => {
  
  if (!cardDetails?.complete || !email) {
    Alert.alert('Please enter Complete card details and Email')
    return
  }
  const billingDetails = {
    email: email,
  }

  try {
    const { clientSecret, error } = await fetchPaymentIntentClientSecret()

    console.log({ clientSecret, error })
    //2. confirm the payment
    if (error) {
      console.log('Unable to process payment')
    } else {
      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        type: 'Card',
        billingDetails: billingDetails,
      })
      if (error) {
        alert(`Payment Confirmation Error ${error.message}`)
      } else if (paymentIntent) {
        alert('Payment Successful')
        console.log('Payment successful ', paymentIntent)
      }
    }
  } catch (e) {
    console.log(e)
  }
  //3.Confirm the payment with the card details
}
  return (
    <View>
      <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        onChange={(value) => setEmail(value.nativeEvent.text)}
        style={styles.input}
      />
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={(cardDetails) => {
          setCardDetails(cardDetails)
        }}
      />
      <Button onPress={handlePayPress} title="Pay" disabled={loading} />
    </View>
  )
}

export default Credit

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
  },
  input: {
    backgroundColor: '#efefefef',

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: '#efefefef',
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
})