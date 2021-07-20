import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
 
} from 'react-native'
import { images, FONTS } from '../../constants'
import colors from '../../config/colors'
import sizes from '../../config/size'
import { MaterialCommunityIcons } from '@expo/vector-icons'
const PromotionCard = () => {
  return (
    <View
      style={[
        styles.shadow,
        {
          flexDirection: 'row',
          marginHorizontal: sizes.padding3,
          padding: sizes.radius,
          height: 110,
          borderRadius: 20,
          backgroundColor: colors.white,
        },
      ]}
    >
      <View
        style={{
          width: 50,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.lightGray2,
          borderRadius: 20,
        }}
      >
        <Image
          source={images.sofa}
          resizeMode="contain"
          style={{
            width: '60%',
            height: '60%',
          }}
        />
      </View>

      {/* Wordings section */}
      <View
        style={{
          flex: 1,
          marginLeft: sizes.radius,
          justifyContent: 'center',
        }}
      >
        <Text style={{ ...FONTS.h2 }}>Special Offer</Text>
        <Text style={{ ...FONTS.body3 }}>Adding to your cart</Text>
      </View>

      {/* Button */}
      <View
        style={{
          marginRight: sizes.radius,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            height: '70%',
            width: 40,
            borderRadius: 10,
          }}
          onPress={() => {
            console.log('Promo on clicked')
          }}
        >
          <MaterialCommunityIcons name="home" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
})

export default PromotionCard
