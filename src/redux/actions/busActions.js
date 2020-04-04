import Config from '../../utils/config'
import axios from 'axios'
import qs from 'querystring'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
  'token'
)}`

export const getBuses = () => async (dispatch) => {
  try {
    const res = await axios.get(Config.APP_BACKEND.concat('bus'))
    dispatch({
      type: 'GET_BUSES',
      payload: res.data,
    })
  } catch (error) {
    console.log(error)
  }
}

export const getBus = () => async (dispatch) => {
  try {
    const res = await axios.get(
      Config.APP_BACKEND.concat(`bus/${this.props.match.params.id}`)
    )
    dispatch({
      type: 'GET_BUS',
      payload: res,
    })
  } catch (error) {
    console.log(error)
  }
}

export const editBus = () => async (dispatch) => {
  try {
    const res = await axios.patch(
      Config.APP_BACKEND.concat(`bus/${this.props.match.params.id}`),
      qs.stringify(this.state.data)
    )
    dispatch({
      type: 'EDIT_BUS',
      payload: res.data,
    })
  } catch (error) {
    console.log(error)
  }
}

export const addAgent = () => async (dispatch) => {
  try {
    const res = await axios.post(
      Config.APP_BACKEND.concat(`bus/add`),
      qs.stringify(this.state.data)
    )
    dispatch({
      type: 'ADD_BUS',
      payload: res.data,
    })
  } catch (error) {
    console.log(error)
  }
}

export const deleteAgent = () => async (dispatch) => {
  try {
    const res = await axios.delete(
      Config.APP_BACKEND.concat(`bus/${this.props.match.params.id}`)
    )
    dispatch({
      type: 'DELETE_BUS',
      payload: res.data,
    })
  } catch (error) {
    console.log(error)
  }
}
