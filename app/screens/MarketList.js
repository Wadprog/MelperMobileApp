import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import {
  Headline,
  Caption,
  Card,
  Divider,
  Subheading,
  Title
} from 'react-native-paper'
import { FlatList } from 'react-native'
// Customs imports
import Screen from '../components/Screen'
import colors from '../config/colors'
import sizes from '../config/size'
import text from '../config/text'
import CategoryItem from '../components/CategoryItem'
import { getMarkets, getMarketList } from '../store/markets'
import routes from '../navigation/routes'

const Box = styled(Card)`
  background-color: ${colors.white};
  width: ${sizes.width * 0.95}px;
  height: ${sizes.maxMargin * 2}px;
  margin: 15px 10px 35px 10px;
  align-self: center;
`
const Separator = styled.View`
  height: ${sizes.body5}px;
  width: ${sizes.width * 0.85}px;
  background-color: ${colors.lightGray3};
  margin-vertical: ${sizes.margin1}px;
`
// Main Function
const MarketList = ({ navigation }) => {
  const dispatch = useDispatch()
  const markets = useSelector(getMarkets)

  useEffect(() => dispatch(getMarketList()), [])

  return (
    <Screen loading={markets.loading}>
      <Subheading style={{ textAlign: 'center' }}>{text.appTagLine}</Subheading>
      <Headline style={{ textAlign: 'center' }}>{text.appName}</Headline>
      <Box></Box>
      <Title style={{ textAlign: 'center' }}>{text.markets}</Title>
      <FlatList
        data={markets.list}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <>
            <CategoryItem
             
              
              {...item}
              onPress={() =>
                item.app
                  ? navigation.navigate(item.app, { item })
                  : navigation.navigate(routes.Store, { item })
              }
            />
            
          </>
        )}
        numColumns={4}
        ItemSeparatorComponent={() => <Divider />}
      />
    </Screen>
  )
}

export default MarketList
