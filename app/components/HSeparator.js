import React from 'react'
import { StyleSheet, View } from 'react-native'
import colors from '../config/colors'
function HSeparator(props) {
  return <View style={styles.line} />
}

const styles = StyleSheet.create({
  line: {
    height: 1,
    width: '100%',
    backgroundColor: colors.black,
  },
})
export default HSeparator
