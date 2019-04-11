import { combineReducers } from 'redux-immutable'
import { user } from './reducer/user.redux'
import { plan } from './reducer/plan.reducer'
import { chat } from './reducer/chat.reducer'

const rootReducer = combineReducers({
    user,
    plan,
    chat
})

export default rootReducer