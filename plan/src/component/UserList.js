import React,{PureComponent} from 'react';
import {connect} from 'react-redux';
import { mapUserIdToAvator } from '../Utils';
import { List } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

class UserList extends PureComponent{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className='userlist'>
                <List>
                    {
                        this.props.user.get('userlist').map(v=>{
                            return(
                                <Item
                                    arrow="horizontal"
                                    thumb={require(`../imgs/avators/${v.get('avator')}.jpg`)}
                                    multipleLine
                                    onClick={() => {
                                        this.props.history.push(`/chatuser/${v.get('_id')}`)
                                    }}
                                >
                                    { v.get('realname') }
                                    <Brief>
                                    {`QQ: ${v.get('qq')}        Email: ${v.get('email')}`}
                                    </Brief>
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
    return {
        user: state.get('user')
    }
}
export default connect(mapStateToProps,null)(UserList)