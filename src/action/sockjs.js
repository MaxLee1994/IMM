/**
 * @fileOverview SockJS Action集合
 * @author Max
 * created at Sat Sep 27 2014 16:32:48 GMT+0800 (CST)
 */

var userModel = require('../model/user');
var resultCreator = require('../utils/result-creator');
var msgTypeEnum = require('../../js-client/src/fb-common/enum/common').msgType;
var msgContentEnum = require('../../js-client/src/fb-common/enum/common').msgContent;
var httpSender = require('../utils/http-sender');
var querystring = require('querystring');

// 第一次握手, 确保连接已经建立
var firstShakeHand = function() {
    return resultCreator.success(msgTypeEnum.reserved.CONNECTION,
                                 {msg: msgContentEnum.FIRST_SHAKE_HAND});
};

// 建立与某个Channel的连接，开始接收广播
var connect = function(param) {

    // validation
    if(!param.channel) {
        logger.warn('response:', 'channel不能为空!');
        return resultCreator.error('channel不能为空!');
    }
    if(!param.conn) {
        logger.warn('response:', 'conn不能为空!');
        return resultCreator.error('conn不能为空!');
    }
    if(!param.userinfo) {
        logger.warn('response:', 'userinfo不能为空!');
        return resultCreator.error('userinfo不能为空!');
    }
    if(param.userinfo.uid === undefined) {
        logger.warn('response:', 'userinfo.uid不能为空!');
        return resultCreator.error('userinfo.uid不能为空!');
    }

    var flag = userModel.addUser(param.channel, param.conn, param.userinfo);

    if(flag) {
        logger.log('response:', '成功连接到Channel', param.channel);
        sendConnectToServer(param.channel, param.conn, param.userinfo);
        return resultCreator.success(msgTypeEnum.reserved.CONNECTION,
                                     {msg: msgContentEnum.CHANNEL_CONNECTION_SET_UP});
    } else {
        return resultCreator.error('不能重复连接某个频道');
    }
};

// 断开连接
var disconnect = function(param) {

    var user = userModel.deleteUser(param.conn);

    if(user) {
        sendDisconnectToServer(user);
        logger.log('response:', '成功断开连接');
        return resultCreator.success(msgTypeEnum.reserved.CONNECTION,
                                     {msg: msgContentEnum.DISCONNECT});
    } else {
        return resultCreator.error('不存在该连接');
    }

};

// 获得浮夸在线人数
var onlineCount = function(param) {
    // attack
    var count = userModel.getGloriousOnlineCount(param.channel);

    // validation
    if(count === false) {
        logger.warn('response:', '不存在该channel');
        return resultCreator.error('不存在该Channel');
    }

    logger.log('response:', count);
    var result = resultCreator.success(msgTypeEnum.reserved.ONLINE_COUNT, {count: count});
    return result;
};

// 获得真实在线人数

var realOnlineCount = function(param) {
    // attack
    var count = userModel.getOnlineCount(param.channel);

    // validation
    if(count === false) {
        logger.warn('response:', '不存在该channel');
        return resultCreator.error('不存在该Channel');
    }

    logger.log('response:', count);
    var result = resultCreator.success(msgTypeEnum.reserved.REAL_ONLINE_COUNT, {count: count});
    return result;
};

// 向服务器发送用户离开信息
function sendDisconnectToServer(obj) {
    var content = querystring.stringify({
        rid: obj.rid
    });
    var options = {
        host: globalConfig.vzhiboHost,
        port: globalConfig.vzhiboPort,
        path: '/record/recordleaveeventpage'
    };
    logger.debug('sendDisconnectToServer Request:', content);

    httpSender.post(options, content, function(data) {
        logger.log('sendDisconnectToServer Response:', data);
    });
}

// 向服务器发送用户进入信息
function sendConnectToServer(channel, conn, userinfo) {
    var content = querystring.stringify({
        ip: conn.remoteAddress,
        uid: userinfo.uid,
        eid: channel,
        type: userinfo.type,
        useragent: userinfo.useragent
    });
    var options = {
        host: globalConfig.vzhiboHost,
        port: globalConfig.vzhiboPort,
        path: '/record/recordentereventpage'
    };
    logger.debug('sendConnectToServer Request:', content);

    httpSender.post(options, content, function(data) {
        logger.log('sendConnectToServer Response:', data);
        var json;
        try {
            json = JSON.parse(data);
        } catch(e) {
            logger.error('sendConnectToServer response format error!');
            return;
        }

        if(json.flag) {
            userModel.updateUserInfo(channel, conn, {
                rid: json.content.rid
            });
        } else {
            logger.error(JSON.stringify(content), '用户进入请求失败');
        }
    });
}

exports.firstShakeHand = firstShakeHand;
exports.connect = connect;
exports.disconnect = disconnect;
exports.onlineCount = onlineCount;
exports.realOnlineCount = realOnlineCount;
