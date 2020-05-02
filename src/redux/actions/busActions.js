import Config from '../../utils/config'
import axios from 'axios'
import qs from 'querystring'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
  'token'
)}`

export const getBusses = () => async (dispatch) => {
  try {
    const res = await axios.get(Config.APP_BACKEND.concat('bus'))
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

export const editBus = (id, data) => async (dispatch) => {
  try {
    const res = await axios.patch(
      Config.APP_BACKEND.concat(`bus/${id}`),
      qs.stringify(data)
    )
    if (res) {
      alert('Edit Success')
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

export const addBus = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      Config.APP_BACKEND.concat(`bus/add`),
      qs.stringify(data)
    )
    if (res) {
      alert('Add Bus Success')
    } else {
      alert('Add Bus Failed')
    }
    dispatch({
      type: 'ADD_BUS',
      payload: res.data,
    })
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