import { combineReducers } from 'redux'
import agentReducer from './agentReducer'
import busReducer from './busReducer'
import scheduleReducer from './scheduleReducer'
import routeReducer from './routeReducer'
import priceReducer from './priceReducer'
import userReducer from './userReducer'
import reserveReducer from './reserveReducer'
import boardReducer from './BoardReducer'
import authReducer from './AuthReducer'

const rootReducer = combineReducers({
  agents: agentReducer,
  bus: busReducer,
  schedule: scheduleReducer,
  route: routeReducer,
  price: priceReducer,
  user: userReducer,
  reserve: reserveReducer,
  board: boardReducer,
  auth: authReducer
})

export default rootReducer
