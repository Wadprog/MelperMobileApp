import React from 'react'
import { StyleSheet, View, Dimensions, Image } from 'react-native'
import Screen from '../components/Screen'
import Feedback from '../components/Feedback'
import Badge from '../components/Badge'
import colors from '../config/colors'
import Text from '../components/AppText'
import Button from '../components/AppButton'
import FilterContainer from '../components/FilterContainer'
import PhotoCarousel from '../components/PhotoCarousel'
const SP = 25,
  WH = Dimensions.get('window').width,
  sizes = [{ name: 'US 25' }, { name: 'US 45' }, { name: 'US 55' }]
import styled from 'styled-components/native'

const Head = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`
const ItemDetail = styled.View`
  background-color: ${colors.lightGray};
  width: 100%;
  flex: 1;
  border-top-left-radius: ${SP * 2}px;
  border-top-right-radius: ${SP * 2}px;
`
const Main = styled.View`
  justify-content: center;
  align-items: center;
`
const Wrapper = styled.View``
const MainWrapper = styled.View`
  padding: ${SP}px;
`
const PriceShow = styled.View`
  border-top-left-radius: ${SP * 2}px;
  border-top-right-radius: ${SP * 2}px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 22px;
  margin-bottom: 22px;
  align-items: center;
  position:absolute;
  bottom:0
`
const BuyButton = styled.View``
const PriceText = styled.Text`
  font-size: 23px;
  font-weight: bold;
  position: relative;
  & Symbol {
    position: absolute;
    top: -150px;
    margin: 0 12px;
  }
`
const Symbol = styled.Text`
  font-size: 14px;
  position: absolute;
  top: 28px;
  font-weight: bold;
  margin: 0 12px;
`

function StoreItemDetailsScreen({ route }) {
  const icon = { name: 'cart', color: colors.paleBlue }
  return (
    <Screen style={styles.screen}>
      <MainWrapper>
        <Head>
          <Feedback
            iconName="heart"
            activeColor={colors.white}
            IdleColor={colors.primary}
            iconColor={colors.white}
          />
        </Head>
        <Main>
          {route.params.item.discount && (
            <Badge
              style={styles.badge}
              text={route.params.item.discount + '%'}
              background={colors.paleBlue}
            />
          )}
          <PhotoCarousel photos={[route.params.item.image]} />
        </Main>
      </MainWrapper>
      <ItemDetail>
        <Text>{route.params.item.name}</Text>
        <Text>{route.params.item.description}</Text>
        <PriceShow>
          <Symbol>$</Symbol>
          <PriceText>{route.params.item.price.toFixed(2)}</PriceText>
          <Button
            icon={icon}
            title="Add To cart"
            style={{
              width: 110,
              paddingHorizontal: 2,
              paddingVertical: 10,
            }}
          />
        </PriceShow>
      </ItemDetail>
    </Screen>
  )
}
const styles = StyleSheet.create({
  badge: { width: 50, height: 30 },
  screen: {
    backgroundColor: colors.primary,
    flex: 1,
  },
})
export default StoreItemDetailsScreen
{
  /* <View style={styles.imageWrapper}>
            <View style={styles.innerImageWrapper}>
              <View style={styles.imagePlacer}>
                <View style={styles.innerImagePlacer}>
                  <Image
                    style={styles.image}
                    source={route.params.item.image}
                  />
                </View>
              </View>
            </View>
          </View> */
}
