import Config from '../../utils/config'
import axios from 'axios'
import qs from 'querystring'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
  'token'
)}`

export const getAgents = () => async (dispatch) => {
  try {
    const res = await axios.get(Config.APP_BACKEND.concat('agents'))
    dispatch({
      type: 'GET_AGENTS',
      payload: res.data,
    })
  } catch (error) {
    console.log(error)
  }
}

export const getAgent = () => async (dispatch) => {
  try {
    const res = await axios.get(
      Config.APP_BACKEND.concat(`agents/${this.props.match.params.id}`)
    )
    dispatch({
      type: 'GET_AGENT',
      payload: res,
    })
  } catch (error) {
    console.log(error)
  }
}

export const editAgent = () => async (dispatch) => {
  try {
    const res = await axios.patch(
      Config.APP_BACKEND.concat(`agents/${this.props.match.params.id}`),
      qs.stringify(this.state.data)
    )
    dispatch({
      type: 'EDIT_AGENT',
      payload: res.data,
    })
  } catch (error) {
    console.log(error)
  }
}

export const addAgent = () => async (dispatch) => {
  try {
    const res = await axios.post(
      Config.APP_BACKEND.concat(`agents/add`),
      qs.stringify(this.state.data)
    )
    dispatch({
      type: 'ADD_AGENT',
      payload: res.data,
    })
  } catch (error) {
    console.log(error)
  }
}

export const deleteAgent = () => async (dispatch) => {
  try {
    const res = await axios.delete(
      Config.APP_BACKEND.concat(`agents/${this.props.match.params.id}`)
    )
    dispatch({
      type: 'DELETE_AGENT',
      payload: res.data,
    })
  } catch (error) {
    console.log(error)
  }
}
