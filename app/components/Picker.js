import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
} from 'react-native'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'

//Custom dependencies for
import defaultStyles from '../config/styles'
import colors from '../config/colors'
import Text from './AppText'
import Button from './AppButton'
import Screen from './Screen'
import PickerItem from './PickerItem'
function Picker({ icon, items, onSelectItem, placeholder, selectedItem }) {
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.wrapper}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={colors.medium}
              style={styles.icon}
            />
          )}
          <Text style={styles.text}>
            {selectedItem ? selectedItem?.label : placeholder}
          </Text>
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <FontAwesome
              name="times"
              size={15}
              color={colors.medium}
              style={styles.close}
            />
          </TouchableWithoutFeedback>

          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <PickerItem
                label={item.label}
                onPress={() => {
                  setModalVisible(false)
                  onSelectItem(item)
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: defaultStyles.colors.lightGray,
    borderRadius: 25,
    flexDirection: 'row',
    maxWidth: '100%',
    padding: 3,
    marginVertical: 10,
    width: 120,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
  close: { marginLeft: 5 },
})

export default Picker
