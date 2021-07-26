import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Image, View, StyleSheet } from 'react-native'
// Views
import * as Animatable from 'react-native-animatable'
import * as Yup from 'yup'

//Custom dependencies
import Screen from '../components/Screen'
import { Error, Field, Form, Submit } from '../components/form'

import Text from '../components/AppText'
import colors from '../config/colors'
import { appLogo } from '../config/image'
import { getCurrentUser, Login } from '../store/auth'
// Form Validation
const ValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  pin: Yup.string().required().min(4).label('Pin'),
})

// Main Function
const LoginScreen = () => {
  // Hooks
  const dispatch = useDispatch()
  const user = useSelector(getCurrentUser)

  const handleLogin = ({ email, pin }) => dispatch(Login({ email, pin }))

  return (
    <Screen style={styles.container} loading={user.loading} error={user.error}>
      <Image style={styles.logo} source={appLogo} />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Form
          validationSchema={ValidationSchema}
          initialValues={{ email: '', pin: '' }}
          onSubmit={handleLogin}
        >
          <Field
            autoCapitalize="none"
            autoCorrect={false}
            editable={!user.loading}
            icon="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder="Email"
            name="email"
          />

          <Field
            autoCapitalize="none"
            autoCorrect={false}
            editable={!user.loading}
            icon="key"
            keyboardType="password"
            textContentType="Password"
            placeholder="Pin"
            secureTextEntry
            name="pin"
          />

          <View style={styles.foot}>
            <Submit title="Login" />
          </View>
        </Form>
      </Animatable.View>
    </Screen>
  )
}

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  header: {
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },

  footer: {
    position: 'relative',
    backgroundColor: colors.lightGray3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    height: '100%',
  },

  text_header: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 30,
  },

  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 90,
    marginBottom: 20,
  },
  foot: {
    // position: 'absolute',
    // bottom: 13,
    // left: '50%',
    // height: '75%',
    // width: '100%',
    // backgroundColor: 'green',
  },
})

export default LoginScreen
