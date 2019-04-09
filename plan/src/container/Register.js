import React,{PureComponent} from 'react'
import { connect } from 'react-redux'
import { List, InputItem, TextareaItem, WhiteSpace, Button ,Toast} from 'antd-mobile'
import AvatorSelector from '../component/AvatarSelector'
import { getClearRedirectUrlAction,registerAction } from "../reducer/user.redux";
import PlanModel from '../component/PlanModel';

const avatorsName = ['ab','lzx','ym','zjl','zs','zy','zyx','dlrb','hg','kb','wyf','zzy']
const avators = avatorsName.map(v=>{
    return {
        icon: require(`../imgs/avators/${v}.jpg`),
        text: v,
    }
})

class Register extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            avator:'',
            realname:'',
            email:'',
            pwd:'',
            rpwd:'',
            qq:'',
            companyname:'',
            desc:''
        }
    }
    componentDidMount(){
        this.fixCarousel()
    }
    componentWillReceiveProps(){
        if(this.props.user.get('msg')){
            Toast.info(this.props.user.get('msg'), 1)
        }
        
    }
    fixCarousel(){
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        },0)
    }
    handleChange(k,v){
        this.setState({
            [k]:v
        })
    }
    goLogin(choose){
        if(choose==='sure'){
            this.props.history.push('/login')
        }else{
            this.setState({
                show: false
            })
            this.props.clearRedirectUrl()
        } 
    }
    render(){
        return (
            <div className='Register'>
                {
                    this.props.user.get('redirectTo')==='/login'?
                    <PlanModel 
                        show={this.state.show}
                        title='注册成功'
                        question='前往登录页面登录'
                        press={(choose)=>{
                            this.goLogin(choose)
                        }}
                    ></PlanModel>:null
                }
                <AvatorSelector
                    avators={avators}
                    avatorChoose={(avator)=>this.handleChange('avator',avator)}
                    avator={this.state.avator}
                />
                <List>
                    <InputItem
                        placeholder="请输入姓名"
                        ref={el => this.labelFocusInst = el}
                        onChange={v=>this.handleChange('realname',v)}
                    ><div>姓名</div></InputItem>
                    <InputItem
                        placeholder="请输入email"
                        ref={el => this.labelFocusInst = el}
                        onChange={v=>this.handleChange('email',v)}
                    ><div>Email</div></InputItem>
                    <InputItem
                        placeholder="请输入密码"
                        type="password"
                        ref={el => this.labelFocusInst = el}
                        onChange={v=>this.handleChange('pwd',v)}
                    ><div>密码</div></InputItem>
                    <InputItem
                        placeholder="请确认密码"
                        type="password"
                        ref={el => this.labelFocusInst = el}
                        onChange={v=>this.handleChange('rpwd',v)}
                    ><div>确认密码</div></InputItem>
                    <InputItem
                        placeholder="请输入QQ"
                        ref={el => this.labelFocusInst = el}
                        onChange={v=>this.handleChange('qq',v)}
                    ><div>QQ</div></InputItem>
                    <InputItem
                        placeholder="请输入公司名称"
                        ref={el => this.labelFocusInst = el}
                        onChange={v=>this.handleChange('companyname',v)}
                    ><div>公司名称</div></InputItem>
                    <TextareaItem
                        placeholder="请简单描述一下你的公司"
                        rows={5}
                        count={100}
                        onChange={v=>this.handleChange('desc',v)}
                    />
                    <WhiteSpace/>
                    <Button type="primary" onClick={()=>this.props.register(this.state)}>注册</Button>
                    <WhiteSpace />
                </List>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return {
        user: state.get('user')
    }
}
const mapDispatchToProps = dispatch => {
    return {
        register: (data)=>{
            dispatch(registerAction(data))
        },
        clearRedirectUrl: ()=>{
            dispatch(getClearRedirectUrlAction())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register)