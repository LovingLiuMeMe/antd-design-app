import { fromJS } from 'immutable'
import axios from 'axios'
import {mapIdToEmail,mapIdToName,mapLevelToName} from '../Utils'

const ERROR_MSG = 'ERROR_MSG'
const CREATE_SUCCESS = 'CREATE_SUCCESS'
const QUERY_ALL_SUCCESS = 'QUERY_ALL_SUCCESS'
const QUERY_ONE_SUCCESS = 'QUERY_ONE_SUCCESS'

const initState = fromJS({
    id:'',
    title:'',
    desc:'',
    fromuser:'',
    touser:'',
    level:'',
    date:'',
    signdate:'',
    msg:'',
    planlist:[]
})

function ErrorMsg(msg){
    const payload = fromJS({
        msg: msg
    })
    return {
        type:ERROR_MSG,
        payload
    }
}
function ListSuccess(planlist){
    const payload = fromJS({
        msg: '查询plan列表成功',
        planlist
    })
    return {
        type:QUERY_ALL_SUCCESS,
        payload
    }
}
function CreateSuccess({_id,title,desc,fromuser,touser,level,date,signdate}){
    const payload = fromJS({
        id:_id,
        title,
        desc,
        fromuser,
        touser,
        level,
        date,
        signdate,
        msg:'分配成功'
    })
    return {
        type:CREATE_SUCCESS,
        payload
    } 
}
function QrySuccess(payload){
    console.log('QrySuccess',payload)
    return {
        type:QUERY_ONE_SUCCESS,
        payload:fromJS(payload)
    }
}
export function plan(state=initState,action){
    switch(action.type){
        case ERROR_MSG:
            return state.set('msg',action.payload.get('msg'))
        case CREATE_SUCCESS:
            return state.merge({
                msg:action.payload.get('msg'),
                id:action.payload.get('id'),
                title:action.payload.get('title'),
                desc:action.payload.get('desc'),
                fromuser:action.payload.get('fromuser'),
                touser:action.payload.get('touser'),
                level:action.payload.get('level'),
                date:action.payload.get('date'),
                signdate:action.payload.get('signdate')
            })
        case QUERY_ALL_SUCCESS:
            return state.merge({
                planlist: action.payload.get('planlist'),
                msg: action.payload.get('msg'),
            })
        case QUERY_ONE_SUCCESS:
            return state.merge({
                msg:action.payload.get('msg'),
                id:action.payload.get('_id'),
                title:action.payload.get('title'),
                desc:action.payload.get('desc'),
                fromuser:action.payload.get('fromuser'),
                touser:action.payload.get('touser'),
                level:action.payload.get('level'),
                date:action.payload.get('date'),
                signdate:action.payload.get('signdate')
            })
        default:
            return state;
    }
}

export function createPlanAction(state){
    for(let p in state){
        console.log(state[p])
        if(!state[p]){
            return ErrorMsg('请完善日程信息')
        }
    }
    return (dispatch,getState) =>{
        const {title,desc,fromuser,touser,level,date,signdate} = state
        const allState = getState().get('user').get('userlist').toJS()
        const toemail = mapIdToEmail(touser,allState)
        const fromname = mapIdToName(fromuser,allState)
        const toname = mapIdToName(touser,allState)
        const levelName = mapLevelToName(level)
        const obj = {
            title,
            desc,
            fromuser,
            touser,
            level,
            date,
            toemail,
            fromname,
            toname,
            levelName
        };
        axios.post('/plan/planCreate.json',obj
        ).then(res=>{
            if(res.data.success&&res.data.code){
                dispatch (CreateSuccess(res.data.data))
            }else{
                dispatch (ErrorMsg('创建失败'))
            }
        })
    }
}
export function listAction(userid){
    return dispatch=>{
        axios.get('/plan/list.json?id='+userid).then(res=>{
            if(res.data.success&&res.data.code===200){
                dispatch(ListSuccess(res.data.data))
                console.log(res.data.data)
            }else{
                dispatch (ERROR_MSG('获取plan列表失败'))
            }
        })
    }
}
export function getPlanInfoAction(planid){
    return dispatch=>{
        axios.get('/plan/qryPlan.json?id='+planid).then(res=>{
            if(res.data.success&&res.data.code===200){
                dispatch(QrySuccess(res.data.data))
            }else{
                dispatch(ErrorMsg(res.data.msg))
            }
        })
    }
}
export function updatePlanAction(data){
    return dispatch=>{
        axios.post('/plan/updatePlan.json',data).then(res=>{
            if(res.data.nModified&&res.data.nModified===0){
                console.log('已经是最新信息，未发生更改。')
            }else{
                if(res.data.success&&res.data.code===200){
                    dispatch(QrySuccess(res.data.data))
                }else{
                    dispatch(ErrorMsg(res.data.msg))
                }
            }

        })
    }
}
export function setPlanStatusAction(data){
    return dispatch=>{
        axios.post('/plan/setPlanStatus.json',data).then(res=>{
            if(res.data.success&&res.data.code===200){
                if(res.data.data.nModified===0){
                    console.log('已经是最新信息，未发生更改。')
                }else{
                    dispatch(QrySuccess(res.data.data))
                }
            }else{
                dispatch(ErrorMsg(res.data.msg))
            }

        })
    }
}