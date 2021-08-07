import React, { useEffect } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MapView, { Callout, Circle, Marker } from 'react-native-maps'
import Screen from './Screen'
import sizes from '../config/size'
import colors from '../config/colors'
import styled from 'styled-components/native'
import Text from './AppText'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Button from './AppButton'
import { setPosition, getLocation } from '../store/map'
import { getCurrentUser } from '../store/auth'
import { useDispatch, useSelector } from 'react-redux'

import { GOOGLE_MAP_API_KEY} from '../env.js'
const Bottom = styled.View`
  flex: 1;
  border-top-left-radius: ${sizes.radius}px;
  border-top-right-radius: ${sizes.radius}px;
  background-color: ${colors.white};
  padding: ${sizes.padding}px;
`
const PageWrapper = styled(Screen)`
  border-top-left-radius: ${sizes.radius}px;
  border-top-right-radius: ${sizes.radius}px;
  position: relative;
`

const CurrentLoction = styled.TouchableOpacity`
  position: absolute;
  top: 70%;
  right:10px
   background-color: ${colors.white};
   padding:${sizes.base}px
   border-radius:${sizes.maxMargin}px
`
const AppQuestion = styled(Text)`
  font-weight: bold;
`

const LocationSuggestion = styled(Text)`
  font-weight: bold;
`
const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${sizes.base10 * 1.5}px;
`
export default function Map() {
  console.log({ GOOGLE_MAP_API_KEY })
  const dispatch = useDispatch()
  const locations = useSelector(getLocation)
  const currentUser = useSelector(getCurrentUser)

  useEffect(() => {
    if (!currentUser.user.user.homeLocation) return
    const loc = currentUser.user.user.homeLocation

    dispatch(
      setPosition({
        lat: loc.latitude,
        lng: loc.longitude || loc.longitude?.$numberDecimal,
      })
    )
  }, [])
  return (
    <PageWrapper>
      <GooglePlacesAutocomplete
        debounce={400}
        enablePoweredByContainer={false}
        fetchDetails={true}
        fetchDetails={true}
        minLength={4}
        onPress={(data, details = null) => {
          dispatch(
            setPosition({
              ...details.geometry.location,
              description: data.description,
            })
          )
        }}
        placeholder="Delivery address"
        query={{
          key: GOOGLE_MAP_API_KEY,
          language: 'en',
        }}
        returnKeyType={'search'}
        styles={{
          container: {
            flex: 0,
            width: '100%',
            zIndex: 10,
          },
          listView: { backgroundColor: 'red' },
        }}
      />
      <MapView
        mapType="mutedStandard"
        style={{ width: sizes.width, height: sizes.height * 0.75 }}
        initialRegion={{
          latitude: locations.position?.lat,
          longitude: locations.position?.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        region={{
          latitude: locations.position?.lat,
          longitude: locations.position?.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        onRegionChange={(region) => {
          if (!locations.position) return
          dispatch(
            setPosition({
              lat: region.latitude,
              lng: region.longitude,
            })
          )
        }}
      >
        {locations.position?.lat && (
          <Marker
            coordinate={{
              latitude: locations.position?.lat,
              longitude: locations.position?.lng,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            pinColor="black"
            draggable={true}
            onDragStart={(e) => {}}
            onDragEnd={(e) => {
              dispatch(
                setPosition({
                  ...locations.position,
                  lat: e.nativeEvent.coordinate.latitude,
                  lng: e.nativeEvent.coordinate.longitude,
                })
              )
            }}
            title="Delivery Address"
            description={locations.position?.description}
            identifier="Delivery Location"
          >
            <Callout>
              <Text> "I'm here"</Text>
            </Callout>
          </Marker>
        )}
      </MapView>
      <CurrentLoction>
        <MaterialCommunityIcons name="crosshairs-gps" />
      </CurrentLoction>
      {/* <Bottom>
        <AppQuestion>Where do we send your order?</AppQuestion>
        <Row>
          {locations.position?.description && (
            <>
              <LocationSuggestion>
                Delivery address is set to{' '}
              </LocationSuggestion>
              <Text>{locations.position.description} </Text>
            </>
          )}
        </Row>
        <Button title="Next >" />
      </Bottom> */}
    </PageWrapper>
  )
}
