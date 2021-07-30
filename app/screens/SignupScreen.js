import React, { useContext } from 'react'
import styled from 'styled-components/native'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
//Customs Dependencies for
import Screen from '../components/Screen'
import Text from '../components/AppText'
import defaultStyles from '../config/styles'
import { Field, Form, Submit } from '../components/form'
import { Register, getCurrentUser } from '../store/auth'
// Form Validation
const ValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  firstName: Yup.string().required().label('First Name'),
  lastName: Yup.string().required().label('Last Name'),
  phone: Yup.string().required().min(7).label('Phone'),
  password: Yup.string().required().min(4).label('Pin'),
})

const Container = styled.View`
  flex: 1;
  padding-horizontal: 10px;
  padding-vertical: 30px;
  position: relative;
`

const Header = styled.View`
  margin-vertical: 14px;
`

const Title = styled(Text)`
  font-size: 30px;
  font-weight: 900;
`
const Bottom = styled.View`
  position: absolute;
  bottom: 10px;
  justify-content: flex-end;
  align-items: flex-end;
  padding-horizontal: 30px;
  padding-vertical: 30px;
`
// Main function
const SignupScreen = () => {
  const dispatch = useDispatch()
  const register = useSelector(getCurrentUser)

  const handleRegistration = (newUser) => {
    console.log('Handling reg')
    return dispatch(Register(newUser))
  }

  return (
    <Screen loading={register.loading} error={register.error}>
      <Container>
        <Header>
          <Title>Sign up</Title>
          <Text style={defaultStyles.my_1}>
            Create an account so you can order all your needs with just on tap
          </Text>
        </Header>
        <Bottom>
          <Form
            validationSchema={ValidationSchema}
            initialValues={{
              email: '',
              pin: '',
              firstName: '',
              lastName: '',
              phone: '',
              profileImage: '',
              username: '',
              middleName: '',
            }}
            onSubmit={handleRegistration}
          >
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
              placeholder="Middle Name"
              name="middleName"
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
              icon="account-outline"
              keyboardType="email-address"
              textContentType="emailAddress"
              placeholder="Username"
              name="username"
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
              name="pin"
            />

            <Submit title="Register" />
          </Form>
        </Bottom>
      </Container>
    </Screen>
  )
}

export default SignupScreen
