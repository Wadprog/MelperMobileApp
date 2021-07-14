import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
// Customs imports
import AppInput from '../components/AppInput'
import ListContainer from '../components/ListContainer'
import Screen from '../components/Screen'
import Cats from '../Seed/categories'
import Members from '../Seed/members'
import colors from '../config/colors'

//Main Function to Return 
function MainList({ navigation }) {
  return (
    <Screen >
      <View style={styles.wrapper}>
        {/* Users */}
        {/* <View style={styles.header}>
          <FontAwesome name="list" size={35} />
          <AppInput icon="search"style={styles.input} />

          <FontAwesome name="plus" size={35} />
        </View>
        <ListContainer
          style={styles.userList}
          items={Members.map((member) => ({
            ...member,
            name: member.fullName,
          }))}
        /> */}
        {/* Categories */}
        <View style={styles.fluid}>

          {Cats.map((CategoryBlock) => (
            <ListContainer items={CategoryBlock} />
          ))}
          
        </View>
        
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  screen:{ backgroundColor:colors.lightGray}, 

  fluid: {
    paddingHorizontal: 5,
    flex: 0,
  },
  userList: {
    paddingVertical: 5,
  },
  wrapper: {
    flex: 0,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  input: {
    width: '70%',
  
    
  
  },
})
export default MainList
