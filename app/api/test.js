import api from './index'
import axios from 'axios'
async function get(url) {
  const r = await api.get(url)
  return r.data
}
export default get
