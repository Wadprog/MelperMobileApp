import React from 'react'
import { View, StyleSheet, Image, TouchableHighlight } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'

import Text from './AppText'
import Colors from '../config/colors'
import FeedBack from './Feedback'
import Badge from './Badge'
function Lst(props) {
  return (
    <TouchableHighlight onPress={props.onPress}>
      <View
        style={{
          backgroundColor: Colors.white,
          minHeight: 230,
          width: props.width,
          alignItems: 'center',
          borderRadius: 20,
          paddingHorizontal: 5,
          paddingVertical: 6,
          justifyContent: 'space-around',
        }}
      >
        <View style={styles.header}>
          <View>
            {props.discount && (
              <Badge
                background={Colors.paleBlue}
                text={`-${props.discount}%`}
              />
            )}
          </View>
          <FeedBack
            background={Colors.secondary}
            active={props.like}
            activeColor={Colors.secondary}
            IdleColor={Colors.lightGray}
            iconColor={Colors.primary}
            iconName="heart"
            onPress={() => console.log('Like Heart Icon' + props.name)}
          />
        </View>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={{ uri: props.image }} />
        </View>
        <Text style={styles.title}> {props.name}</Text>
        <Text style={styles.price}> ${props.price}</Text>

        {props.rating && (
          <View style={styles.rating}>
            {props.rating.split(',').map((item) => (
              <FontAwesome name="star" size={14} color={Colors.gold} />
            ))}
          </View>
        )}
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  header: {
    //backgroundColor: Colors.white,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    width: 75,
    height: 75,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '90%',
    height: '90%',
    borderRadius: 100,
  },
  rating: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 16,
    marginVertical: 5,
    fontWeight: '600',
  },
  price: {
    color: Colors.primary,
    fontWeight: '700',
    marginBottom: 5,
  },
})
export default Lst
