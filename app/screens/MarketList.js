import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, ActivityIndicator, FlatList } from 'react-native'

// Customs imports
import Screen from '../components/Screen'
import colors from '../config/colors'
import CategoryItem from '../components/CategoryItem'
import { getMarkets, getMarketList } from '../store/markets'

// Main Function
const MarketList = ({ navigation }) => {
  const dispatch = useDispatch()
  const markets = useSelector(getMarkets)
  useEffect(() => {
    dispatch(getMarketList())
  }, [])

  return (
    <Screen style={styles.screen}>
      <ActivityIndicator animating={markets.loading} />
      <FlatList
        data={markets.list}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <CategoryItem
            {...item}
            onPress={() => {
              return item.app
                ? navigation.navigate(item.app, { item })
                : navigation.navigate('Store', { item })
            }}
          />
        )}
        numColumns={4}
        ItemSeparatorComponent={() => <Separator />}
      />
    </Screen>
  )
}

// List Separator for the markets
const Separator = () => (
  <View
    style={{
      height: 12,
      width: '100%',
      backgroundColor: colors.lightGray3,
      marginVertical: 20,
    }}
  />
)

// Styles
const styles = StyleSheet.create({
  screen: { backgroundColor: colors.lightGray },

  fluid: {
    paddingHorizontal: 5,
    flex: 0,
  },
  userList: {
    paddingVertical: 5,
  },
  wrapper: {
    flex: 0,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  input: {
    width: '70%',
  },
})

export default MarketList
