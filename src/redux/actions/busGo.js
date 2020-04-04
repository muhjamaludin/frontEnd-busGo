import axios from 'axios'
import config from '../../utils/config'

export function getTask(){
    return {
        type: ''
    }
}

export function checkData(payload) {
    const data = axios.get(config.APP_BACKEND.concat('bus'))
    return {
        type: 'CHECK_DATA',
        payload
    }
}

