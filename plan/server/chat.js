const express = require('express')
const Router = express.Router()
const model = require('./model') // exports 不能解构
const Chat = model.getModel('chat')
const Util = require('./util/serverUtil')

Router.get('/chatlist.json',function(req,resp){
    const { chatid } = req.query
    Chat.find({chatid},function(err,doc){
        if(!err){
            console.log('查询成功',doc)
            return resp.json(Util.renderJson(true,200,'查询成功',doc))
        }
        return resp.json(Util.renderJson(false,404,'查询失败'))
    })
})

module.exports =  Router