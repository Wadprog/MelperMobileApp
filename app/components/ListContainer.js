import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

// Custom dependencies
import colors from '../config/colors'
import CategoryItem from './CategoryItem'
// Main function
function ListContainer({ items, style }) {
  const navigation = useNavigation()
  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.toString()}
        horizontal={true}
        renderItem={({ item }) => (
          <CategoryItem
            {...item}
            onPress={() => navigation.navigate('Store',{ item })}
          />
        )}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginVertical: 5,
    borderRadius: 15,
    backgroundColor: colors.lightGray,
  },
})
export default ListContainer
