import axios from 'axios'

export const getAgents = () => {
    console.log(localStorage.getItem('token'))
    return {
        type: 'GET_AGENTS',
        payload: axios({
            method: 'GET',
            url: config.APP_BACKEND.concat('agents'),
            headers: {
                authorization: localStorage.getItem('token')
            } 
        })
    }
}