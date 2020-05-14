import Config from '../../utils/config'
import axios from 'axios'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
    'token'
)}`

export const getBoard = (page, limit, searchKey, searchValue, sortKey, sortValue) => async (dispatch) => {
    try {
        console.log('pepes', page, limit, searchKey, searchValue, sortKey, sortValue)
        const res = await axios.get(Config.APP_BACKEND.concat(`reserve/board/?page=${page}&limit=${limit}&search[${searchKey}]=${searchValue}&sort[${sortKey}]=${sortValue}`))
        dispatch({
            type: 'GET_BOARD',
            payload: res.data
        })
        console.log('response board', res.data)
    } catch (error) {
        console.log(error)
    }
}

export const getBoardById = (id) => async dispatch => {
    try {
        const res = await axios.get(Config.APP_BACKEND.concat(`reserve/board/${id}`))
        dispatch({
            type: 'GET_BOARD_BY_ID',
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const editBoard = (id, data) => async dispatch => {
    try {
        const res = await axios.patch(Config.APP_BACKEND.concat(`reserve/board/${id}`), data)
        dispatch({
            type: 'EDIT_BOARD',
            payload: res.data
        })
        alert('success')
    } catch (error) {
        console.log(error)
    }
}

export const addBoard = (data) => async dispatch => {
    try {
        alert('coc')
        const res = await axios.post(Config.APP_BACKEND.concat(`reserve/board/`), data)
        dispatch({
            type: 'ADD_BOARD',
            payload: res.data
        })
        alert('success Add')
    } catch (error) {
        console.log(error)
    }
}

export const deleteBoard = (id) => async dispatch => {
    try {
        await axios.delete(Config.APP_BACKEND.concat(`reserve/board/${id}`))
        dispatch({
            type: 'DELETE_BOARD',
        })
    } catch (error) {
        console.log(error)
    }
}
