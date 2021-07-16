import React from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'

//Custom dependencies
import Text from '../AppText'
import colors from '../../config/colors'
import size from '../../config/size'

function FoodCategoryItem({ isSelected = false, item, onPress }) {
  return (
    <TouchableOpacity
      style={{
        padding: size.padding,
        paddingBottom: size.padding * 2,
        backgroundColor: isSelected ? colors.primary : colors.white,
        borderRadius: size.radius,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: size.padding,
        ...styles.shadow,
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isSelected ? colors.white : colors.lightGray,
        }}
      >
        <Image
          source={item.icon}
          resizeMode="contain"
          style={{
            width: 30,
            height: 30,
          }}
        />
      </View>

      <Text
        style={{
          marginTop: size.padding,
          color: isSelected ? colors.white : colors.black,
          lineHeight: 22,
          fontSize: size.body5,
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
})
export default FoodCategoryItem
