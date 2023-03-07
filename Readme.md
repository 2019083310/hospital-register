# 开发Bug记录 

## 1.node中不能解析body请求体
   过程是这样的，我在postman中发送请求体，携带body参数，开始在koa中不能拿到,前提我已经安装了koa-bodyparser第三方库，
   后面也尝试了koa-body(注意：和koa-bodyparser不能一起使用，会有Bug),但是都没能成功，当时我的代码只打印了ctx||ctx.request
   发现都没能打印出body,后面尝试了ctx.request.body发现是能够打印出来，并且sql语句出现了错误，对于表中的字段名称要加``才可以,
    也就是说，控制台隐藏了body的打印

## 2.node现在已经支持了esModule模块化方式，所以在Install 第三方库的时候要注意版本

## 3.在使用element-plus的时候，使用按需引入的方式，但是不能正常使用ElMessage和ElMessageBox组件
  经过查阅资料发现，如果使用全局引入的方式，还会引入样式文件，但是按需引入并没有引入样式文件，所以没有生效
  另外，其他的组件是作为组件来使用，ElMessage是通过函数来调用，所以要通过app.use()实现全局注册
  解决办法就是，引入'element-plus/theme-chalk/el-message.css'文件