import React from 'react'
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native'
import AppButton from './AppButton'

// Customs imports

import colors from '../config/colors'
import AppText from './AppText'
import { FontAwesome } from '@expo/vector-icons'
import color from '../config/colors'
function CircleItem({ title, subtitle, image, onPress }) {
  return (
    <TouchableHighlight onPress={onPress} underlayColor={color.light}>
      <View style={styles.container}>
        <Image style={styles.image} source={image} />
        {(title || subtitle) && (
          <View>
            {title && <AppText style={styles.title}> {title}</AppText>}
            {subtitle && <AppText style={styles.subtitle}> {subtitle}</AppText>}
          </View>
        )}
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  image: {
    width: 80,
    height: 80,
    backgroundColor: colors.secondary,
    borderRadius: 40,
  },
  container: {
    flexDirection: 'row',
    marginVertical: 2,
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'italic',
    textTransform: 'capitalize',
    paddingVertical: 20,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '400',
  },
})
export default CircleItem
