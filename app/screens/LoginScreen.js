import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  ActivityIndicator,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
// Views
import * as Animatable from 'react-native-animatable'
import * as Yup from 'yup'

//Custom dependencies
//import ActivityIndicator from '../components/ActivityIndicator'
import Screen from '../components/Screen'
import { Error, Field, Form, Submit } from '../components/form'

import Text from '../components/AppText'
import colors from '../config/colors'
import { appLogo } from '../config/image'
import { getCurrentUser, Login } from '../store/auth'
// Form Validation
const ValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Pin'),
})

// Main Function
const LoginScreen = () => {


  // Hooks
  const dispatch = useDispatch()
  const user = useSelector(getCurrentUser)

  const handleLogin = ({ email, password }) =>
    dispatch(Login({ email, password }))

  return (
    <Screen>
      {user.loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator animating={true} size="large" />
        </View>
      ) : (
        <View style={styles.container}>
          <Image style={styles.logo} source={appLogo} />
          <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
          </View>
          <Animatable.View
            animation="fadeInUpBig"
            style={[
              styles.footer,
              {
                backgroundColor: colors.white,
              },
            ]}
          >
            <Form
              validationSchema={ValidationSchema}
              initialValues={{ email: '', password: '' }}
              onSubmit={handleLogin}
            >
              <Error error={user.error} visible={user.error} />
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
                name="password"
              />
              <TouchableOpacity>
                <Text style={{ color: '#009387', marginTop: 15 }}>
                  Forgot password?
                </Text>
              </TouchableOpacity>
              <Submit title="Login" />
            </Form>
          </Animatable.View>
        </View>
      )}
    </Screen>
  )
}

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },

  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
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
})

export default LoginScreen
