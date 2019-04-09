import React,{PureComponent} from 'react';
import { Button, List, WhiteSpace, InputItem, Flex, Modal} from 'antd-mobile';
import Logo from '../component/Logo';
import EamilImg from '../imgs/email.jpg';
import PwdImg from '../imgs/pwd.jpg';
import { connect } from 'react-redux';
import PlanModel from '../component/PlanModel';
import { getClearRedirectUrlAction } from '../reducer/user.redux';
import { Redirect } from 'react-router-dom' 


import { getLoginAction } from '../reducer/user.redux'

const alert = Modal.alert;
class Login extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            email:'',
            pwd:'',
            show: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.goRegister = this.goRegister.bind(this)
    }
    handleChange(k,v){
        this.setState({
            [k]:v
        })
    }
    goRegister(choose){
        if(choose==='sure'){
            this.props.history.push('/register')
        }else{
            this.setState({
                show: false
            })
            this.props.clearRedirectUrl()
        } 
    }
    componentWillReceiveProps(){
        if(this.props.user.get('redirectTo')==='/register'){
            alert('注册', '未发现该用户,请注册', [
                { text: '取消', onPress: () => this.props.clearRedirectUrl() },
                { text: '确定', onPress: () => this.props.history.push('/register') },
              ])
        }
    }
    render(){
        return (
        <div className='Login'>
            {
                this.props.user.get('redirectTo')?<Redirect to={this.props.user.get('redirectTo')}/>:null
            }
            <Flex>
                <Flex.Item>
                    <Logo/>
                </Flex.Item>
            </Flex>
            <List>
                <InputItem
                    placeholder="请输入邮箱"
                    onChange={(v)=>{
                        this.handleChange('email',v)
                    }}
                >
                    <img alt='left' src={EamilImg} style={{backgroundSize: 'cover', height: '22px', width: '22px' }} />
                </InputItem>
                <InputItem
                    placeholder="请输入密码"
                    type="password"
                    onChange={(v)=>{
                        this.handleChange('pwd',v)
                    }}
                >
                    <img alt='left' src={PwdImg} style={{backgroundSize: 'cover', height: '22px', width: '22px' }} />
                </InputItem>   
            </List>
            <WhiteSpace/>
            <Button type="primary" onClick={()=>{
                this.props.login(this.state)
            }}
            >登录</Button>
            <span style={{color: '#1890ff',textAlign:'right'}} className='toRegister' onClick={()=>this.goRegister('sure')}>去注册</span>
        </div>
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        user:state.get('user')
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => {
            dispatch(getLoginAction(data))
        },
        clearRedirectUrl: ()=>{
            dispatch(getClearRedirectUrlAction())
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)