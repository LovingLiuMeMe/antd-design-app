import React,{PureComponent} from 'react';
import { Result, Icon, WhiteSpace } from 'antd-mobile';
import { mapIdToAvator } from '../Utils';
import { connect } from 'react-redux';
import { List, InputItem, Modal, Button, WingBlank, Toast} from 'antd-mobile';

const Item = List.Item;
const prompt = Modal.prompt;
class User extends PureComponent{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>  
                <Result
                    img={<img style={{
                        width: '100%',
                        height: '100%'
                    }}alt={this.props.user.get('id')} src={require(`../imgs/avators/${this.props.user.get('avator')}.jpg`)}/>}
                    title={this.props.user.get('realname')}
                    message={this.props.user.get('type')==='employee'?<div>员工</div>:<div>管理员</div>}
                />
                <form>
                    <List
                        renderHeader={() => '个人信息'}
                    >
                        <InputItem
                            labelNumber={5}
                            defaultValue={this.props.user.get('email')}

                        >邮箱地址</InputItem>
                        <InputItem
                            labelNumber={5}
                            defaultValue={this.props.user.get('qq')}
                            
                        >QQ</InputItem>
                        <InputItem
                            labelNumber={5}
                            defaultValue={this.props.user.get('companyname')}

                        >公司名称</InputItem>
                        <WhiteSpace size="lg" />
                        <Button onClick={() => prompt(
                            '设置密码',
                            '请输入新的密码',
                            password => console.log(`password: ${password}`),
                            'secure-text',
                            )}
                            type='primary'
                        >secure-text</Button>
                    </List>
                </form>
            </div>
        )
    }
}
// const mapDispatchToProps = (dispatch)=>{
//     return {
        
//     }
// }
const mapStateToProps = (state)=>{
    return {
        user:state.get('user')
    }
}
export default connect(mapStateToProps,null)(User)