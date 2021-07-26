import React from 'react'
import { View, TouchableOpacity,Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'


import sizes from '../../config/size'
import colors from '../../config/colors'

function Little(props) {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: '5%',
        left: sizes.padding,
        right: sizes.padding,
        flexDirection: 'row',
        height: 70,
        backgroundColor: colors.white,
        borderRadius: 35,
      }}
    >
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={() => console.log('oo')}
          style={{ backgroundColor: colors.lightGray2 }}
        >
          <MaterialCommunityIcons name="minus" color={colors.black} size={35} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            width: 50,
            borderRadius: 10,
            backgroundColor: colors.secondary,
          }}
          onPress={() => console.log('Placing order')}
        >
          <Text>5</Text>
          <MaterialCommunityIcons name="cart" color={colors.white} size={35} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          style={{ backgroundColor: colors.lightGray2 }}
          onPress={() => console.log('Profile on clicked')}
        >
          <MaterialCommunityIcons name="plus" color={colors.black} size={35} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Little
