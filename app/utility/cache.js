import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'

const storeData = async (key, value) => {
  try {
    const item = {
      value,
      timestamp: Date.now(),
    }
    await AsyncStorage.setItem(key, JSON.stringify(item))
  } catch (e) {
    console.log('Error saving data' + e)
  }
}

const isExpired = (item) => {
  const now = moment(Date.now())
  const storedTime = moment(item.timestamp)
  return now.diff(storedTime, 'minutes') > 5
}
const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (!value) return null
    const item = JSON.parse(value)
    if (isExpired(item)) {
      await AsyncStorage.removeItem(key)
      return null
    }
    return item.value
  } catch (e) {
    console.log('Error getting data ' + e)
  }
}
export default {
  storeData,
  getData,
}
