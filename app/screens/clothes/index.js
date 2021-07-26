import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { TouchableOpacity, Image, View, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentStore, getStoreData } from '../../store/store'
import rcv from '../../assets/images/recently-viewed-label.png'
import Text from '../../components/AppText'
import Screen from '../../components/Screen'
import sizes from '../../config/size'
import colors from '../../config/colors'
const FONTS = {}
const Container = styled.View``
const Title = styled(Text)`
  margin-top: ${sizes.radius}px;
  margin-horizontal: ${sizes.padding};
`
const ListContainer = styled.View`
  height: 260px;
  margin-top: ${sizes.radius}px;
`
const List = styled.FlatList``

const ArticlesContainer = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: ${sizes.padding}px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: ${colors.white};
`
const ImageWrapper = styled.View`
  width: 70px;
  margin-left: ${sizes.base};
`
const IMG = styled.Image`
  width: 100%;
  height: 100%;
`
function renderTrendingShoes(item, index) {
  var trendingStyle = {}

  if (index == 0) {
    trendingStyle = { marginLeft: sizes.padding }
  } else {
    trendingStyle = {}
  }

  return (
    <TouchableOpacity
      style={{
        height: 240,
        width: 180,
        justifyContent: 'center',
        marginHorizontal: sizes.base,
        ...trendingStyle,
      }}
      onPress={() => {
        setSelectedItem(item)
        setShowAddToBagModal(true)
      }}
    >
      <Text style={{ color: colors.gray, ...FONTS.h5 }}>{item.type}</Text>

      <View
        style={[
          {
            flex: 1,
            justifyContent: 'flex-end',
            marginTop: sizes.base,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            marginRight: sizes.padding,
            paddingLeft: sizes.radius,
            paddingRight: sizes.padding,
            paddingBottom: sizes.radius,
            backgroundColor: item.bgColor,
          },
        ]}
      >
        <View style={{ height: '35%', justifyContent: 'space-between' }}>
          <Text style={{ color: colors.white, ...FONTS.body4 }}>
            {item.name}
          </Text>
          <Text style={{ color: colors.white, ...FONTS.h3 }}>{item.price}</Text>
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          top: 27,
          right: 0,
          width: '95%',
          height: '100%',
        }}
      >
        {/* <Svg height="100%" width="100%">
          <Polygon points="0,0 160,0 160,80" fill="white" />
        </Svg> */}
      </View>

      <Image
        source={item.img}
        resizeMode="cover"
        style={{
          position: 'absolute',
          top: 50,
          right: 0,
          width: '98%',
          height: 80,
          transform: [{ rotate: '-15deg' }],
        }}
      />
    </TouchableOpacity>
  )
}
function index(props) {
  const dispatch = useDispatch()
  const [trending, setTrending] = useState([])
  const [recentlyViewed, setRecentlyViewed] = useState([])
  const items = useSelector(getCurrentStore('Clothes'))
  useEffect(() => {
    dispatch(getStoreData('Clothes'))
    setTrending(items)
    setRecentlyViewed(items)
  }, [])

  function renderRecentlyViewed(item, index) {
    return (
      <TouchableOpacity
        style={{ flex: 1, flexDirection: 'row' }}
        onPress={() => {
          setSelectedItem(item)
          setShowAddToBagModal(true)
        }}
      >
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Image
            source={item.img}
            resizeMode="contain"
            style={{
              width: 130,
              height: 100,
            }}
          />
        </View>
        <View
          style={{
            flex: 1.5,
            marginLeft: sizes.radius,
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: colors.gray, ...FONTS.body3 }}>
            {item.name}
          </Text>
          <Text style={{ ...FONTS.h3 }}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <Screen>
      <Container>
        <Title>TRENDING</Title>
        <ListContainer>
          <List
            data={trending}
            horizontal
            showsHorizontal
            ScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => renderTrendingShoes(item, index)}
          />
        </ListContainer>
        <ArticlesContainer>
          <ImageWrapper>
            <IMG resizeMode="contain" source={rcv} />
          </ImageWrapper>
        </ArticlesContainer>
        <View style={{ flex: 1, paddingBottom: sizes.padding }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={recentlyViewed}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => renderRecentlyViewed(item, index)}
          />
        </View>
      </Container>
    </Screen>
  )
}

export default index
