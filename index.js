const Koa    = require('koa')
const router = require('./base.router')

const koa    = new Koa()


koa.use(router.routes())
   .use(router.allowedMethods())
  
  
koa.listen(7000)
console.log('server runnint at 7000')
