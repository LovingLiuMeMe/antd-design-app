const express = require('express')

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const userRouter = require('./user')
const planRouter = require('./plan')

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', userRouter)
app.use('/plan', planRouter)

app.listen(9090,function(){
    console.log('服务器监听成功')
})