import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/native'

// Customs imports
import Screen from '../components/Screen'
import colors from '../config/colors'
import sizes from '../config/size'
import text from '../config/text'
import CategoryItem from '../components/CategoryItem'
import { getMarkets, getMarketList } from '../store/markets'
import Text from '../components/AppText'
import routes from '../navigation/routes'

const Subtitle = styled(Text)`
text-align: center;
line-height: ${sizes.h1}px;
font-size ${sizes.font}px;
font-style: italic;
`
const Title = styled(Subtitle)`
font-size ${sizes.largeTitle}px;
font-weight: 900;
font-style: normal;
`
const Box = styled.View`
  background-color: ${colors.white};
  width: ${sizes.width * 0.95}px;
  height: ${sizes.maxMargin*2}px;
  margin: 15px 10px 35px 10px;
  border-radius: ${sizes.radius}px;
  align-self: center;
`
const Markets = styled.FlatList`
  margin-left: ${sizes.margin1}px;
`
const Separator = styled.View`
  height: ${sizes.body5}px;
  width: ${sizes.width * 0.85}px;
  background-color: ${colors.lightGray3};
  margin-vertical: ${sizes.margin1}px;
  border-radius: ${sizes.radius}px
`
// Main Function
const MarketList = ({ navigation }) => {
  const dispatch = useDispatch()
  const markets = useSelector(getMarkets)

  useEffect(() => dispatch(getMarketList()), [])

  return (
    <Screen loading={markets.loading}>
      <Subtitle>{text.appTagLine}</Subtitle>
      <Title>{text.appName}</Title>
      <Box></Box>
      <Title>{text.markets}</Title>
      <Markets
        data={markets.list}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <CategoryItem
            {...item}
            onPress={() =>
              item.app
                ? navigation.navigate(item.app, { item })
                : navigation.navigate(routes.Store, { item })
            }
          />
        )}
        numColumns={4}
        ItemSeparatorComponent={() => <Separator />}
      />
    </Screen>
  )
}

export default MarketList
