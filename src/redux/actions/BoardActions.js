import Config from '../../utils/config'
import axios from 'axios'
import qs from 'querystring'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
    'token'
)}`

export const getBoard = (searchkey, searchValue, sortKey, sortValue) => async (dispatch) => {
    console.log('meow', searchkey, searchValue)
    try {
        const res = await axios.get(Config.APP_BACKEND.concat(`reserve/board/?search[${searchkey}]=${searchValue}`))
        dispatch({
            type: 'GET_BOARD',
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}
