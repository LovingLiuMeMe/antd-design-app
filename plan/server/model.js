const mongoose = require('mongoose')
const MONGODB_URL = 'mongodb://localhost:27017/liubo-plan'

mongoose.connect(MONGODB_URL)

const Schemas = {
    user:{
        email:{type:String,require:true},
        avator:{type:String,require:true},
        pwd:{type:String,require:true},
        type:{type:String,require:true,default:'employee'},
        realname:{type:String,require:true},
        qq:{type:String,require:true},
        telephone:{type:String,require:true},
        companyname:{type:String},
        desc:{type:String}
    },
    plan:{
        title:{type:String,require:true},
        desc:{type:String,require:true},
        fromuser:{type:String,require:true},
        touser:{type:String,require:true},
        level:{type:String,require:true},
        signdate:{type:String,require:true},
        date:{type:String,require:true},
        state:{type:String,require:true,default:'L'}
    }
}

for(let s in Schemas){// js作用域(闭包)
    mongoose.model(s,new mongoose.Schema(Schemas[s]))
}

module.exports = {
    getModel:function(name){
        return mongoose.model(name) //获取model
    }
}
