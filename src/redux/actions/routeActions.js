import Config from '../../utils/config'
import axios from 'axios'
import qs from 'querystring'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
  'token'
)}`

export const getRoutes = () => async (dispatch) => {
  try {
    const res = await axios.get(Config.APP_BACKEND.concat('route'))
    dispatch({
      type: 'GET_ROUTES',
      payload: res.data
    })
  } catch (error) {
    console.log(error)
  }
}
