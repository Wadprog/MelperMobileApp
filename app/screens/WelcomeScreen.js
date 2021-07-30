import React from 'react'
import styled from 'styled-components/native'

// Customs imports
import Button from '../components/AppButton'
import Text from '../components/AppText'
import routes from '../navigation/routes'
import configuration from '../config'

// Components 
const Background = styled.ImageBackground`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`
const LogoContainer = styled.View`
  position: absolute;
  top: ${configuration.size.maxMargin1}px;
  align-items: center;
`
const Logo = styled.Image`
  width: ${configuration.size.maxMargin}px;
  height: ${configuration.size.maxMargin}px;
`
const Tagline = styled(Text)`
  font-size: ${configuration.size.h3}px;
  font-weight: 600;
  font-style: italic;
  text-transform: capitalize;
  padding-vertical: ${configuration.size.padding3}px;
`
const ButtonContainer = styled.View`
  width: 100%;
  padding: ${configuration.size.padding}px;
  margin-vertical: ${configuration.size.padding}px;
`
// Main Function To Export
const WelcomeScreen = ({ navigation }) => (
  <Background blurRadius={10} source={configuration.image.WelcomeScreenBG}>
    <LogoContainer>
      <Logo source={configuration.image.appLogo} />
      <Tagline> {configuration.text.appTagLine}</Tagline>
    </LogoContainer>
    <ButtonContainer>
      <Button title="Login" onPress={() => navigation.navigate(routes.LOGIN)} />
      <Button
        title="Register"
        color="secondary"
        onPress={() => navigation.navigate(routes.SIGNUP)}
      />
    </ButtonContainer>
  </Background>
)

export default WelcomeScreen
