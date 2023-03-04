const KoaRouter=require('koa-router')

const adminRouter=new KoaRouter({
  prefix:'/admin'
})

// ?测试跨域
adminRouter.get('/test',(ctx,next)=>{
  ctx.body='cors successful'
})

module.exports=adminRouter