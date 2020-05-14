import Config from '../../utils/config'
import axios from 'axios'
import qs from 'querystring'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
  'token'
)}`

export const getAgents = (page, limit, searchKey, searchValue, sortKey, sortValue) => async (dispatch) => {
  console.log('ayew', page, limit, searchKey, searchValue, sortKey, sortValue)
  try {
    const res = await axios.get(Config.APP_BACKEND.concat(`agents/?page=${page}&limit=${limit}&search[${searchKey}]=${searchValue}&sort[${sortKey}]=${sortValue}`))
    dispatch({
      type: 'GET_AGENTS',
      payload: res.data
    })
  } catch (error) {
    console.log(error)
  }
}

export const getAgentById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      Config.APP_BACKEND.concat(`agents/${id}`)
    )
    dispatch({
      type: 'GET_AGENT_BY_ID',
      payload: res.data.data,
    })
  } catch (error) {
    console.log(error)
  }
}

export const editAgent = (id, data) => async (dispatch) => {
  try {
    const res = await axios.patch(
      Config.APP_BACKEND.concat(`agents/${id}`),
      qs.stringify(data)
    )
    console.log('respon', res)
    console.log('id', id)
    if (res) {
      alert('Success edit Agent')
    } else {
      alert('Edit Agent Failed')
    }
    dispatch({
      type: 'EDIT_AGENT',
      payload: res.data.data
    })
  } catch (error) {
    console.log(error)
  }
}

export const addAgent = (username, name) => async (dispatch) => {
  try {
    const res = await axios({
      method: 'post',
      url: Config.APP_BACKEND.concat('agents/add'),
      data: { username: username, name: name },
      headers: { 'Content-Type': 'application/json' },
    })
    if (res.data.msg === 'jwt expired') {
      console.log('Ayewwww')
    }
    dispatch({
      type: 'ADD_AGENT',
      payload: res.data,
    })
    console.log('response post agent', res)
  } catch (error) {
    console.log(error)
  }
}

export const deleteAgent = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      Config.APP_BACKEND.concat(`agents/${id}`)
    )
    dispatch({
      type: 'DELETE_AGENT',
    })
    if (res.data.success) {
      alert('Delete Success')
    } else {
      alert('Edit Failed')
    }
  } catch (error) {
    console.log(error)
  }
}

export const searchData = (name) => async dispatch => {
  try {
    const query = `agents?search[value]=${name}`
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
    const query = `agents?page=${page}`
    const res = await axios.get(Config.APP_BACKEND.concat(query))
    dispatch({
      type: 'MOVE_PAGE',
      payload: {
        pageInfo: res.data.pageInfo,
        data: res.data.data
      }
    })
  } catch (error) {
    console.log(error)
  }
}