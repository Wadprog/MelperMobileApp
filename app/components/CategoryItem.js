import React from 'react'
import { StyleSheet, View, TouchableHighlight, Image } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'
import AppText from './AppText'
import colors from '../config/colors'


function CategoryItem({ icon, photo, name, color, onPress }) {
  return (
    <TouchableHighlight onPress={onPress} underlayColor={colors.light}>
      <View style={styles.container}>
        {
          <View style={styles.iconContainer}>
            {photo ? (
              <Image style={styles.image} source={photo} />
            ) : (
              <FontAwesome name={icon} size={34} color={color} />
            )}
          </View>
        }
        <AppText style={styles.text}>{name}</AppText>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    width: 90,
    overflow: 'hidden',
  },
  text: {
    textAlign: 'center',
    marginTop: 3,
  },

  iconContainer: {
    backgroundColor: colors.white,
    width: 60,
    height: 60,
    borderRadius: 999,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 70,
    height: 70,
  },
  categoryWrapper: {},
})
export default CategoryItem
