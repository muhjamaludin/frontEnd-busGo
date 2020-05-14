import Config from '../../utils/config'
import axios from 'axios'
import qs from 'querystring'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
  'token'
)}`

export const getBusses = (page, limit, searchKey, searchValue, sortKey, sortValue) => async (dispatch) => {
  try {
    const res = await axios.get(Config.APP_BACKEND.concat(`bus/?page=${page}&limit=${limit}&search[${searchKey}]=${searchValue}&sort[${sortKey}]=${sortValue}`))
    dispatch({
      type: 'GET_BUSES',
      payload: {
        data: res.data.data,
        pageInfo: res.data.pageInfo
      }
    })
  } catch (error) {
    console.log(error)
  }
}

export const getBus = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      Config.APP_BACKEND.concat(`bus/${id}`)
    )
    dispatch({
      type: 'GET_BUS_BY_ID',
      payload: res.data.data
    })
  } catch (error) {
    console.log(error)
  }
}

export const editBus = (id, bodyFormData) => async (dispatch) => {
  try {
    const res = await axios.patch(Config.APP_BACKEND.concat(`bus/${id}`), bodyFormData)
    if (res) {
      alert('Edit Success')
      this.props.history.push('/bus')
    } else {
      alert('Edit Failed')
    }
    dispatch({
      type: 'EDIT_BUS',
      payload: res.data,
    })
  } catch (error) {
    console.log(error)
  }
}

export const addBus = (bodyFormData) => async (dispatch) => {
  try {
    console.log('body', bodyFormData)
    const res = await axios.post(Config.APP_BACKEND.concat('bus/add'), bodyFormData)
    console.log('add Bus Jalan', res)
    dispatch({
      type: 'ADD_BUS',
      payload: res.data
    })
    if (res) {
      alert('Add Bus Success')
    } else {
      alert('Add Bus Failed')
    }
  } catch (error) {
    console.log(error)
  }
}

export const deleteBus = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      Config.APP_BACKEND.concat(`bus/${id}`)
    )
    dispatch({
      type: 'DELETE_BUS',
      payload: res.data,
    })
  } catch (error) {
    console.log(error)
  }
}

export const searchData = (name) => async dispatch => {
  try {
    const query = `busses?search[value]=${name}`
    const res = await axios.get(Config.APP_BACKEND.concat(query))
    dispatch({
      type: 'SEARCH_DATA',
      payload: res.data.data
    })
  } catch (error) {
    console.log(error)
  }
}

export const movePage = (page) => async dispatch => {
  try {
    const query = `busses?page=${page}`
    const res = await axios.get(Config.APP_BACKEND.concat(query))
    dispatch({
      type: 'MOVE_PAGE',
      payload: {
        pageInfo: res.data.pageInfo,
        data: res.data.data
      }
    })
  } catch(error) {
    console.log(error)
  }
}