import config from '../../utils/config'
import axios from 'axios'

export const setLogin = (params) => async dispatch => {
  try {
  const res = await axios.post(config.APP_BACKEND.concat('auth/login'), params)
  if (res.data.success) {
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('roleId', res.data.roleId)
    dispatch({
      type: 'SET_LOGIN',
      payload: res.data
    })
    // this.props.history.push('/dashboard')
  } else {
    console.log('wrong username or passwrod')
    }
  } catch (error) {
  console.log(error)
  }
}

export const setLogout = () => async dispatch => {
  try {
      localStorage.removeItem('token')
      localStorage.removeItem('roleId')
    dispatch({
      type: 'SET_LOGOUT'
    })
  } catch (error) {
    console.log(error)
  }
}

// export const userLoginFetch = (user) => {
//   return dispatch => {
//     return fetch("http://localhost:8080/auth/login", {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       },
//       body: JSON.stringify({ user })
//     })
//       .then(resp => resp.json())
//       .then(data => {
//         if (data.message) {
//           // Here you should have logic to handle invalid login credentials.
//           // This assumes your Rails API will return a JSON object with a key of
//           // 'message' if there is an error
//         } else {
//           localStorage.setItem("token", data.data.token)
//           dispatch(loginUser(data.user))
//         }
//       })
//   }
// }