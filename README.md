# express-ejs-mongoose-nodejs

# 特性说明

- 实现了登陆
- 实现了注册
- 使用了mongoose
- 使用了express-session做权限控制
- 前端使用bootstrap
- 实现了两种权限控制
    + session权限控制
    + 通过公钥、私钥进行身份认证
- 公钥、私钥身份认证
    + 通过node-rsa类库产生公钥、私钥
    + 客户端持有私钥，通过对发送数据进行私钥加密，传递给服务端
    + 服务端通过公钥进行身份认证，如果通过则提供服务，不通过则拒绝
    + 通过这种方式可以设计系统的开发API

# 运行方式
## 修改配置文件

根据mongodb运行环境修改config.js
- 数据存放db

>exports.dburl = 'mongodb://127.0.0.1/cmsdata';

- session存放db

> exports.dbsession = 'mongodb://localhost/sessiondb';

- 启动mongodb

- 启动应用

> npm install
> npm start

- 访问

http://localhost:3100
