# 开发Bug记录 

## 1.node中不能解析body请求体
   过程是这样的，我在postman中发送请求体，携带body参数，开始在koa中不能拿到,前提我已经安装了koa-bodyparser第三方库，
   后面也尝试了koa-body(注意：和koa-bodyparser不能一起使用，会有Bug),但是都没能成功，当时我的代码只打印了ctx||ctx.request
   发现都没能打印出body,后面尝试了ctx.request.body发现是能够打印出来，并且sql语句出现了错误，对于表中的字段名称要加``才可以,
    也就是说，控制台隐藏了body的打印

## 2.node现在已经支持了esModule模块化方式，所以在Install 第三方库的时候要注意版本