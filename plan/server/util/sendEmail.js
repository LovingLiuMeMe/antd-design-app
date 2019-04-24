const ejs = require('ejs');
const fs  = require('fs');
const path = require('path');

const nodemailer = require('nodemailer');
const sendEmail = (prop)=>{
    console.log('__dirname',__dirname)
    console.log('prop',prop)
    let transporter = nodemailer.createTransport({
        //host: 'smtp.126.com',
        service: '126', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
        port: 465, // SMTP 端口
        secureConnection: true, // 使用了 SSL
        auth: {
          user: 'lovingliu@126.com',
          // 这里密码不是qq密码，是你设置的smtp授权码
          pass: 'liubo1995828',
        }
      });
      const template = ejs.compile(fs.readFileSync(path.resolve(__dirname, 'email.ejs'), 'utf8'));
      const html = template({
        author:prop.author,
        deal:prop.deal,
        level:prop.level,
        title: prop.title,
        content: prop.content,
        signdate: prop.signdate
      });
      let mailOptions = {
        from: '"来自 HelloPlan " <lovingliu@126.com>', // sender address
        to: prop.to, // list of receivers
        subject: '邮箱题目', // Subject line
        html: html // html body
      };
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {    
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
      });
}
module.exports = sendEmail