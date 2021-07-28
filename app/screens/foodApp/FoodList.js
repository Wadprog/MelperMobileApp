import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import colors from '../../config/colors'
import FoodCategoryItem from '../../components/foodApp/FoodCategory'
import Food from '../../components/foodApp/FoodListItem'
import Screen from '../../components/Screen'

const categoryData = []
import { getCurrentStore, getStoreData } from '../../store/store'

function Home({ route, navigation }) {
  // Hooks
  const dispatch = useDispatch()
  const foods = useSelector(getCurrentStore('food'))
  useEffect(() => dispatch(getStoreData('food')), [])

  const getCategory = (foods) => {}
  const [categories, setCategories] = useState(categoryData)

  return (
    <Screen>
      {/* Main categories   */}
      <FoodCategoryItem item={{ ...categories[0] }} />

      <View style={{ padding: 20 }}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => <FoodCategoryItem item={item} />}
          contentContainerStyle={{ paddingVertical: 20 }}
        />

        <FlatList
          data={foods}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <Food
              item={item}
              onPress={() => navigation.navigate('ScreenG', { item })}
            />
          )}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 30,
          }}
        />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
})
export default Home
