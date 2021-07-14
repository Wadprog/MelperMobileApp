import colors from './colors'
import { Platform } from 'react-native'

export default {
  colors,
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  },
  my_1: {
    marginVertical: 15,
  },
}
