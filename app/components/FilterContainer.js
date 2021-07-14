import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'

import NBadge from './NBadge'
import Colors from '../config/colors'

function FilterContainer({ onPress, categories, style }) {
  
  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.name.toString()}
        renderItem={({ item }) => <NBadge {...item} onPress={onPress} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default FilterContainer
