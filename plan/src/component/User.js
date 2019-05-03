import React,{PureComponent} from 'react';
import { Result, Icon, WhiteSpace } from 'antd-mobile';
import { mapIdToAvator } from '../Utils';
import { connect } from 'react-redux';
import { List, InputItem, Modal, Button, WingBlank, Toast} from 'antd-mobile';
import { saveUserInfoAction, LoadLoginUserInfo } from '../reducer/user.redux';
import { axios } from 'axios';
const Item = List.Item;
const prompt = Modal.prompt;
class User extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            id:'',
            realname:'',
            type:'',
            email:'',
            qq:'',
            companyname:'',
            desc:'',//公司描述
            avator:'',// 头像
            pwd:''// 登陆密码
        }
    }
    componentWillMount(){
        const id = this.props.user.get('id')
        if(!id){
            // 刷新页面的情况存在
            console.log('用户不是在登陆页面进入')
            axios.get('user/checkUserInfo.json').then(res=>{
                if(res.data.success&&res.data.status===200){
                    this.props.loadData(res.data.data)
                }else{
                    this.props.history.push('/index')
                }
            })
        }

    }
    componentDidMount(){
        this.setState({
            realname:this.props.user.get('realname'),
            type:this.props.user.get('type'),
            email:this.props.user.get('email'),
            qq:this.props.user.get('qq'),
            companyname:this.props.user.get('companyname'),
            desc:this.props.user.get('desc'),//公司描述
            avator:this.props.user.get('avator')// 头像
        })
    }
    handleChange(k,v){
        this.setState({
            [k]:v
        })
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
                            onChange={(v)=>{
                                this.handleChange('email',v)
                            }}
                        >邮箱地址</InputItem>
                        <InputItem
                            labelNumber={5}
                            defaultValue={this.props.user.get('qq')}
                            onChange={(v)=>{
                                this.handleChange('qq',v)
                            }}
                        >QQ</InputItem>
                        <InputItem
                            disabled
                            labelNumber={5}
                            defaultValue={this.props.user.get('companyname')}
                            onChange={(v)=>{
                                this.handleChange('companyname',v)
                            }}
                        >公司名称</InputItem>
                        <WhiteSpace size="lg" />
                        <WingBlank>
                            <Button onClick={()=> prompt(
                                '设置密码',
                                '请输入新的密码',
                                pwd => {
                                    this.handleChange('pwd',pwd)
                                },
                                '修改密码',
                                )}
                                type='primary'
                            >修改密码</Button>
                            <WhiteSpace/>
                            <Button onClick={() => {
                                this.props.save(this.state)
                            }}
                                type='default'
                            >保存信息</Button>
                        </WingBlank>
                    </List>
                </form>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        save: (state)=>{
            const action = saveUserInfoAction(state)
            dispatch(action)
        },
        load: ()=>{
            const action = LoadLoginUserInfo()
            dispatch(action)
        }
    }
}
const mapStateToProps = (state)=>{
    return {
        user:state.get('user')
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(User)