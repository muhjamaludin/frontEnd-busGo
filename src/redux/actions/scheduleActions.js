import Config from '../../utils/config'
import axios from 'axios'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
  'token'
)}`

export const getSchedules = (page, limit, searchKey, searchValue, sortKey, sortValue) => async (dispatch) => {
  try {
    const res = await axios.get(Config.APP_BACKEND.concat(`schedule/?page=${page}&limit=${limit}&search[${searchKey}]=${searchValue}&sort[${sortKey}]=${sortValue}`))
    dispatch({
      type: 'GET_SCHEDULES',
      payload: res.data,
    })
  } catch (error) {
    console.log(error)
  }
}

export const getScheduleById = (id) => async dispatch => {
  try {
    const res = await axios.get((Config.APP_BACKEND.concat(`schedule/${id}`)))
    dispatch({
      type: 'GET_SCHEDULE_BY_ID',
      payload: res.data
    })
    console.log('get dul', res.data)
  } catch (error) {
    console.log(error)
  }
}

export const editSchedule = (id, data) => async dispatch => {
  try {
    const res = await axios.patch(Config.APP_BACKEND.concat(`schedule/${id}`), data)
    dispatch({
      type: 'EDIT_SCHEDULE',
      payload: res.data
    })
    console.log('ini edit schedule', res)
  } catch (error) {
    console.log(error)
  }
}

export const addSchedules = (data) => async (dispatch) => {
  try {
    const res = await axios.post(Config.APP_BACKEND.concat('schedule/add'), data)
    dispatch({
      type: 'ADD_SCHEDULE',
      payload: res.data
    })
  } catch (error) {
    console.log(error)
  }
}

export const deleteSchedules = id => async dispatch => {
  try {
    const res = await axios.delete(Config.APP_BACKEND.concat(`schedule/${id}`))
    dispatch({
      type: 'DELETE_SCHEDULE',
      payload: res.data
    })
  } catch (error) {
    console.log(error)
  }
}
