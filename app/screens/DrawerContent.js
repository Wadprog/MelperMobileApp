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

// Customs imports
import Screen from '../components/Screen'
import { getCurrentUser, logout } from '../store/auth'

// Main Function to Return
const DrawerContent = (props) => {
  //Hooks
  const auth = useSelector(getCurrentUser)
  const dispatch = useDispatch()
  const paperTheme = useTheme()
  // Main Object
  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <Avatar.Image
                  source={{
                    uri: auth.user.profileImage,
                  }}
                  size={50}
                />
                <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                  <Title style={styles.title}>{auth.user.firstname}</Title>
                  <Caption style={styles.caption}>{auth.user.username}</Caption>
                </View>
              </View>

              {/*
               <View style={styles.row}>
                <View style={styles.section}>
                  <Paragraph style={[styles.paragraph, styles.caption]}>
                    80
                  </Paragraph>
                  <Caption
                    style={styles.caption}
                    onPress={() => {
                      console.log('under=contruction')
                    }}
                  >
                    Family Members
                  </Caption>
                </View>
                <View style={styles.section}>
                  <Paragraph style={[styles.paragraph, styles.caption]}>
                    100
                  </Paragraph>
                  <Caption style={styles.caption}>Orders</Caption>
                </View>
              </View>
                  */}
            </View>

            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="home-outline" color={color} size={size} />
                )}
                label="Home"
                onPress={() => {
                  props.navigation.navigate('Home')
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
                  props.navigation.navigate('SupportScreen')
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
              <TouchableRipple
                onPress={() => {
                  console.log('undercontruction')
                }}
              >
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
            onPress={() => {
              console.log('Calling suporrt ...')
            }}
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
      </View>
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
