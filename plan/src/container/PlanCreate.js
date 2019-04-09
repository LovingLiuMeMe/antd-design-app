import React,{ PureComponent } from 'react';
import {NavBar, List, InputItem, TextareaItem, Picker, DatePicker, Icon, Button, Toast } from 'antd-mobile';
import {connect} from 'react-redux';
import {qryAllUserListByCompanyIdAction } from '../reducer/user.redux'
import {createPlanAction} from '../reducer/plan.reducer'
import { getFormatDate } from '../Utils'
const colorStyle = {
    display: 'inline-block',
    width: '20px',
    verticalAlign: 'middle',
    height: '20px',
    marginRight: '10px',
};
const levels = [
    {
      label:
      (<div>
        <span
          style={{ ...colorStyle, backgroundColor: '#FF0000' }}
        />
        <span>高</span>
      </div>),
      value: 'H',
    },
    {
      label:
      (<div>
        <span
          style={{ ...colorStyle, backgroundColor: 'yellow' }}
        />
        <span>中</span>
      </div>),
      value: 'M',
    },
    {
      label:
      (<div>
        <span
          style={{ ...colorStyle, backgroundColor: '#00FF00' }}
        />
        <span>低</span>
      </div>),
      value: 'L',
    },
  ];
class PlanCreate extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            title:'',
            desc:'',
            touser:'',
            tempuser:'',
            level:'',
            templevel:'',
            date:'',
            tempdate:''
        }
        this.showUsers = this.showUsers.bind(this)
        this.changeTempUser = this.changeTempUser.bind(this)
        this.changeTempLevel = this.changeTempLevel.bind(this)
        this.formatState = this.formatState.bind(this)
    }
    componentWillReceiveProps(nextProps){
        if(this.props.plan.get('id') !== nextProps.plan.get('id')){
            Toast.info(nextProps.plan.get('msg'), 1);
        }
    }
    handleChange(k,v){
        this.setState({
            [k]:v
        })
    }
    formatState(state){
        return{
            ...state,
            date: getFormatDate(state.date),
            level: state.level[0],
            touser: state.touser[0],
            fromuser: this.props.user.get('id')
        }
    }
    changeTempLevel(templevel){
        this.setState({
            templevel
        })
    }
    changeTempUser(tempuser){
        this.setState({
            tempuser
        })
    }
    showUsers(userList){
        console.log(userList)
        const showUsers = [];
        userList.toJS().map(v=>{
            if(v._id !== this.props.user.get('_id')){
                showUsers.push(    
                    {
                    label:
                    (
                        <div>
                        <img
                            style={{ ...colorStyle}}
                            src={require(`../imgs/avators/${v.avator}.jpg`)}
                            alt={v.avator}
                        />
                        <span>{v.realname}</span>
                        </div>
                    ),
                    value: v._id
                    }
                ) 
            }
        })
        return showUsers
    }
    componentDidMount(){
        // 获得用户列表
        this.props.qryAllUserListByCompanyId(this.props.user.get('companyname'))
    }
    render(){
        console.log(this.showUsers(this.props.user.get('userlist')))
        return (
            <div>
                <NavBar
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => this.props.history.goBack()}
                >
                    创建日程
                </NavBar>
                <List renderHeader={() => '请填写以下信息'}>
                    <InputItem
                        placeholder="请输入具体日程名称"
                        onChange={v=>{this.handleChange('title',v)}}
                    >
                        <div>日程名称</div>
                    </InputItem>
                    <TextareaItem
                        title="日程描述"
                        placeholder="请输入具体日程内容"
                        autoHeight
                        rows='3'
                        onChange={v=>{
                            this.handleChange('desc',v)
                        }}
                    />
                    <Picker
                        data={this.showUsers(this.props.user.get('userlist'))}
                        value={this.state.touser}
                        cols={1}
                        onChange={this.changeTempUser}
                        onOk={this.handleChange('touser',this.state.tempuser)}
                    >
                        <List.Item arrow="horizontal">派发员工</List.Item>
                    </Picker>
                    <Picker
                        data={levels}
                        value={this.state.level}
                        cols={1}
                        onChange={this.changeTempLevel}
                        onOk={this.handleChange('level',this.state.templevel)}
                    >
                        <List.Item arrow="horizontal">日程等级</List.Item>
                    </Picker>
                    <DatePicker
                        value={this.state.date}
                        onChange={tempdate => this.handleChange('tempdate',tempdate)}
                        onOk={()=>this.handleChange('date',this.state.tempdate)}
                        >
                        <List.Item arrow="horizontal">规定完成时间</List.Item>
                    </DatePicker>
                    <Button 
                        type="primary" 
                        style={{
                            width:'100%',
                            marginTop:'40px'
                        }}
                        onClick={()=>{this.props.createPlan(this.formatState(this.state))}}
                    >创建</Button>
                </List>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        user:state.get('user'),
        plan:state.get('plan')
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        qryAllUserListByCompanyId:(companyname)=>{
            const action = qryAllUserListByCompanyIdAction(companyname)
            dispatch(action)
        },
        createPlan:(state)=>{
            const action = createPlanAction(state)
            dispatch(action)
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PlanCreate)