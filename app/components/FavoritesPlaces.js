import React from 'react'
import { TouchableOpacity, FlatList, View } from 'react-native'
import { Avatar, Caption, Divider } from 'react-native-paper'
import colors from '../config/colors'
import sizes from '../config/size'
import Text from './AppText'
const data = [
  {
    id: '123',
    icon: 'home',
    location: 'Home',
    destination: 'Code street, London, UK',
  },

  {
    id: '456',
    icon: 'briefcase',
    location: 'Work',
    destination: 'London Eye, London, UK',
  },
]
const FavoritesPlaces = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <Divider inset/>}
      renderItem={({ item: { location, destination, icon } }) => (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'between',
            paddingHorizontal: 15,
            marginVertical: 15,
          }}
        >
          <Avatar.Icon
            size={40}
            icon={icon}
            style={{
              backgroundColor: colors.lightGray1,
            }}
          />
          <View style={{ marginLeft: sizes.base }}>
            <Text style={{ fontWeight: 'bold' }}>{location}</Text>
            <Caption>{destination}</Caption>
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

export default FavoritesPlaces
