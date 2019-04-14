const express = require('express')

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const userRouter = require('./user')
const planRouter = require('./plan')
const chatRouter = require('./chat')
const model = require('./model') // exports 不能解构
const Chat = model.getModel('chat')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection',function(socket){
    socket.on('sendMsg',function(data){
        const {from,to,content,chatid} = data
        Chat.create({from,to,content,chatid},function(err,doc){
            if(!err){
                io.emit('recvMsg',JSON.stringify(doc))
            }else{
                console.log(err)
            }
        })
    })
})
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', userRouter)
app.use('/plan', planRouter)
app.use('/chat',chatRouter)

server.listen(9090,function(){
    console.log('服务器监听成功')
})