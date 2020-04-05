import Config from '../../utils/config'
import axios from 'axios'
import qs from 'querystring'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
    'token'
)}`

export const getReserve = () => async (dispatch) => {
    try {
        const res = await axios.get(Config.APP_BACKEND.concat('reserve'))
        dispatch({
            type: 'GET_RESERVATIONS',
            payload: res.data.data
        })
    } catch (error) {
        console.log(error)
    }
}