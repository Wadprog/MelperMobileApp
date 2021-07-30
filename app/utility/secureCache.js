import * as SecureStore from 'expo-secure-store'

const set = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, value)
  } catch (err) {
    console.log('Error storing' + err.message)
  }
}

const get = async (key) => {
  try {
    return await SecureStore.getItemAsync(key)
  } catch (err) {
    console.log('Error Logging Data' + err.message)
  }
}

const remove = async (key) => {
  try {
    return await SecureStore.deleteItemAsync(key)
  } catch (err) {
    console.log('Error deleting Data' + err.message)
  }
}

export default { get, set, remove }
