import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/native'

// Customs imports
import Screen from '../components/Screen'
import colors from '../config/colors'
import sizes from '../config/size'
import CategoryItem from '../components/CategoryItem'
import { getMarkets, getMarketList } from '../store/markets'
import Text from '../components/AppText'

const Subtitle = styled(Text)`
text-align: center;
line-height: 32px;
font-size 15px;
font-style: italic;
`
const Title = styled(Subtitle)`
font-size 45px;
font-weight: 900;
font-style: normal;
`
const Box = styled.View`
  background-color: ${colors.white};
  width: ${sizes.width * 0.95}px;
  height: 210px;
  margin: 15px 10px 35px 10px;
  border-radius: 15px;
  align-self: center;
`
const Markets = styled.FlatList`
  margin-left: 20px;
`
const Separator = styled.View`
  height: 12px;
  width: ${sizes.width * 0.85}px;
  background-color: ${colors.lightGray3};
  margin-vertical: 20px;
`
// Main Function
const MarketList = ({ navigation }) => {
  const dispatch = useDispatch()
  const markets = useSelector(getMarkets)
  
  useEffect(() => dispatch(getMarketList()), [])

  return (
    <Screen loading={markets.loading}>
      <Subtitle>One tap, every application</Subtitle>
      <Title>Melper</Title>
      <Box></Box>
      <Title>Our markets</Title>
      <Markets
        data={markets.list}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <CategoryItem
            {...item}
            onPress={() =>
              item.app
                ? navigation.navigate(item.app, { item })
                : navigation.navigate('Store', { item })
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
