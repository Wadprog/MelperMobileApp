import React from 'react'
import {
  View,
  SafeAreaView,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Chip, Caption, Divider } from 'react-native-paper'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import FavoritesPlaces from './FavoritesPlaces'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentUser } from '../store/auth'
import { GOOGLE_MAP_API_KEY } from '../env'
import { setDestination } from '../store/map'
import colors from '../config/colors'
import sizes from '../config/size'

import Text from './AppText'
const GoTo = ({ navigation }) => {
  const dispatch = useDispatch()

  const user = useSelector(getCurrentUser)
  return (
    <SafeAreaView>
      <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 10 }}>
        Good Day, {user.user.user.firstName}
      </Text>
      <View>
        <GooglePlacesAutocomplete
          styles={style}
          fetchDetails={true}
          placeholder="Where do you want to go"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          returnKeyType={'search'}
          query={{ key: GOOGLE_MAP_API_KEY, lang: 'en' }}
          onPress={(data, details = null) => {
            dispatch(
              setDestination({
                location: details.geometry.location,
                description: data.description,
              })
            )
            navigation.navigate('other')
          }}
        />
        <FavoritesPlaces />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 'auto',
        }}
      >
        <Chip icon="car">Rides</Chip>
        <Chip icon="car">Eats</Chip>
      </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: '#DDDDDF',
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
})
export default GoTo
