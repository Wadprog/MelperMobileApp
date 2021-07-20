import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, Dimensions } from 'react-native'
import Picker from '../components/Picker'
const SP = 25,
  WW = Dimensions.get('window').width

import Screen from '../components/Screen'
import Text from '../components/AppText'

import ListingItem from '../components/Lst'
import FilterContainer from '../components/FilterContainer'
//import Clothing from '../Seed/ClothingStore'
import Colors from '../config/colors'

import get from '../api/test'

const Clothing = []
const sorts = [
  { value: 't', label: 'date' },
  { value: 'p', label: 'price' },
]

function getFilter(data) {
  return data.map((c) => {
    console.log({ c })
    if (c.category) return { name: c.category, icon: 'home' }
  })
}

function StoreScreen({ navigation, route }) {
  const [category, setCategory] = useState()
  const [products, setProduct] = useState()
  const [filters, setFilters] = useState()

  useEffect(() => {
    get(`/exec?action=read&sheet=${route.params.item.name}`)
      .then((data) => {
        setProduct(data)
        setFilters(getFilter(Clothing))
      })
      .catch((err) => console.error('trouble baba'))
  }, [])
  console.log({ params: route.params.item.name })
  return (
    <Screen style={styles.screen}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.title}>Store {route.params.item.name}</Text>
          <Picker
            selectedItem={category}
            onSelectItem={(item) => setCategory(item)}
            placeholder="Sort by"
            items={sorts}
          />
        </View>
        <FilterContainer categories={filters} style={styles.filter} />
        <FlatList
          key={'_'}
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          horizontal={false}
          renderItem={({ item }) => (
            <ListingItem
              {...item}
              onPress={() => navigation.navigate('Item', { item })}
              width={(WW - SP) * 0.46}
            />
          )}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginVertical: 3,
            alignItems: 'stretch',
          }}
        />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.lightGray,
  }, //
  hg: {
    width: '100%',
    height: 45,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    paddingHorizontal: SP,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categories: {},
  picker: {
    height: 25,
    width: 100,
  },
  listContainer: {
    paddingHorizontal: 4,
  },

  filter: {
    marginVertical: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: '900',
  },
})
export default StoreScreen
