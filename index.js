const Koa    = require('koa')
const router = require('./base.router')

const koa    = new Koa()

koa.use(router.routes())
.use(router.allowedMethods())


const port   = 3100
koa.listen(port)
console.log('server runnint at '+port)
