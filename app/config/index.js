import Constants from 'expo-constants'
const environment = {
  development: {
    BASE_URL:
      'https://script.google.com/macros/s/AKfycbzHbBNh9PBAaeMF99SBLuvIwuZ7n3wPI_FgKYYIttYfbuMgg7pz1Uikfat8H6R5nts32w',
    endpoints: {
      REGISTER: '/exec?action=register&sheet=users',
      LOG_IN: '/exec?action=auth&sheet=users',
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
