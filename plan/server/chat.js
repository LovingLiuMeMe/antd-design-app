const express = require('express')
const Router = express.Router()
const model = require('./model') // exports 不能解构
const Chat = model.getModel('chat')
const Util = require('./util/serverUtil')

Router.get('/chatListByChatId.json',function(req,resp){
    const { chatid } = req.query
    Chat.find({chatid},function(err,doc){
        if(!err){
            return resp.json(Util.renderJson(true,200,'查询成功',doc))
        }
        return resp.json(Util.renderJson(false,404,'查询失败'))
    })
})
Router.post('/readChats.json',function(req,resp){
    const {chatid,to} = req.body
    Chat.update({chatid,to}, {$set: {unread: false}}, {multi: true}, function(err){
        if(!err){
            return resp.json(Util.renderJson(true,200,'消息读取成功'))
        }
        return resp.json(Util.renderJso(false,400,'消息读取失败'))
    })
})
Router.get('/getAllChat.json',function(req,resp){
    console.log('req',req)
    const {userid} = req.query
    Chat.find({'$or':[{from:userid},{to:userid}]},function(err,doc){
        console.log('doc',doc)
        if(!err){
            return resp.json(Util.renderJson(true,200,'查询成功',doc))
        }
    })
})
module.exports =  Router