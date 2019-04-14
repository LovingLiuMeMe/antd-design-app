import axios from 'axios';
import { fromJS } from 'immutable';
import { getChatId } from '../Utils';
import io from 'socket.io-client';
const socket = io('ws://127.0.0.1:9090')

const CHAT_LIST = 'CHAT_LIST'
const RECV_MSG = 'RECV_MSG'
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
            return state.merge({
                chatlist:action.payload
            })
        case RECV_MSG:
            return state.merge({
                chatlist:state.get('chatlist').push(action.payload)
            })
        default:
            return state;
    }
}
export function msgListByChatIdAction(chatid){
    console.log('cahtid',chatid)
    return (dispatch)=>{
        axios.get(`/chat/chatListByChatId.json?chatid=${chatid}`).then(res=>{
            if(res.data.success&&res.data.code===200){
                dispatch(ChatList(res.data.data))
            }
        })
    }
}
export function listenRecvMsgAction(chatid){
    return (dispatch)=>{
        socket.on('recvMsg',function(data){
            if(JSON.parse(data).chatid===chatid){
                dispatch(RecvMsg(data))
            }     
        })
    }
}
export function sendMsgAction(data){
    return (dispatch)=>{
        socket.emit('sendMsg',data)
    }
}
export function readChatsAction(chatid,to){
    console.log('read chat',chatid,to)
    return (dispatch)=>{
        const data = {
            chatid,
            to
        }
        axios.post('/chat/readChats.json',data).then(res=>{
            if(res.data.success&&res.data.code===200){
                 console.log('消息读取成功')
            }
        })
    }
}
export function getAllChatAction(userid){
    return dispatch =>{
        axios.get('/chat/getAllChat.json?userid='+userid).then(res=>{
            if(res.data.success&&res.data.code===200){
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
function RecvMsg(payload){
    return {
        type:RECV_MSG,
        payload:JSON.parse(payload)
    }
}
