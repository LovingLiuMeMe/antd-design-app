import { fromJS } from 'immutable'
import axios from 'axios'

const LOAD_DATA = 'LOAD_DATA'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const ERROR = 'ERROR'
const CLEAR_REDIRECT = 'CLEAR_REDIRECT'
const GET_ALL_USER = 'GET_ALL_USER'

// 编写redux
const initState = fromJS({
    id:'',
    qq:'',
    type:'',
    realname:'',// 真实姓名
    email:'',// email
    avator:'',// 头像
    msg:'',// 登录消息
    redirectTo:'',
    companyname:'',
    desc:'',
    userlist:[]
})

export function user(state=initState,action){
    switch(action.type){
        case LOAD_DATA:
            return state.merge({
                id: action.payload.get('_id'),
                qq: action.payload.get('qq'),
                realname: action.payload.get('realname'),
                email: action.payload.get('email'),
                type: action.payload.get('type'),
                avator: action.payload.get('avator'),
                msg: action.payload.get('msg'),
                redirectTo: action.payload.get('redirectTo'),
                companyname: action.payload.get('companyname'),
                desc:action.payload.get('desc')
            })
        case ERROR:
            return state.merge({
                msg: action.payload.get('msg'), 
                redirectTo: action.payload.get('redirectTo')
            })
        case CLEAR_REDIRECT:
            return state.merge({
                redirectTo:''
            })
        case LOGIN_SUCCESS:
            return state.merge({
                id: action.payload.get('_id'),
                qq: action.payload.get('qq'),
                realname: action.payload.get('realname'),
                email: action.payload.get('email'),
                type: action.payload.get('type'),
                avator: action.payload.get('avator'),
                msg: action.payload.get('msg'),
                redirectTo: action.payload.get('redirectTo'),
                companyname: action.payload.get('companyname'),
                desc:action.payload.get('desc')
            });
        case GET_ALL_USER:
            return state.set('userlist',action.payload)
        default:
            return state            
    }
}
const LoadDate = function(payload){
    console.log('payload',payload)
    return {
        type: LOAD_DATA,
        payload:fromJS(payload)
    }
}
const LoginSuccess = function(payload){
    return {
        type: LOGIN_SUCCESS,
        payload:fromJS(payload)
    }
}
const ErrorMsg = function(payload){
    return {
        type: ERROR,
        payload:fromJS(payload)
    }
}
export function LoadLoginUserInfo(data){
    return dispatch => {
        dispatch (LoadDate(data))
    }
}
function qryAllUserByCompanyId(data){
    return{
        type: GET_ALL_USER,
        payload:fromJS(data)
    }
}
export function getClearRedirectUrlAction(){
    return {
        type:CLEAR_REDIRECT
    }
}
export function registerAction({avator,realname,email,pwd,rpwd,qq,companyname,desc}){
    if(avator&&realname&&email&&pwd&&rpwd&&qq&&companyname&&desc){
        console.log(realname)
        if(pwd!==rpwd){
            const payload = {
                msg:'两次输入密码不一致',
                redirectTo:''
            }
            return ErrorMsg(payload)
        }else{
            return dispatch=>{
                const data = {
                    avator,
                    realname,
                    email,
                    pwd,
                    rpwd,
                    qq,
                    companyname,
                    desc 
                }
                axios.post('/user/register.json',data).then(res=>{
                    if(res.data.success&&res.data.code===200){
                        res.data.data.msg=''
                        res.data.data.redirectTo='/login'
                        dispatch(LoadDate(res.data.data))
                    }
                    else{
                        const data={
                            msg: res.data.msg,
                            redirectTo:''
                        }
                        dispatch(ErrorMsg(data))
                    }
                })
            }
        }
    }else{
        const payload = {
            msg:'信息尚未完善，请继续完善信息',
            redirectTo:''
        }
        return ErrorMsg(payload)
    }
}
export function getLoginAction(data){
    return dispatch =>{
        axios.post('/user/qryUserInfo.json',data).then(res=>{
            console.log(res.data)
            if(res.data.success&&res.data.code===200){
                res.data.data.redirectTo = '/planlist'
                dispatch(LoginSuccess(res.data.data))
            }else{
                const data = {
                    msg:res.data.msg,
                    redirectTo:'/register'
                }
                dispatch(ErrorMsg(data))
            }
        })  
    }
}
export function qryAllUserListByCompanyIdAction(companyname){
    console.log(companyname)
    return dispatch=>{
        axios.get('/user/qryAllUserListByCompanyId.json?companyname='+companyname).then(res=>{
            if(res.data.success&&res.data.code===200){
                const action = qryAllUserByCompanyId(res.data.data)
                dispatch(action)
            }else{
                const data = {
                    msg:res.data.msg
                }
                const errorMsg = ErrorMsg(data)
                dispatch(errorMsg)
            }
        })
    }
   
}
export function saveUserInfoAction(state){
    const {email,qq,pwd} = state
    return dispatch=>{
        axios.post('/user/saveUserInfo.json',{email,qq,pwd}).then(
            res=>{
                if(res.data.success&&res.data.code===200){
                    const action = LoadDate(res.data.data)
                    dispatch(action)
                }else{
                    console.log('更新失败')
                }
            }

        )
    }
}