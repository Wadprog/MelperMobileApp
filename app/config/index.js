import Constants from 'expo-constants'
import image from './image'
import size from './size'
import colors from './colors'
import text from './text'
const environment = {
  development: {
    image,
    size,
    colors,
    text,
    BASE_URL: 'http://localhost:4000/',
    endpoints: {
      REGISTER: '/register',
      LOG_IN: '/auth',
      MARKET: '/market',
      STORE: '/store/',
      EXPECTED_HEADER: 'x-auth-token',
      MAKE_PAYMENT: '/payments',
    },
  },
  staging: {
    image,
    size,
    colors,
    text,
    BASE_URL:
      'https://script.google.com/macros/s/AKfycbyYu5WBkf7_B-cFYwSqOZVLfJfWVsz8Esv39a-gdKWKDrc5o4hUARdmFRT2S1S1_glERQ',
    endpoints: {
      REGISTER: '/exec?action=register&sheet=users',
      LOG_IN: '/exec?action=auth&sheet=users',
      MARKET: '/exec?action=read&sheet=Markets',
      STORE: '/exec?action=readStore&sheet=',
      EXPECTED_HEADER: 'x-auth-token',
      MAKE_PAYMENT: '/payments',
    },
  },
  production: {},
}
const getEnvironment = () => {
  if (__DEV__) return environment.development
  if (Constants.manifest.releaseChannel === 'staging')
    return environment.staging
  return environment.production
}

export default getEnvironment()

//'https://script.google.com/macros/s/AKfycbzHbBNh9PBAaeMF99SBLuvIwuZ7n3wPI_FgKYYIttYfbuMgg7pz1Uikfat8H6R5nts32w',
