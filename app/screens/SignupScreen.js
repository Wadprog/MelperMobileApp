import React, { useContext } from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import * as Yup from 'yup'

//Customs Dependencies for
import Screen from '../components/Screen'
import Text from '../components/AppText'
import defaultStyles from '../config/styles'
import AuthContext from '../auth/context'
import authApi from '../api/auth'
import useApi from '../hooks/useApi'
import { Error, Field, Form, Submit } from '../components/form'

// Form Validation
const ValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  firstName: Yup.string().required().label('First Name'),
  lastName: Yup.string().required().label('Last Name'),
  phone: Yup.string().required().min(7).label('Phone'),
  password: Yup.string().required().min(4).label('Pin'),
})

// Main function
function SignupScreen() {
  const authContext = useContext(AuthContext)
  const register = useApi(authApi.register)
  const handleRegistration = async (userDetails) => {
    if (register.login) return
    await register.request(userDetails)
    if (!login.error && login.data) {
      const currentUser = jwtDecode(login.data.msg)
      return authContext.setUser(currentUser)
    }
  }
  return (
    <Screen>
      <ActivityIndicator animating={register.loading} size="large" />
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.heading}>Sign up</Text>
          <Text style={defaultStyles.my_1}>
            Create an account so you can order all your needs with just on tap
          </Text>
        </View>

        <Form
          validationSchema={ValidationSchema}
          initialValues={{
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phone: '',
          }}
          onSubmit={handleRegistration}
        >
          <Error error={register.error} visible={register.error} />
          <Field
            autoCapitalize="none"
            autoCorrect={false}
            editable={!register.loading}
            icon="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder="Email"
            name="email"
          />
          <Field
            autoCapitalize="none"
            autoCorrect={false}
            editable={!register.loading}
            icon="card-account-details"
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder="First Name"
            name="firstName"
          />

          <Field
            autoCapitalize="none"
            autoCorrect={false}
            editable={!register.loading}
            icon="card-account-details"
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder="Last Name"
            name="lastName"
          />
          <Field
            autoCapitalize="none"
            autoCorrect={false}
            editable={!register.loading}
            icon="phone"
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder="Phone number"
            name="phone"
          />

          <Field
            autoCapitalize="none"
            autoCorrect={false}
            editable={!register.loading}
            icon="key"
            keyboardType="password"
            textContentType="Password"
            placeholder="Pin"
            secureTextEntry
            name="password"
          />

          <Submit title="register" />
        </Form>
      </View>
    </Screen>
  )
}
const styles = StyleSheet.create({
  top: { marginVertical: 14 },
  heading: {
    fontSize: 30,
    fontWeight: '900',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    position: 'relative',
  },
})

export default SignupScreen
