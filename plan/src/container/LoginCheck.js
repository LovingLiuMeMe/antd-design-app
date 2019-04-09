import React,{PureComponent} from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { LoadLoginUserInfo } from '../reducer/user.redux'
import axios from 'axios'

const excludeUrls = ['login','register']

class LoginCheck extends PureComponent{
    componentDidMount(){
        const nowUrl = this.props.location.pathname
        if(excludeUrls.includes(nowUrl)){
            return null
        }else{
            axios.get('user/checkUserInfo.json').then(res=>{
                if(res.data.success&&res.data.status===200){
                    this.props.loadData(res.data.data)
                }else{
                    this.props.history.push('/index')
                }
            })
        }
    }
    render(){
        return null
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        loadData:(data)=>{
            dispatch(LoadLoginUserInfo(data))
        }
    }
}

export default connect(null,mapDispatchToProps)(withRouter(LoginCheck))