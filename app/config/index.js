import Constants from 'expo-constants'
const environment = {
  development: {
    BASE_URL:
      'https://script.google.com/macros/s/AKfycbyYu5WBkf7_B-cFYwSqOZVLfJfWVsz8Esv39a-gdKWKDrc5o4hUARdmFRT2S1S1_glERQ',
    endpoints: {
      REGISTER: '/exec?action=register&sheet=users',
      LOG_IN: '/exec?action=auth&sheet=users',
      MARKET: '/exec?action=read&sheet=Markets',
      STORE: '/exec?action=readStore&sheet=',
    },
  },
  staging: {},
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
