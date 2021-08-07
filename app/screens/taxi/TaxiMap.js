import React, { useEffect, useRef } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import styled from 'styled-components/native'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigation } from '@react-navigation/native'
import * as Location from 'expo-location'
// Custom dependencies
import Screen from '../../components/Screen'
import FavoritesPlaces from '../../components/FavoritesPlaces'
import config from '../../config'
import { GOOGLE_MAP_API_KEY } from '../../env'
import { getLocation } from '../../store/map'
import { createStackNavigator } from '@react-navigation/stack'
import { setDepartureFrom } from '../../store/map'

import GOTO from '../../components/GoTo'
import OTHER from '../../components/OTHER'
const HalfScreen = styled(KeyboardAvoidingView)`
  height: ${config.size.height / 2}px;
  flex: 1;
`

function TaxiMap(props) {
  const mapRef = useRef(null)
  const _getLocation = async (cb) => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted')
      return Alert('Permission to access location was denied')
    let location = await Location.getCurrentPositionAsync({})

    cb(location)
  }

  const map = useSelector(getLocation)
  const currentLocation = useSelector(getLocation).currentLocation
  const destination = useSelector(getLocation).destination
  const Stack = createStackNavigator()
  const dispatch = useDispatch()

  useEffect(() => {
    _getLocation((location) => {
      dispatch(
        setDepartureFrom({
          location: {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          },
          description: 'Haiti, Port-au-Prince, Haiti',
        })
      )
    })
  }, [])
  useEffect(() => {
    if (!currentLocation || !destination) return
    //Zoom and fit to the markers
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    })
  }, [destination, currentLocation])
  console.log({ map })
  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS == 'ios' ? -64 : 0}
      >
        <HalfScreen>
          {currentLocation?.location?.lat && (
            <MapView
              ref={mapRef}
              mapType="mutedStandard"
              style={{ flex: 1 }}
              initialRegion={{
                latitude: currentLocation?.location.lat,
                longitude: currentLocation?.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
            >
              {currentLocation?.location && (
                <Marker
                  coordinate={{
                    latitude: currentLocation?.location.lat,
                    longitude: currentLocation?.location.lng,
                  }}
                  title="Pick Up Location"
                  description={currentLocation?.description}
                  identifier="origin"
                />
              )}
              {destination?.location && (
                <Marker
                  coordinate={{
                    latitude: destination.location.lat,
                    longitude: destination.location.lng,
                  }}
                  title="Destination Location"
                  description={destination?.description}
                  identifier="destination"
                />
              )}

              {currentLocation?.location && destination?.location && (
                <MapViewDirections
                  origin={{
                    ...currentLocation,
                    latitude: currentLocation.location.lat,
                    longitude: currentLocation.location.lng,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  }}
                  destination={{
                    ...destination,
                    latitude: destination.location.lat,
                    longitude: destination.location.lng,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  }}
                  apikey={GOOGLE_MAP_API_KEY}
                  strokeWidth={3}
                  strokeColor="black"
                />
              )}
            </MapView>
          )}
        </HalfScreen>

        <HalfScreen
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS == 'ios' ? -64 : 0}
        >
          <Stack.Navigator>
            <Stack.Screen
              name="goto"
              component={GOTO}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="other"
              component={OTHER}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </HalfScreen>
      </KeyboardAvoidingView>
    </Screen>
  )
}

export default TaxiMap
