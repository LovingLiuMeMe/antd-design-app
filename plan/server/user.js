const express = require('express')
const Router = express.Router()
const model = require('./model') // exports 不能解构
const User = model.getModel('user')
const Util = require('./util/serverUtil')
const filter = {
    'pwd': 0
}

Router.get('/checkUserInfo.json',function(req,resp){
    const {login_id} = req.cookies
    if(login_id){
        return resp.json(Util.renderJson(true,200,'已登录'))
    }else{
        return resp.json(Util.renderJson(false,400,'未登录'))
    }
})

Router.post('/qryUserInfo.json',function(req,resp){
    const {email,pwd} = req.body
    if(!email&&!pwd){
        return resp.json(Util.renderJson(false,400,'请输入用户名或密码'))
    }else{
        User.findOne({email,pwd:Util.MD5(pwd)},filter,function(err,doc){
            if(doc){
                const {_id} = doc
                resp.cookie('login_id', _id)
                return resp.json(Util.renderJson(true,200,'登录成功',doc))
            }
            return resp.json(Util.renderJson(false,400,'不存在该用户,请注册'))
        })
    }
})
Router.post('/register.json',function(req,resp){
    const {avator,realname,email,pwd,rpwd,qq,companyname,desc} = req.body
    User.findOne({email},function(err,doc){
        if(doc){
            return resp.json(Util.renderJson(false,400,'该邮箱已被注册'))
        }else{
            const userModel = new User({avator,realname,email,pwd:Util.MD5(pwd),rpwd,qq,companyname,desc})
            userModel.save(function(err,doc){
                if(doc){
                    return resp.json(Util.renderJson(true,200,'注册成功',doc))
                }
                return resp.json(Util.renderJson(false,400,'注册失败'))
            })
        }
    })
})
Router.get('/qryAllUserListByCompanyId.json',function(req,resp){
    const {companyname} = req.query
    console.log(companyname)
    if(!companyname){
        return resp.json(Util.renderJson(false,400,'参数错误'))
    }else{
        User.find({companyname},function(err,doc){
            if(doc.length>0){
                return resp.json(Util.renderJson(true,200,'查询成功',doc))
            }else{
                return resp.json(Util.renderJson(false,400,'该公司未注册')) 
            }
        })
    }
})

module.exports = Router