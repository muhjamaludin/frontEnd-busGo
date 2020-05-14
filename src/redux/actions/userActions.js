import Config from '../../utils/config'
import axios from 'axios'
import history from '../../utils/history'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
    'token'
)}`

export const getUsers = (page, limit, searchKey, searchValue, sortKey, sortValue) => async (dispatch) => {
    try {
        const res = await axios.get(Config.APP_BACKEND.concat(`users/?page=${page}&limit=${limit}&search[${searchKey}]=${searchValue}&sort[${sortKey}]=${sortValue}`))
        dispatch({
            type: 'GET_USERS',
            payload: res.data,
        })
        console.log('user respon', res.data)
    } catch (error) {
        console.log(error)
    }
}

export const getUsersById = (id) => async dispatch => {
    try {
        const res = await axios.get(Config.APP_BACKEND.concat(`users/${id}`))
        dispatch({
            type: 'GET_USER_BY_ID',
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const uploadPhoto = (id, photo) => async dispatch => {
    try {
        const res = await axios.patch(Config.APP_BACKEND.concat(`users/userdetail/picture/${id}`), photo)
        dispatch({
            type: 'UPLOAD_PHOTO',
            payload: res.data
        })
    }catch (error) {
        console.log(error)
    }
}

export const editUser = (id, data) => async dispatch => {
    try {
        const res = await axios.patch(Config.APP_BACKEND.concat(`users/userdetail/${id}`), data)
        dispatch({
            type: 'EDIT_USER',
            payload: res.data
        })
        if (res.data.success) {
            console.log('edit success')
        } else {
            alert('Failed Edited')
        }
    } catch (error) {
        console.log(error)
    }
}

export const editRole = (Role) => async dispatch => {
    try {
        const res = await axios.post(Config.APP_BACKEND.concat(`users/role`), Role)
        dispatch({
            type: 'EDIT_ROLE',
            payload: res.data
        })
        
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = (id) => async dispatch => {
    try {
        const res = await axios.patch(Config.APP_BACKEND.concat(`users/${id}`))
        dispatch({
            type: 'DELETE_USER',
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}
