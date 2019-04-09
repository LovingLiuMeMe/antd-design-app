import { combineReducers } from 'redux-immutable'
import { user } from './reducer/user.redux'
import { plan } from './reducer/plan.reducer'

const rootReducer = combineReducers({
    user,
    plan
})

export default rootReducer