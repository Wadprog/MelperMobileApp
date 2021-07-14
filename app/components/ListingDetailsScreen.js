import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import color from '../config/colors'
function ListingDetailsScreen({ image, title, price }) {
  return (
    <View>
      <Image source={image} />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}> {title}</AppText>
        <AppText style={styles.price}>$ {price}</AppText>
        <Id image="" />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: '300',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  price: {
    color: color.secondary,
    marginVertical: 10,
  },
})
export default ListingDetailsScreen
