const Router = require('koa-router')
const router = new Router()
var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport')


// 根据请求的 pathname 来 require 相应的模块
// 如 127.0.0.1:5555/test/getData, 会返回 ./test/getData.js 
router.all('*', async (ctx, next)=>{
  // 设置跨域
  setCors(ctx);
  await next()
})


// 进行监控处理
const Web3    = require('web3')
const web3    = typeof Web3 !== 'undefined'? 
                  new Web3(Web3.currentProvider):
                  new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const contract = ((c)=>web3.eth.contract(c.abi).at(c.address))(require('./conf.contract'))

emailConfig = {

}


let from = 'robbwook@gmail.com'
let psw  = 'gg159753'
let to   = '35157375@qq.com'

router.use('/test', async (ctx)=>{
  var nodemailer = require('nodemailer');

  // var transporter = nodemailer.createTransport(({
  //   service: 'gmail',
  //   host: 'smtp.gmail.com',
  //   // secureConnection: true,
  //   port: 465,
  //   auth: {
  //     user: from,
  //     pass: psw
  //   }
  // }));

  var transporter = nodemailer.createTransport('smtps://robbwook%40gmail.com:'+psw+'@smtp.gmail.com');
  
  var mailOptions = {
    from: from,
    to: to,
    subject: 'Sending Email using Node.js[nodemailer]',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  console.log( '收到请求' )
  ctx.body = JSON.stringify({name:'sdf'})
})

// 我们可以用下面的中间件理解app.use(cors({}))
function setCors (ctx) {
  // 允许来自所有域名请求
  ctx.set("Access-Control-Allow-Origin", "*");
  // 这样就能只允许 http://localhost:8080 这个域名的请求了
  // ctx.set("Access-Control-Allow-Origin", "http://localhost:8080"); 

  // 设置所允许的HTTP请求方法
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");

  // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
  ctx.set("Access-Control-Allow-Headers", "x-requested-with, x-access-token, accept, origin, content-type");

  // 服务器收到请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。

  // Content-Type表示具体请求中的媒体类型信息
  ctx.set("Content-Type", "application/json;charset=utf-8");

  // 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。
  // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
  ctx.set("Access-Control-Allow-Credentials", true);

  // 该字段可选，用来指定本次预检请求的有效期，单位为秒。
  // 当请求方法是PUT或DELETE等特殊方法或者Content-Type字段的类型是application/json时，服务器会提前发送一次请求进行验证
  // 下面的的设置只本次验证的有效时间，即在该时间段内服务端可以不用进行验证
  ctx.set("Access-Control-Max-Age", 300);

  /*
  CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：
      Cache-Control、
      Content-Language、
      Content-Type、
      Expires、
      Last-Modified、
      Pragma。
  */
  // 需要获取其他字段时，使用Access-Control-Expose-Headers，
  // getResponseHeader('myData')可以返回我们所需的值
  // ctx.set("Access-Control-Expose-Headers", "myData");
}

module.exports = router
