import { combineReducers } from 'redux'
import agentReducer from './agentReducer'
import { busReducer } from './busReducer'
import { scheduleReducer } from './scheduleReducer'
import { routeReducer } from './routeReducer'
import { priceReducer } from './priceReducer'
import { userReducer } from './userReducer'

const rootReducer = combineReducers({
  agents: agentReducer,
  bus: busReducer,
  schedule: scheduleReducer,
  route: routeReducer,
  price: priceReducer,
  user: userReducer
})

export default rootReducer
