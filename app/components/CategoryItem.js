import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Avatar, Caption } from 'react-native-paper'
// Custom dependencies
import colors from '../config/colors'
import sizes from '../config/size'

function CategoryItem({ icon, photo, name, color, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      underlayColor={colors.light}
      style={{
        margin: sizes.base,
        flexGrow: 1,
      }}
    >
      <>
        {photo ? (
          <Avatar.Image source={photo} size={sizes.maxMargin1} />
        ) : (
          <Avatar.Icon
            style={{ backgroundColor: colors.white }}
            icon={icon}
            size={sizes.maxMargin1}
            color={color}
          />
        )}
        <Caption style={{ textAlign: 'center' }}>{name}</Caption>
      </>
    </TouchableOpacity>
  )
}

export default CategoryItem
