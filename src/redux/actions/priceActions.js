import Config from '../../utils/config'
import axios from 'axios'
import qs from 'querystring'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
  'token'
)}`

export const getPrices = () => async (dispatch) => {
  try {
    const res = await axios.get(Config.APP_BACKEND.concat('transaction'))
    dispatch({
      type: 'GET_PRICES',
      payload: res.data
    })
  } catch (error) {
    console.log(error)
  }
}
