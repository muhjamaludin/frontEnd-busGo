import Config from '../../utils/config'
import axios from 'axios'
import qs from 'querystring'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
    'token'
)}`

export const getReserve = (page, limit, searchKey, searchValue, sortKey, sortValue) => async (dispatch) => {
    try {
        console.log('melody', page, limit, searchKey, searchValue, sortKey, sortValue)
        const res = await axios.get(Config.APP_BACKEND.concat(`reserve/?page=${page}&limit=${limit}&search[${searchKey}]=${searchValue}&sort[${sortKey}]=${sortValue}`))
        dispatch({
            type: 'GET_RESERVATIONS',
            payload: res.data
        })
        console.log('ini reserve', res)
    } catch (error) {
        console.log(error)
    }
}

export const getReserveById = (id) => async dispatch => {
    try {
        const res = await axios.get(Config.APP_BACKEND.concat(`reserve/${id}`))
        dispatch({
            type: 'GET_RESERVATION_BY_ID',
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const addReserve = (id, data) => async dispatch => {
    try {
        console.log('add reserve', id, data)
        const res = await axios.post(Config.APP_BACKEND.concat(`reserve/add/${id}`), data)
        dispatch({
            type: 'ADD_RESERVATION',
            payload: res.data
        })
        alert('Success Add Reservation')
    } catch (error) {
        console.log(error)
    }
}

export const editReserve = (id, data) => async dispatch => {
    try {
        const res = await axios.patch(Config.APP_BACKEND.concat(`reserve/${id}`), data)
        dispatch({
            type: 'EDIT_RESERVATION',
            payload: res.data
        })
        alert('success edit reservation')
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

export const deleteReservation = id => async dispatch => {
    try {
        const res = await axios.delete(Config.APP_BACKEND.concat(`reserve/${id}`))
        dispatch({
            type: 'DELETE_BOARD',
            payload: res.data
        })
        alert('delete success')
    } catch (error) {
        console.log(error)
    }
}

export const getSeatReservation = (id) => async dispatch => {
    try {
        const res = await axios.get(Config.APP_BACKEND.concat(`reserve/seat/${id}`))
        dispatch({
            type: 'GET_SEAT',
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}