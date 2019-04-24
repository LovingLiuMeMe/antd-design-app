import React,{PureComponent} from 'react'
import { NavBar,Icon,List,InputItem,TextareaItem,Button,Picker,DatePicker } from 'antd-mobile'
import { connect } from 'react-redux';
import { getPlanInfoAction,updatePlanAction,setPlanStatusAction } from '../reducer/plan.reducer'
import {parserDate} from '../Utils'
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
class PlanInfo extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            id:'',
            title:'',
            desc:'',
            touser:'',
            tempuser:'',
            level:'',
            templevel:'',
            date:'',
            tempdate:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.showUsers = this.showUsers.bind(this)
        this.mapUserIdToName = this.mapUserIdToName.bind(this)
        this.mapUserIdToAvator = this.mapUserIdToAvator.bind(this)
        this.mapLevel = this.mapLevel.bind(this)
    }
    componentDidMount(){
        const planid = this.props.match.params.planid
        this.setState({
            id:planid
        })
        this.props.getPlanInfo(planid)
    }
    componentWillReceiveProps(nextProps){
        console.log('nextProps',nextProps)
        this.setState({
            msg:nextProps.plan.get('msg'),
            id:nextProps.plan.get('id'),
            title:nextProps.plan.get('title'),
            desc:nextProps.plan.get('desc'),
            fromuser:nextProps.plan.get('fromuser'),
            touser:nextProps.plan.get('touser'),
            level:nextProps.plan.get('level'),
            date:nextProps.plan.get('date'),
            signdate:nextProps.plan.get('signdate')
        })
    }
    handleChange(k,v){
        this.setState({
            [k]:v
        })
    }
    mapLevel(level){
        levels.map(v=>{
            if(v.value===level){
                return v.label
            }
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
    mapUserIdToName(id){
        let name = '';
        this.props.user.get('userlist').toJS().map(v=>{
          if(id===v._id){
            name = v.realname
          }
        })
        return name;
      }
    mapUserIdToAvator(id){
        let avator = '';
        this.props.user.get('userlist').toJS().map(v=>{
            if(id===v._id){
            avator = v.avator
            }
        })
        return avator
    }
    render(){
        return (
            <div>
            <NavBar
            mode="dark"
            icon={<Icon type="left" />}
            onLeftClick={() => this.props.history.goBack()}
            >
                日程详情
            </NavBar>
            <List renderHeader={() => '详细信息如下'}>
                <InputItem
                    value={this.state.title}
                    editable={this.props.plan.get('fromuser')===this.props.user.get('id')}
                    disabled={this.props.plan.get('fromuser')!==this.props.user.get('id')}
                    onChange={v=>{
                        this.handleChange('title',v)
                    }}
                >
                    <div>日程名称</div>
                </InputItem>
                <TextareaItem
                    value={this.state.desc}
                    title="日程描述"
                    editable={this.props.plan.get('fromuser')===this.props.user.get('id')}
                    disabled={this.props.plan.get('fromuser')!==this.props.user.get('id')}
                    autoHeight
                    rows='3'
                    onChange={v=>{
                        this.handleChange('desc',v)
                    }}
                />
                {
                    this.props.plan.get('fromuser')===this.props.user.get('id')?(
                        <Picker
                            data={this.showUsers(this.props.user.get('userlist'))}
                            value={this.state.touser}
                            cols={1}
                            onChange={v=>this.handleChange('tempuser',v)}
                            onOk={this.handleChange('touser',this.state.tempuser)}
                        >
                            <List.Item arrow="horizontal">派发员工</List.Item>
                        </Picker>
                    ):(
                        <InputItem
                            style={{
                                textAlign:"right"
                            }}
                            value={this.mapUserIdToName(this.props.plan.get('fromuser'))}
                        >
                            <div>派发领导</div>
                        </InputItem>
                    )
                }

                {
                    this.props.plan.get('fromuser')===this.props.user.get('id')?(
                        <Picker
                            data={levels}
                            value={this.state.level}
                            cols={1}
                            onChange={v=>this.handleChange('templevel',v)}
                            onOk={this.handleChange('level',this.state.templevel)}
                        >
                            <List.Item arrow="horizontal">日程等级 {this.mapLevel(this.state.level)}</List.Item>
                        </Picker>
                    ):(
                        <InputItem
                            style={{
                                textAlign:"right"
                            }}
                            value={this.state.date}
                        >
                            <div>规定完成时间</div>
                        </InputItem>
                    )
                }
                <InputItem
                    style={{
                        textAlign:"right"
                    }}
                    value={this.state.signdate}
                >
                    <div>创建时间</div>
                </InputItem>
                {
                    this.props.plan.get('fromuser')===this.props.user.get('id')?(
                        <Button 
                            type="default" 
                            onClick={()=>{this.props.updatePlan(this.state)}}
                        >保存</Button>
                    ):(
                        <Button 
                            type="primary" 
                            onClick={()=>{this.props.setPlanStatus(this.props.plan.get('status')===0||this.props.plan.get('status')===null?{id:this.state.id,status:1}:{id:this.state.id,status:2})}}
                        >{this.props.plan.get('status')===0||this.props.plan.get('status')===null?'提交':'完成'}</Button>
                    )

                }
            </List>
        </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.get('user'),
        plan: state.get('plan')
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getPlanInfo: (planid) => {
            dispatch(getPlanInfoAction(planid))
        },
        updatePlan: (data) =>{
            dispatch(updatePlanAction(data))
        },
        setPlanStatus: (data) =>{
            dispatch(setPlanStatusAction(data))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PlanInfo)