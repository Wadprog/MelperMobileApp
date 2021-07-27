import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import sizes from '../../config/size'
import colors from '../../config/colors'

function Little({ amountOfOrders, Total, ...rest }) {
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
        <TouchableOpacity onPress={() => rest.onSetLocation()}>
          <MaterialCommunityIcons
            name="map-marker"
            color={colors.blue}
            size={35}
          />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          style={{
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            width: 50,
            borderRadius: 10,
            backgroundColor: colors.secondary,
          }}
          onPress={() => rest.onOrder()}
        >
          {amountOfOrders && (
            <View
              style={{
                borderRadius: 99,
                width: 30,
                height: 30,
                position: 'absolute',
                top: -10,
                right: -4,
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: colors.white,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
                {amountOfOrders}
              </Text>
            </View>
          )}
          <MaterialCommunityIcons name="cart" color={colors.white} size={35} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => rest.onSetCreditCard()}>
          {Total && (
            <View
              style={{
                borderRadius: 99,
                padding: 3,
                position: 'absolute',
                top: -15,
                right: -46,
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1,
              }}
            >
              <Text
                style={{
                  color: colors.white,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
                ${Total}
              </Text>
            </View>
          )}
          <MaterialCommunityIcons
            name="credit-card"
            color={colors.blue}
            size={35}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Little
