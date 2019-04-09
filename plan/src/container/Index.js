import React,{PureComponent} from 'react';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import { Flex, WhiteSpace } from 'antd-mobile';
import { Button, List, WingBlank } from 'antd-mobile';

class Index extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            show: false
        }
    }
    componentDidMount(){
        setTimeout(()=>{
            this.setState({show:true})
        },1000)
    }
    render(){
        return (
          <div className='Index'>
            <Flex>
                <Flex.Item>
                    <Texty>{this.state.show && 'Hello Plan'}</Texty>
                </Flex.Item>
                <WhiteSpace/>
            </Flex>
            <WingBlank>
                <Button type="primary" 
                    onClick={()=>{
                        this.props.history.push('/login')
                    }}
                >登录</Button><WhiteSpace />
                <WhiteSpace />
                <Button style={{color:'#1890ff'}}
                    onClick={
                        ()=>{
                            this.props.history.push('/register')
                        }
                    }
                >注册</Button><WhiteSpace />
            </WingBlank>
            <span className='author'>by 刘波</span>
          </div>
        );
    }
}
export default Index