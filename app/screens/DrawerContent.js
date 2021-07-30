// Dependencies
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { StyleSheet, View } from 'react-native'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
 
} from 'react-native-paper'
import Screen from '../components/Screen'
// Customs imports
// import Screen from '../components/Screen'
import { getCurrentUser, logout } from '../store/auth'
import routes from '../navigation/routes'
// Main Function to Return
const DrawerContent = (props) => {
  //Hooks
  const auth = useSelector(getCurrentUser)
  const dispatch = useDispatch()
  const paperTheme = useTheme()

  // Main Object
  return (
    <Screen loading={auth.user.user.loading} error={auth.user.error}>
      <DrawerContentScrollView {...props}>
       
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: auth.user.user.profileImage,
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={styles.title}>{auth.user.user.firstName}</Title>
                <Caption style={styles.caption}>{auth.user.user.username}</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate(routes.MARKET)
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('Profile')
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="heart-outline" color={color} size={size} />
              )}
              label="Likes"
              onPress={() => {
                props.navigation.navigate('BookmarkScreen')
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="cart" color={color} size={size} />
              )}
              label="Cart"
              onPress={() => {
                props.navigation.navigate(routes.CART)
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="cog-outline" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate('SettingsScreen')
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="phone" color={color} size={size} />
          )}
          label="Support"
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            dispatch(logout())
          }}
        />
      </Drawer.Section>
    </Screen>
  )
}
// Styles
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
})

export default DrawerContent
