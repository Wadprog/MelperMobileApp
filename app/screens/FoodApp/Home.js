import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { View, StyleSheet, FlatList, Text } from 'react-native'

import colors from '../../config/colors'
import FoodCategoryItem from './FoodCategoryItem'
import Food from './Food'
import Screen from '../../components/Screen'
import categoryData from '../../Seed/FoodCat'
import restaurantData from '../../Seed/resData'

import { getCurrentStore, getStoreData } from '../../store/store'

function Home(props) {
  // Hooks
  const dispatch = useDispatch()
  const foods = useSelector(getCurrentStore('food'))
  useEffect(() => {
    dispatch(getStoreData('food'))
  }, [])

  console.log({ foodsReceibed: foods })
  const [categories, setCategories] = React.useState(categoryData)
  const [restaurants, setRestaurants] = React.useState(restaurantData)

  return (
    <Screen style={styles.container}>
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
          renderItem={({ item }) => <Food item={item} />}
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
  container: {
    flex: 1,
    backgroundColor: colors.lightGray4,
  },
  shadow: {
    shadowColor: '#000',
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
