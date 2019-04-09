import React,{ PureComponent,Fragment } from 'react';
import {WingBlank,WhiteSpace,Card} from 'antd-mobile';
import { connect } from 'react-redux'
import { listAction } from '../reducer/plan.reducer'
import { qryAllUserListByCompanyIdAction } from '../reducer/user.redux'

const colorStyle = {
  display: 'inline-block',
  width: '20px',
  verticalAlign: 'middle',
  height: '20px',
  marginRight: '10px',
};

class PlanList extends PureComponent{
    constructor(props){
        super(props)
        this.createPlanLevel = this.createPlanLevel.bind(this)
        this.mapUserIdToAvator = this.mapUserIdToAvator.bind(this)
        this.mapUserIdToName = this.mapUserIdToName.bind(this)
        this.planClick = this.planClick.bind(this)
    }
    componentDidMount(){
      this.props.qryAllUserListByCompanyId(this.props.user.get('companyname'))
      this.props.list(this.props.user.get('id'))
     
    }
    planClick(id){
      this.props.history.push(`/planinfo/${id}`)
    }
    mapUserIdToName(id,self){
      let name = "default";
      this.props.user.get('userlist').toJS().map(v=>{
        if(id===v._id){
          name = v.realname
        }
      })
      if(self){
        return (<div>{'处理人:'+name}</div>)
      }else{
        return (<div>{'分发人:'+name}</div>)
      }
      
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
    createPlanLevel(level){
        switch(level){
          case 'H':
            return (
              <div>
                <span
                  style={{ ...colorStyle, backgroundColor: '#FF0000' }}
                />
                <span>高</span>
              </div>
            );
          case 'M':
              return(
                <div>
                  <span
                    style={{ ...colorStyle, backgroundColor: 'yellow' }}
                  />
                  <span>中</span>
                </div>
              );
          case 'L':
                return(
                <div>
                  <span
                    style={{ ...colorStyle, backgroundColor: '#00FF00' }}
                  />
                  <span>低</span>
                </div>
                )
          default:
              return(
                <div>
                  <span
                    style={{ ...colorStyle, backgroundColor: '#00FF00' }}
                  />
                  <span>低</span>
                </div>
              )
        }
    }
    render(){
        return (
          <div style={{paddingBottom:'60px'}}>
            <WingBlank size="lg">
            {
              this.props.plan.get('planlist').toJS().map(v=>{
                return v.fromuser===this.props.user.get('id')?
                (
                    <Fragment>
                    <WhiteSpace size="lg" />
                    <Card  onClick={()=>this.planClick(v._id)}>
                      <Card.Header
                        title={v.title}
                        thumb={<img 
                          style={
                            {
                              width:'32px',
                              height:'32px'
                            }
                          }
                          alt='avator'
                          src={require(`../imgs/avators/${this.mapUserIdToAvator(v.touser)}.jpg`)}
                        />}
                        extra={this.createPlanLevel(v.level)}
                        className='selfCreate'
                      />
                      <Card.Body
                      >
                        <div>{v.desc}</div>
                      </Card.Body>
                      <Card.Footer
                        content={this.mapUserIdToName(v.fromuser,true)} extra={<div>{v.signdate}</div>} />
                    </Card>
                  </Fragment>
                ):
                (
                  <Fragment>
                  <WhiteSpace size="lg" />
                  <Card onClick={()=>this.planClick(v._id)}>
                    <Card.Header
                      title={v.title}
                      thumb={<img 
                        style={
                          {
                            width:'32px',
                            height:'32px'
                          }
                        }
                        alt='avator'
                        src={require(`../imgs/avators/${this.mapUserIdToAvator(v.fromuser)}.jpg`)}
                      />}

                      extra={this.createPlanLevel(v.level)}
                    />
                    <Card.Body>
                      <div>{v.desc}</div>
                    </Card.Body>
                    <Card.Footer content={this.mapUserIdToName(v.fromuser,false)} extra={<div>{v.signdate}</div>} />
                  </Card>
                </Fragment>
              )
              })
            }

            </WingBlank>
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
      list:(userid)=>{
        const action = listAction(userid)
        dispatch(action)
      },
      qryAllUserListByCompanyId:(companyname)=>{
        const action = qryAllUserListByCompanyIdAction(companyname)
        dispatch(action)
    },
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PlanList)