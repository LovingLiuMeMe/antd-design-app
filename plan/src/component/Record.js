import React from 'react';
//import {mapIdToAvator} from '../Utils';// 在这里一直在报错 mapIdToAvator 怀疑在无状态组件中 无法使用import的函数 只能实用props中的内容
import { WhiteSpace, WingBlank } from 'antd-mobile';
const Record = (props)=>{
    return (
        props.data.from !== props.login?(
            
            <div className='record left'> 
                <div className='container'>
                    <div className='avatar'>
                        <img alt={props.data.from} src={require(`../imgs/avators/${props.avatar}.jpg`)}/>
                    </div>
                    <div className='content'>{props.data.content}</div>
                </div>
            </div>
        ):(
            <div className='record right'>
                <div className='container'>
                    <div className='content'>{props.data.content}</div>
                    <div className='avatar'>
                        <img alt={props.data.from} src={require(`../imgs/avators/${props.avatar}.jpg`)}/>
                    </div>
                </div>
            </div> 

        )


    )
}
export default Record;