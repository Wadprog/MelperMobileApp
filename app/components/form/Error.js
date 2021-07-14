import React from 'react'
import { StyleSheet } from 'react-native'
// Custom dependencies
import colors from '../../config/colors'
import Text from '../AppText'

function FormError({ error, visible }) {
  if (!visible || !error) return null
  return <Text style={styles.error}>{error}</Text>
}

// Styles
const styles = StyleSheet.create({
  error: {
    color: colors.danger,
  },
})

export default FormError
