import Config from '../../utils/config'
import axios from 'axios'
import history from '../../utils/history'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
    'token'
)}`

export const getUsers = () => async (dispatch) => {
    try {
        const res = await axios.get(Config.APP_BACKEND.concat('users'))
        dispatch({
            type: 'GET_USERS',
            payload: res.data,
        })
        console.log('user respon', res.data)
    } catch (error) {
        console.log(error)
    }
}
