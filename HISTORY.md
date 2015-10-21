# History

---

## 0.1.0

实现IMM Server与IMM client之间的通讯

## 0.2.0

增加IMM Server HTTP访问接口

## 0.2.1

修改IMM Server与IMM client通信协议，合并所有连接消息的type为connection

## 0.2.2

升级spm到3.1.0，修改代码组织结构以适应CommonJS规范

## 0.2.3

增加broadcastaction接口

## 0.2.4

更换日志模块，从log4js到自主开发的logm

## 0.2.5

增加客户端获取当前频道在线人数接口

## 0.2.6

修改直播动作逻辑，新增HTTP通知远程服务器功能

## 0.3.0

重构IMM，采用更清晰的MVC架构
搭建全新测试框架，采用Mocha + Expect.js在浏览器环境下进行HTTP接口和IMM-Client功能测试

## 0.3.1

增加针对SockJS客户端的在线人数浮夸化接口

## 0.3.2

修改服务器配置读取策略，增加针对不同频道的在线人数个性化配置（允许缓存式与非缓存式配置读取策略）

## 0.3.3

在broadcast接口增加缓存消息参数，可缓存一定条数的最近聊天消息  
同时增加获取某个频道缓存消息的接口
