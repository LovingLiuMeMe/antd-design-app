import React,{PureComponent} from 'react'
import LogoImg from '../imgs/logo.png'
import './logo.css'

class Logo extends PureComponent{
    render(){
        return (
            <div className='logo-container'>
                <img src={LogoImg} alt='logo' />
            </div>
        )
    }
}

export default Logo