import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MapView, { Callout, Circle, Marker } from 'react-native-maps'
import Screen from './Screen'
import sizes from '../config/size'
import colors from '../config/colors'
import styled from 'styled-components/native'
import Text from './AppText'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Button from './AppButton'
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
  const [pin, setPin] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
  })
  const [region, setRegion] = React.useState({
    latitude: 37.78825,
    longitude: -122.4323,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  return (
    <PageWrapper>
      <GooglePlacesAutocomplete
        placeholder="Search directions"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details)
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          })
        }}
        query={{
          key: 'KEY',
          language: 'en',
          components: 'country:us',
          types: 'establishment',
          radius: 30000,
          location: `${region.latitude}, ${region.longitude}`,
        }}
        styles={{
          container: {
            flex: 0,
            position: 'absolute',
            width: '100%',
            zIndex: 1,
          },
          listView: { backgroundColor: 'white' },
        }}
      />
      <MapView
        style={{ width: sizes.width, height: sizes.height * 0.75 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
      >
        <Marker
          coordinate={pin}
          pinColor="black"
          draggable={true}
          onDragStart={(e) => console.log('Drag start')}
          onDragEnd={(e) => {
            console.log('Done Dragging')
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            })
          }}
        >
          <Callout>
            <Text>I'm here</Text>
          </Callout>
        </Marker>
        <Circle center={pin} radius={500} />
      </MapView>
      <CurrentLoction>
        <MaterialCommunityIcons name="crosshairs-gps" />
      </CurrentLoction>
      <Bottom>
        <AppQuestion>Where do we send your order?</AppQuestion>
        <Row>
          <LocationSuggestion>Your are current at </LocationSuggestion>
          <Text>Your are current at </Text>
        </Row>
        <Button title="Next >" />
      </Bottom>
    </PageWrapper>
  )
}
