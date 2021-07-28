import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import * as Animatable from 'react-native-animatable'
import * as Yup from 'yup'

//Custom dependencies
import Screen from '../components/Screen'
import { Field, Form, Submit } from '../components/form'
import Text from '../components/AppText'
import colors from '../config/colors'
import sizes from '../config/size'
import image from '../config/image'
import { getCurrentUser, Login } from '../store/auth'

// Form Validation
const ValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  pin: Yup.string().required().min(4).label('Pin'),
})
// Components
const Logo = styled.Image`
  width: ${sizes.maxMargin1}px;
  height: ${sizes.maxMargin1}px;
  align-self: center;
  margin-top: ${sizes.maxMargin}px;
  margin-bottom: ${sizes.margin1}px;
`
const Head = styled.View`
  justify-content: flex-end;
  padding-horizontal: ${sizes.padding3}px;
  padding-bottom: ${sizes.padding3}px;
`
const HeaderText = styled(Text)`
  color: ${colors.secondary};
  font-weight: bold;
  font-size: ${sizes.h1}px;
`
const Main = styled(Animatable.View)`
  position: relative;
  background-color: ${colors.lightGray3};
  border-top-left-radius: ${sizes.radius}px;
  border-top-right-radius: ${sizes.radius}px;
  padding-horizontal: ${sizes.padding3}px;
  padding-vertical: ${sizes.padding3}px;
  height: 100%;
`
const Foot = styled.View``
// Main Function
const LoginScreen = () => {
  // Hooks
  const dispatch = useDispatch()
  const user = useSelector(getCurrentUser)
  // Functions
  const handleLogin = ({ email, pin }) => dispatch(Login({ email, pin }))

  return (
    <Screen loading={user.loading} error={user.error}>
      <Logo source={image.appLogo} />
      <Head>
        <HeaderText>Welcome!</HeaderText>
      </Head>
      <Main animation="fadeInUpBig">
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

          <Foot>
            <Submit title="Login" />
          </Foot>
        </Form>
      </Main>
    </Screen>
  )
}

export default LoginScreen
