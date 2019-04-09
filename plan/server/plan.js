const exprss = require('express')
const Router = exprss.Router()
const model = require('./model')
const PlanModel = model.getModel('plan')
const Util = require('./util/serverUtil')

Router.post('/planCreate.json',function(req,resp){
    const { title,desc,touser,fromuser,level,date } = req.body
    const signdate = Util.getNowDate();
    const plan = new PlanModel({title,desc,touser,fromuser,level,date,signdate });
    plan.save(function(err,doc){
        if(!err){
            return resp.json(Util.renderJson(true,200,'创建成功',doc))
        }
        return resp.json(Util.renderJson(false,400,'创建失败'))
    })
})
Router.get('/list.json',function(req,resp){
    const {id} = req.query
    PlanModel.find({"$or":[{touser:id},{fromuser:id}]},function(err,doc){
        if(!err){
            return resp.json(Util.renderJson(true,200,'查询plan列表成功',doc))
        }else{
            return resp.json(Util.renderJson(false,400,'查询plan列表是失败'))
        }
    })
})
Router.get('/qryPlan.json',function(req,resp){
    const {id} = req.query
    PlanModel.findById(id,function(err,doc){
        if(!err){
            return resp.json(Util.renderJson(true,200,'查询成功',doc))
        }else{
            return resp.json(Util.renderJson(false,400,'查询失败'))
        }
    })
})
Router.post('/updatePlan.json',function(req,resp){
    const { id,title,desc,touser,level,date } = req.body
    console.log('id',id)
    PlanModel.update({_id:id},{title,desc,touser,level,date},function(err,doc){
        if(!err){
            console.log(doc)
            return resp.json(Util.renderJson(true,200,'更新成功',doc))
        }else{
            return resp.json(Util.renderJson(false,400,'更新失败'))
        }
    })
})
Router.post('/setPlanState.json',function(req,resp){
    const { id,state} = req.body
    PlanModel.update({_id:id},{state},function(err,doc){
        if(!err){
            return resp.json(Util.renderJson(true,200,'更新成功',doc))
        }else{
            return resp.json(Util.renderJson(false,400,'更新失败'))
        }
    })
})
module.exports = Router