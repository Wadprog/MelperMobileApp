import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import colors from '../../config/colors'
import sizes from '../../config/size'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Text from '../AppText'

const Title = styled(Text)`
  font-size: ${sizes.h2}px;
  line-height: ${sizes.body1}px;
`
const Subtitle = styled(Text)`
  font-size: ${sizes.body3}px;
  line-height: ${sizes.h2}px;
`
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
        <MaterialCommunityIcons name="home" color="gold" size={25} />
      </View>

      {/* Wordings section */}
      <View
        style={{
          flex: 1,
          marginLeft: sizes.radius,
          justifyContent: 'center',
        }}
      >
        <Title>Special Offer</Title>
        <Subtitle>Adding to your cart</Subtitle>
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
