import Config from '../../utils/config'
import axios from 'axios'
import qs from 'querystring'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
    'token'
)}`

export const getReserve = () => async (dispatch) => {
    try {
        const res = await axios.get(Config.APP_BACKEND.concat(`reserve/`))
        dispatch({
            type: 'GET_RESERVATIONS',
            payload: res.data
        })
        console.log('ini reserve', res)
    } catch (error) {
        console.log(error)
    }
}

export const addReserve = (data) => async dispatch => {
    try {
        const res = await axios.post(Config.APP_BACKEND.concat('reserve/add'), data)
        dispatch({
            type: 'ADD_RESERVATION',
            payload: res.data
        })
        console.log('add', res)
    } catch (error) {
        console.log(error)
    }
}

export const addBoard = (data) => async dispatch => {
    try {
        const res = await axios.post(Config.APP_BACKEND.concat('reserve/board/'), data)
        dispatch({
            type: 'ADD_BOARD',
            payload: res.data
        })
        console.log('add board', res)
    } catch (error) {
        console.log(error)
    }
}