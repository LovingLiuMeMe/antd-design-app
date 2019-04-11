import React,{PureComponent} from 'react';
import { connect } from 'react-redux';
import { msgListAction } from '../reducer/chat.reducer';
import axios from 'axios';

class Chat extends PureComponent{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        const userid = this.props.match.params.userid
        this.props.msgList(userid)
    }
    render(){
        return(
            <div>ChatUser</div>
        )
    }

}
const mapDispatchToProps = (dispatch,getState)=>{
    return {
        msgList:(userid)=>{
            dispatch(msgListAction(userid))
        }
    }
}
export default connect(null,mapDispatchToProps)(Chat);
 // import axios from 'axios'
// import io from 'socket.io-client'
// ​
// const socket = io('ws://localhost:9093')// 页面一加载就建立连接
// // 标识已读
// const MSG_READ = 'MSG_READ'
// const MSG_LIST = 'MSG_LIST'
// const MSG_RECV = 'MSG_RECV'
// const initState = { 
//    chatmsg:[],
//    unread:0,
//    users:{}
// }
// export function chat(state=initState,action){
//    switch(action.type){
//        case MSG_LIST:
//            return {...state,chatmsg:action.msgs,unread:action.msgs.filter(v=>!v.read&&v.to===action.filterid).length,users:action.users}
//        case MSG_RECV:
//            const unread = action.filterid===action.msg.to?state.unread+1:state.unread
//            return {...state,chatmsg:[...state.chatmsg,action.msg],unread}
//        // case MSG_RECV:
//        // case MSG_READ:
//        default:
//        return state;
//   }
// }
// function msgList(data,filterid){
//    return {
//        type: MSG_LIST,
//        msgs:data.msgs,
//        users:data.users,
//        filterid
//   }
// }
// function msgRecv(data,filterid){
//    return {
//        type: MSG_RECV,
//        msg: data,
//        filterid
//   }
// }
// export function getMegList(){
//    return (dispatch,getState)=>{
//        axios.get('/user/getMsgList.json')
//       .then(res=>{
//            if(res.status===200&&res.data.code===0){
//                dispatch(msgList(res.data,getState().user._id))
//           }
//       })
//   }
// }
// export function recvMsg(){
//    return (dispatch,getState)=>{
//        socket.on('recvMsg',function(data){
//            dispatch(msgRecv(data,getState().user._id))
//       })
//   }
// }
// export function sendMsg(from,to,msg){
//    return dispatch=>{
//        socket.emit('sendMsg',{from,to,msg})
//   }
// }
