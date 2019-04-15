import React,{PureComponent} from 'react';
import {connect} from 'react-redux';
import { List, Badge} from 'antd-mobile';
import { mapIdToAvator, mapIdToName } from '../Utils';

const Item = List.Item
const Brief = Item.Brief
class MsgList extends PureComponent{
    constructor(props){
        super(props)
        this.getLast = this.getLast.bind(this)
    }
    getLast(list){
        return list[list.length-1]
    }
    render(){
        const chatlist = this.props.chat.get('chatlist').toJS()
        const chatGroup = {}
        chatlist.map(v=>{
            chatGroup[v.chatid] = chatGroup[v.chatid]||[]
            chatGroup[v.chatid].push(v)
        })
        const msglist = Object.values(chatGroup).sort((a,b)=>{
            const a_signdate = this.getLast(a).signdate
            const b_signdate = this.getLast(b).signdate
            return b_signdate - a_signdate
        })
        return (
            <div>
                <List>
                  {
                    msglist.map(v=>{
                        const lastItem = this.getLast(v)
                        const loginid = this.props.user.get('id')
                        const unreadNum = v.filter(item=>item.unread&&item.to===loginid).length  // javaScript 闭包
                        
                        const userlist = this.props.user.get('userlist').toJS()
                        const avatar = lastItem.from===loginid?mapIdToAvator(lastItem.to,userlist):mapIdToAvator(lastItem.from,userlist)
                        const name = lastItem.from===loginid?mapIdToName(lastItem.to,userlist):mapIdToName(lastItem.from,userlist)
                        return (
                            <Item
                                extra={<Badge text={unreadNum}></Badge>}
                                key={lastItem._id}
                                thumb={require(`../imgs/avators/${avatar}.jpg`)}
                                onClick={()=>{this.props.history.push(`/chat/${lastItem.from===loginid?lastItem.to:lastItem.from}`)}}
                            >
                                {lastItem.content}
                                <Brief>{name}</Brief>
                            </Item>  
                        )
                    })
                  }
               </List>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        chat: state.get('chat'),
        user: state.get('user')
    }
}
export default connect(mapStateToProps,null)(MsgList)