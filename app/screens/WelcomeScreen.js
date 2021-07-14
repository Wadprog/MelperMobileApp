import React from 'react'
import { StyleSheet, ImageBackground, View, Image, } from 'react-native'
import AppButton from '../components/AppButton'

// Customs imports

import AppText from '../components/AppText'

// Main Function To Export 
function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require('../assets/background.jpg')}
    >
      <View style={styles.logoContainer}>
        <Image source={require('../assets/MLogo.png')} style={styles.logo} />

        <AppText style={styles.tagline}> Every Item, Just A Tap Away!</AppText>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton title="Login" onPress={() => navigation.navigate('Login')} />
        <AppButton
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </ImageBackground>
  )
}
//Styles 
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: 'absolute',
    top: 70,
    alignItems: 'center',
  },

  tagline: {
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'italic',
    textTransform: 'capitalize',
    paddingVertical: 20,
  },
})
export default WelcomeScreen
