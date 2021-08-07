import React, { useState } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native'
import { Avatar } from 'react-native-paper'
import colors from '../config/colors'
import sizes from '../config/size'
import Text from './AppText'
import { Image } from 'react-native-expo-image-cache'
import { MaterialCommunityIcons } from '@expo/vector-icons'
const data = [
  {
    id: 'uber-car-1',
    title: 'Uber X',
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
    title: 'Uber XL',
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
    title: 'Uber LUX',
    multiplier: 1.75,
    image: {
      thumbnail:
        'https://res.cloudinary.com/dnesmf7ah/image/upload/c_thumb,w_200,g_face/v1628305517/melperMedia/uberCarWhite_zlbf4k.jpg',
      original:
        'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/Lux.png',
    },
  },
]
const OTHER = ({ navigation }) => {
  const [selected, setSelected] = useState(null)
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
          onPress={() => navigation.navigate('goto')}
        >
          <MaterialCommunityIcons size={18} name="chevron-left" />
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Select Your Ride
        </Text>
      </View>
      <View style={{ flex: 0 }}>
        <FlatList
          data={data}
          renderItem={({ item: { image, title, id }, item }) => (
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
              <Image
                style={{ height: 100, width: 100 }}
                uri={image.original}
                preview={{ uri: image.thumbnail }}
              />
              <View>
                <Text style={{ fontWeight: 'bold' }}>{title}</Text>
                <Text>Travel time</Text>
              </View>
              <Text>$99.00</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity style={{ flex: 1 }}>
        <Text>You Chose aCard</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default OTHER

const styles = StyleSheet.create({})
