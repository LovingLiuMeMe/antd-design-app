import React,{PureComponent} from 'react';
import { connect } from 'react-redux';
import { msgListByChatIdAction, listenRecvMsgAction, sendMsgAction, readChatsAction, getAllChatAction} from '../reducer/chat.reducer';
import { NavBar, List, Icon, TextareaItem, WingBlank } from 'antd-mobile';
import { mapIdToName, getChatId, mapIdToAvator } from '../Utils';
import Record from '../component/Record';
import QueueAnim from 'rc-queue-anim';
import { toUnicode } from 'punycode';

const Item = List.Item;
class Chat extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            value:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.submitRecord = this.submitRecord.bind(this)
    }
    submitRecord(){
        const data = 
            {   
                from:this.props.user.get('id'),
                to:this.props.match.params.userid,
                chatid:getChatId(this.props.user.get('id'),this.props.match.params.userid),
                content:this.state.value
            }
        console.log('data',data)
        this.props.sendMsg(data)
        this.setState({
            value:''
        })
    }
    handleChange(k,v){
        this.setState({
            [k]:v
        })
    }
    componentDidMount(){
        this.props.msgListByChatId(getChatId(this.props.match.params.userid,this.props.user.get('id')))
        this.props.listenRecvMsg(getChatId(this.props.match.params.userid,this.props.user.get('id')))
    }
    componentWillUnmount(){
        this.props.readChats(getChatId(this.props.match.params.userid,this.props.user.get('id')),this.props.user.get('id'))
        this.props.getAllChat(this.props.user.get('id'))
    }
    render(){
        return(
            <div className='chat'>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                    className='header'
                >
                {
                    mapIdToName(this.props.match.params.userid,this.props.user.get('userlist').toJS())
                }
                </NavBar>
                <div className='wrap'>
                    <div className='main'>
                        {  
                            this.props.chat.get('chatlist').toJS().map(v=>{
                                console.log('v',v)
                                return (
                                    <WingBlank key={v._id} style={{overflow:'hidden'}}>
                                        <Record 
                                            data={v} 
                                            login={this.props.user.get('id')} 
                                            avatar={mapIdToAvator(v.from,this.props.user.get('userlist').toJS())}
                                        />
                                    </WingBlank>
                                )
                            }) 
                        }
                    </div>
                </div>
                
                <List
                    className='footer'
                >
                    <Item extra={<span onClick={()=>this.submitRecord()}>发送</span>} >
                        <TextareaItem
                            autoHeight
                            labelNumber={5}
                            value={this.state.value}
                            onChange={(value)=>this.handleChange('value',value)}
                        />
                    </Item>
                </List>
            </div>
        )
    }

}
const mapDispatchToProps = (dispatch)=>{
    return {
        msgListByChatId:(chatid)=>{
            dispatch(msgListByChatIdAction(chatid))
        },
        listenRecvMsg:(chatid)=>{
            dispatch(listenRecvMsgAction(chatid))
        },
        sendMsg:(data)=>{
            dispatch(sendMsgAction(data))
        },
        readChats:(chatid,to)=>{
            dispatch(readChatsAction(chatid,to))
        },
        getAllChat:(userid)=>{
            dispatch(getAllChatAction(userid))
        }
    }
}
const mapStateToProps = (state)=>{
    return {
        user: state.get('user'),
        chat: state.get('chat')
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Chat);
