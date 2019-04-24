import React,{PureComponent} from 'react';
import {NavBar, Icon} from 'antd-mobile';
import PlanTabBar from '../component/PlanTabBar';
import {Route} from 'react-router-dom';
import PlanList from '../component/PlanList';
import PlanCreate from './PlanCreate';
import MsgList from '../component/MsgList'
import UserList from '../component/UserList';
import User from '../component/User'
import {connect} from 'react-redux';
import { getAllChatAction, listenRecvMsgAction } from '../reducer/chat.reducer';

const navList = [
    {
        path:'/planlist',
        text:'任务',
        icon:'boss',
        title:'任务列表',
        component:PlanList
    },
    {
        path:'/msglist',
        text:'消息',
        icon:'msg',
        title:'消息列表',
        component:MsgList
    },
    {
        path:'/userlist',
        text:'员工',
        icon:'job',
        title:'职员列表',
        component:UserList
    },
    {
        path:'/me',
        text:'我',
        icon:'user',
        title:'个人中心',
        component:User
    }
]
class DashBoard extends PureComponent{
    constructor(props){
        super(props)
        this.urlHandleChange = this.urlHandleChange.bind(this)
    }
    urlHandleChange(url){
        this.props.history.push(url)
    }
    componentDidMount(){
        this.props.getAllChat()
        this.props.listenRecvMsg('dashboard')
    }
    render(){
        const chatList = this.props.chat.get('chatlist').toJS()
        const unreadMsgs = chatList.filter(v=>{
            if(v.to===this.props.user.get('id')&&v.unread){
                return true
            }
            return false
        }).length
        console.log('unreadMsgs',unreadMsgs)
        return (
            <div>
            {
                    navList.map(v=>{
                        if(this.props.location.pathname === v.path)
                        {
                            return (
                                <div>
                                <NavBar
                                mode="dark"
                                leftContent={v.path==='/planlist'&&this.props.user.get('type')==='employee'?"新建":null}
                                onLeftClick={()=>{this.props.history.push('/plancreate')}}
                                rightContent={v.path==='/planlist'&&this.props.user.get('type')==='employee'?[
                                    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                                    <Icon key="1" type="ellipsis" />,
                                ]:null}
                                >
                                {
                                    v.title
                                }
                                </NavBar>
                                <Route to={v.path} component={v.component}></Route>
                                </div>
                            )
                        }
                    }) 
            }
                <PlanTabBar
                    unreadMsgs={unreadMsgs}
                    data={navList}
                    changeUrl={(url)=>this.urlHandleChange(url)}
                    nowPath={this.props.location.pathname}
                />
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        user:state.get('user'),
        chat:state.get('chat')
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        getAllChat:()=>{
            dispatch(getAllChatAction())
        },
        listenRecvMsg:(chatid)=>{
            dispatch(listenRecvMsgAction(chatid))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(DashBoard)