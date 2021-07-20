import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, FlatList, View } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import Screen from '../../components/Screen'
import sizes from '../../config/size'
import colors from '../../config/colors'
import ListItem from '../../components/seconHandApp/ListItem'
import PromotionCard from '../../components/seconHandApp/PromotionCard'

const ScrollableTab = ({ tabList, selectedTab, onPress }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ marginHorizontal: sizes.padding3 }}
      onPress={() => onPress(item)}
    >
      <Text
        style={{
          color: colors.secondary,
          fontSize: sizes.body2,
          lineHeight: 30,
        }}
      >
        {item.name}
      </Text>

      {selectedTab.id == item.id && (
        <View style={{ alignItems: 'center', marginTop: sizes.base }}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: colors.blue,
            }}
          ></View>
        </View>
      )}
    </TouchableOpacity>
  )

  return (
    <View style={{ marginTop: sizes.padding3 }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={tabList}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  )
}

import { getCurrentStore, getStoreData } from '../../store/store'

const Home = ({ navigation }) => {
  const dispatch = useDispatch()
  const items = useSelector(getCurrentStore('secondHand'))
  const [tabList, setTabList] = useState([])
  const [selectedTab, setSelectedTab] = useState({})
  useEffect(() => {
    dispatch(getStoreData('secondHand'))
    setTabList(items)
    setSelectedTab(items[0])
  }, [])

  return (
    <Screen>
      <ItemTitle title={selectedTab.title} />
      <ScrollableTab
        tabList={tabList}
        selectedTab={selectedTab}
        onPress={(item) => setSelectedTab(item)}
      />
      <View style={{ flex: 1 }}>
        <View style={{ marginTop: sizes.padding3 }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={selectedTab.productList}
            renderItem={({ item }) => <ListItem item={item} />}
            keyExtractor={(item) => `${item.productId}`}
          />
        </View>
      </View>

      <View style={{ height: '19%', justifyContent: 'flex-end' }}>
        <PromotionCard />
      </View>
    </Screen>
  )
}
const ItemTitle = ({ title }) => {
  return (
    <View
      style={{ marginTop: sizes.padding3, marginHorizontal: sizes.padding3 }}
    >
      <Text
        style={{
          color: colors.black,
          fontSize: sizes.largeTitle,
          lineHeight: 55,
        }}
      >
        Collection of
      </Text>
      <Text
        style={{
          color: colors.black,
          fontSize: sizes.largeTitle,
          lineHeight: 55,
        }}
      >
        {title}
      </Text>
    </View>
  )
}

export default Home
