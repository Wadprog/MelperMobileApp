import React, { useState } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  View,
  Modal,
} from 'react-native'

import { Avatar, Title, Caption, Headline, Switch } from 'react-native-paper'
import styled from 'styled-components/native'
import { useDispatch, useSelector } from 'react-redux'
import { getLocation } from '../store/map'
import colors from '../config/colors'
import useToggle from '../hooks/useToggle'

import Text from './AppText'
import Screen from './Screen'
import { Image } from 'react-native-expo-image-cache'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
const data = [
  {
    id: 'uber-car-1',
    title: 'Fair',
    multiplier: 1,
    image: {
      thumbnail:
        'https://res.cloudinary.com/dnesmf7ah/image/upload/c_thumb,w_200,g_face/v1628305517/melperMedia/uberCarWhite_zlbf4k.jpg',
      original:
        'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/Lux.png',
    },
  },
  {
    id: 'uber-car-2',
    title: 'Great',
    multiplier: 1.2,
    image: {
      thumbnail:
        'https://res.cloudinary.com/dnesmf7ah/image/upload/c_thumb,w_200,g_face/v1628305514/melperMedia/ubercarBlack_qecpd8.jpg',
      original:
        'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/Lux.png',
    },
  },
  {
    id: 'uber-car-3',
    title: 'Luxury',
    multiplier: 1.75,
    image: {
      thumbnail:
        'https://res.cloudinary.com/dnesmf7ah/image/upload/c_thumb,w_200,g_face/v1628305517/melperMedia/uberCarWhite_zlbf4k.jpg',
      original:
        'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/Lux.png',
    },
  },
]

const SurgeRate = 1.5

const Page = styled(Screen)`
  position: relative;
`
const CloseBtn = styled.TouchableOpacity`
  left: 10px;
  z-index: 5;
`
const OTHER = ({ navigation }) => {
  const travelInformation = useSelector(getLocation).travelTimeInformation
  const [selected, setSelected] = useState(null)
  const [modalState, toggleModalState] = useToggle(false)
  console.log({ travelInformation })
  return (
    <SafeAreaView>
      <View
        style={{
          position: 'relative',
          marginVertical: 10,
        }}
      >
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 15,
            top: 2,
          }}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons size={18} name="chevron-left" />
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Select Your Ride -{travelInformation?.distance.text}
        </Text>
      </View>
      <View style={{ flex: 0 }}>
        <FlatList
          data={data}
          renderItem={({ item: { image, title, id, multiplier }, item }) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 15,
                backgroundColor:
                  id === selected?.id ? colors.lightGray4 : colors.white,
              }}
              onPress={() => setSelected(item)}
            >
              <Image style={{ height: 75, width: 75 }} uri={image.original} />
              <View>
                <Text style={{ fontWeight: 'bold' }}>{title}</Text>
                <Text>{travelInformation?.duration.text} Travel time</Text>
              </View>
              <Text>
                {new Intl.NumberFormat('en-us', {
                  style: 'currency',
                  currency: 'USD',
                }).format(
                  (travelInformation?.duration.value * SurgeRate * multiplier) /
                    100
                )}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 2,
          paddingHorizontal: 15,
          paddingVertical: 2,
        }}
        onPress={() => toggleModalState()}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <FontAwesome name="cc-visa" color={'blue'} size={25} />
          <Text
            style={{
              marginLeft: 5,
            }}
          >
            ...6465
          </Text>
        </View>
        <FontAwesome name="chevron-right" color={colors.lightGray3} size={20} />
      </TouchableOpacity>
      <TouchableOpacity
        disable={!selected}
        style={{
          backgroundColor: colors.black,
          marginHorizontal: 10,
          marginVertical: 10,
          paddingHorizontal: 25,
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: colors.white,
          }}
        >
          Pay {selected?.title} ride
        </Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalState}>
        <Page>
          <CloseBtn onPress={() => toggleModalState()}>
            <MaterialCommunityIcons size={20} name="close-circle" />
          </CloseBtn>
          <Headline> Payment Details</Headline>
        </Page>
      </Modal>
    </SafeAreaView>
  )
}

export default OTHER

const styles = StyleSheet.create({})
