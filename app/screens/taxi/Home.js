import React from 'react'
import styled from 'styled-components/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAP_API_KEY } from '../../env'
// Custom Import for
import Screen from '../../components/Screen'
import { useDispatch } from 'react-redux'
import { setDestination } from '../../store/map'
import { useNavigation } from '@react-navigation/native'
import routes from '../../navigation/routes'
const Home = (props) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  return (
    <Screen>
      <GooglePlacesAutocomplete
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
          navigation.navigate(routes.TAXI_MAP)
        }}
      />
    </Screen>
  )
}

export default Home
