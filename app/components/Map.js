import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import colors from '../config/colors'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styled from 'styled-components/native'

const Bottom = styled.View`
  background-color: ${colors.lightGray3};
  height: 200px;
  width: 100%;
  position: absolute;
  bottom: 0px;
`
const CurrentLocation = styled.View`
  background-color: ${colors.white};
  height: 40px;
  justify-content: center;
  align-items: center;
`
const NotchBar = styled.View`
  width: 150px;
  height: 5px;
  background-color: ${colors.lightGray3};
  margin-bottom:10px
  border-radius: 5px;
`
function Map(props) {
  const toLocation = {
    latitude: 28.450627,
    longitude: -16.263045,
  }
  return (
    <>
      <Text> Mapp guy</Text>
      {/* <MapView
        coordinate={toLocation}
        style={{ width: '100%', height: '100%' }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 28.450627,
          longitude: -16.263045,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker coordinate={toLocation}>
          <MaterialCommunityIcons
            name="home-map-marker"
            size={30}
            color={colors.primary}
          />
        </Marker>
      </MapView>
      <Bottom>
        <CurrentLocation>
          <NotchBar />
          <Text>You are currently on the 10th ave</Text>
        </CurrentLocation>
      </Bottom> */}
    </>
  )
}

export default Map
