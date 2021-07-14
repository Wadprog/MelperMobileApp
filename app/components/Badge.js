import React from 'react'
import { View, StyleSheet } from 'react-native'

import Text from './AppText'
function badge(props) {
  return (
    <View
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          padding: 3,
          borderRadius: 10,
          backgroundColor: props.background ? props.background : 'red',
        },
        props.style,
      ]}
    >
      <Text style={styles.text}>{props.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: '900'
  },
})
export default badge
