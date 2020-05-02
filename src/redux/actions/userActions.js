import Config from '../../utils/config'
import axios from 'axios'
import history from '../../utils/history'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
    'token'
)}`

export const getUsers = () => async (dispatch) => {
    try {
        const res = await axios.get(Config.APP_BACKEND.concat('users'))
        if (res.data.msg === 'jwt expired') {
            const logout = () => {
                localStorage.removeItem('token')
                this.props.check()
                history.push('/login')
              }
            logout()
        } else {
            dispatch({
                type: 'GET_USERS',
                payload: res.data,
            })
        }
    } catch (error) {
        console.log(error)
    }
}
