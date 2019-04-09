const utils = require('utility')
module.exports = {
    renderJson:function(success,code,msg,data){
        return {
            success,
            code,
            msg,
            data
        }
    },
    MD5:function(pwd){
        return utils.md5('helloPlan'+pwd)
    },
    getNowDate:function(){
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

        var currentdate = year + seperator1 + month + seperator1 + strDate+" "+ hour+":"+ minute +":"+ second;
        return currentdate;
    }
}