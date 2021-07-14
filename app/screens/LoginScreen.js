import React, { useContext } from 'react'
import {
  ActivityIndicator,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import * as Yup from 'yup'
import jwtDecode from 'jwt-decode'
import { useSelector, useDispatch } from 'react-redux'
//Custom dependencies
//import ActivityIndicator from '../components/ActivityIndicator'
import Screen from '../components/Screen'
import { Error, Field, Form, Submit } from '../components/form'
import authApi from '../api/auth'
import AuthContext from '../auth/context'
import useApi from '../hooks/useApi'
import Text from '../components/AppText'
import colors from '../config/colors'

import { getCurrentUser, Login } from '../store/auth'
// Form Validation
const ValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Pin'),
})

// Main Function
function LoginScreen() {
  const authContext = useContext(AuthContext)
  const login = useApi(authApi.login)
  const dispatch = useDispatch()
  const user = useSelector(getCurrentUser)

  const handleLogin = async ({ email, password }) => {
    console.log({ email, password })
    dispatch(Login({ email, password }))
    // if (login.loading) return
    // await login.request(email, password)
    // if (!login.error && login.data) {
    //   const currentUser = jwtDecode(login.data.msg)
    //   return authContext.setUser(currentUser)
    //}
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator animating={user?.loading} size="large" />
      <Image style={styles.logo} source={require('../assets/MLogo.png')} />

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
          <Error error={login.error} visible={login.error} />
          <Field
            autoCapitalize="none"
            autoCorrect={false}
            editable={!login.loading}
            icon="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder="Email"
            name="email"
          />

          <Field
            autoCapitalize="none"
            autoCorrect={false}
            editable={!login.loading}
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
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },

  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
})
export default LoginScreen
