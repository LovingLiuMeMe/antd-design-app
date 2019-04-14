import { user } from "./reducer/user.redux";

function getFormatDate(time){
        var date = new Date(time);
        console.log(date)
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

        var currentdate = year + seperator1 + month + seperator1 + strDate+" "+ hour+ ":" + minute + ":" + second;
        return currentdate;
}
function parserDate(date) {  
    var t = Date.parse(date);  
    if (!isNaN(t)) {  
        return new Date(Date.parse(date.replace(/-/g, "/")));  
    } else {  
        return new Date();  
    }  
};  
function getChatId(from,to){
    return [from,to].sort().join('_')
}
function mapIdToName(id,userlist){
    let name = 'default';
    console.log(userlist)
    userlist.map(v=>{
      if(id===v._id){
        name = v.realname
      }
    })
    return name
  }
function mapIdToAvator(id,userlist){
    let avator = 'default';
    userlist.map(v=>{
      if(id===v._id){
        avator = v.avator
      }
    })
    return avator
  }
export {getFormatDate,parserDate,getChatId,mapIdToName,mapIdToAvator}