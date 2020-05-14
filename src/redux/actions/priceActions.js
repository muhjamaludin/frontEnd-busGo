import Config from '../../utils/config'
import axios from 'axios'
import qs from 'querystring'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
  'token'
)}`

export const getPrices = (page, limit, searchKey, searchValue, sortKey, sortValue) => async (dispatch) => {
  try {
    const res = await axios.get(Config.APP_BACKEND.concat(`price?page=${page}&limit=${limit}&search[${searchKey}]=${searchValue}&sort[${sortKey}]=${sortValue}`))
    dispatch({
      type: 'GET_PRICES',
      payload: res.data
    })
  } catch (error) {
    console.log(error)
  }
}

export const getPricesById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(Config.APP_BACKEND.concat(`price/${id}`))
    dispatch({
      type: 'GET_PRICE_BY_ID',
      payload: res.data
    })
  } catch (error) {
    console.log(error)
  }
}

export const addPrice = data => async dispatch => {
  try {
    const res = await axios.post(Config.APP_BACKEND.concat(`price/`), data)
    dispatch({
      type: 'ADD_PRICE',
      payload: res.data
    })
    alert('success add')
  } catch (error) {
    console.log(error)
  }
}

export const editPrice = (id, data) => async dispatch => {
  try {
    const res = await axios.patch(Config.APP_BACKEND.concat(`price/${id}`), data)
    dispatch({
      type: 'EDIT_PRICE',
      payload: res.data
    })
    if (res.data.success) {
      alert('Edit success')
    } else {
      alert('Edit Failed')
    }
  } catch (error) {
    console.log(error)
  }
}

export const deletePrice = (id) => async dispatch => {
  try {
    const res = await axios.delete(Config.APP_BACKEND.concat(`price/${id}`))
    dispatch({
      type: 'DELETE_PRICE',
      payload: res.data
    })
  } catch (error) {
    console.log(error)
  }
}