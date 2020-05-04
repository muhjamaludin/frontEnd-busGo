import Config from '../../utils/config'
import axios from 'axios'
import qs from 'querystring'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
    'token'
)}`

export const getBoard = () => async (dispatch) => {
    try {
        const res = await axios.get(Config.APP_BACKEND.concat('reserve/board'))
        dispatch({
            type: 'GET_BOARD',
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}
