import React from 'react'
import { StyleSheet, View, TouchableHighlight } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import Text from './AppText'
import Colors from '../config/colors'
function NBadge({ icon, name, active = true, onPress }) {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.wrapper}>
        {active ? (
          <>
            <FontAwesome name={icon} size={20} color={Colors.primary} />
            <Text style={[styles.text, styles.activeText]}>{name}</Text>
          </>
        ) : (
          <>
            <FontAwesome name={icon} size={20} />
            <Text style={styles.text}>{name}</Text>
          </>
        )}
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginHorizontal: 5,
    marginVertical: 3,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  text: {
    fontSize: 14,
    marginLeft: 4,
  },

  activeText: { color: Colors.black, fontWeight: '700' },
  activeIcon: {},
})
export default NBadge
