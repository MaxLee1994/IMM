# History

---

## 0.1.0

实现与IMM Server建立连接并通信，以及客户端的连接生命周期管理

## 0.1.1

bug fix

## 0.1.2

修改通信协议，将所有与连接相关的消息的type均改为connection

## 0.1.3

升级spm到3.1.0，修改代码组织结构以适应CommonJS规范

## 0.1.4

修改imm.js为单例模式

## 0.1.5

增加获取当前Channel在线人数接口

## 0.1.6

增加收听直播action接口

## 0.2.0

更新接口以适应IMM0.3

## 0.2.1

增加realOnlineCountHandler（真实在线人数）接口

## 0.2.2

增加unregisterHandler接口，并在所有注册Handler接口中返回Handler对应的Key，用以unregister
