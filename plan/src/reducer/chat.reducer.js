import axios from 'axios';
import { fromJS } from 'immutable';
import { getChatId } from '../Utils';

const CHAT_LIST = 'CHAT_LIST'
const initState = fromJS({
    chatid:'',
    fromuser:'',
    touser:'',
    desc:'',
    chatlist:[]
})

export function chat(state=initState,action){
    switch(action.type){
        case CHAT_LIST:
            return state.merage({
                chatlist:action.payload
            })
        default:
            return state;
    }
}
export function msgListAction(userid){
    return (dispatch,getState)=>{
        console.log('state',getState())
        const chatid = getChatId(userid,getState().toJS ().user._id)
        axios.get(`/chat/chatList.json?chatid=${chatid}`).then(res=>{
            console.log(res)
            if(res.data.success&&res.data.status===200){
                dispatch(ChatList(res.data.data))
            }
        })
    }
}
function ChatList(payload){
    return {
        type:CHAT_LIST,
        payload:fromJS(payload)
    }
}