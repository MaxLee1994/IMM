/**
 * @fileOverview HTTP Action集合
 * @author Max
 * created at Sat Sep 27 2014 10:26:50 GMT+0800 (CST)
 */

var userModel = require('../model/user');
var imModel = require('../model/im');
var msgModel = require('../model/msg');
var msgTypeEnum = require('../../js-client/src/fb-common/enum/common').msgType;
var mailEnum = require('../enum/mail');
var resultCreator = require('../utils/result-creator');

// 广播
var broadcast = function(param) {
    // attack
    var conns = userModel.getConnsOfChannel(param.channel);

    // validation
    if(!conns) {
        logger.warn('response:', '不存在该channel');
        return resultCreator.error('不存在该Channel');
    }
    if(!param.msg) {
        logger.warn('response:', 'msg不能为空');
        return resultCreator.error('msg不能为空');
    }
    for(var i in msgTypeEnum.reserved) {
        if(msgTypeEnum.reserved[i] == param.type) {
            logger.warn('response:', '不能广播系统保留type');
            return resultCreator.error('不能广播系统保留type');
        }
    }

    // broadcast
    var content;
    try {
        if(typeof param.msg != 'object') {
            content = JSON.parse(param.msg);
        } else {
            content = param.msg;
        }
    } catch(e) {
        logger.warn('response', 'msg格式错误');
        return resultCreator.error('msg格式错误');
    }

    var msg = resultCreator.success(param.type, content);

    var flag = imModel.broadcast(msg, conns);

    // write messages
    if(param.saveMsg) {
        var saveMsgFlag = msgModel.saveMsg(param.channel, content);
        if(saveMsgFlag) {
            logger.log('保存消息成功');
        } else {
            logger.error('保存消息失败');
        }
    }

    // return
    if(flag) {
        logger.log('response:', '广播成功');
        return resultCreator.success(msgTypeEnum.reserved.SYSTEM);
    } else {
        logger.notifyMaintainer(mailEnum.MAINTAINER,
                                'broadcast to channel ' + param.channel + ' error!',
                                msg);
        return resultCreator.error('广播失败');
    }
};

// 获取在线人数
var onlineCount = function(param) {
    // attack
    var count = userModel.getOnlineCount(param.channel);

    // validation
    if(count === false) {
        logger.warn('response:', '不存在该channel');
        return resultCreator.error('不存在该Channel');
    }

    logger.log('response:', count);
    var result = resultCreator.success(msgTypeEnum.reserved.ONLINE_COUNT, {count: count});
    return result;
};

// 获取浮夸在线人数
var gloriousOnlineCount = function(param) {
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

// 获取所有缓存消息
var getAllMsg = function(param) {

    var messages = msgModel.getAllMsg(param.channel);

    var result;
    if(messages) {
        result = resultCreator.plainSuccess(messages);
    } else {
        result = resultCreator.error('该频道没有任何缓存消息');
        logger.error('该频道没有任何缓存消息');
    }

    return result;
};

exports.post = {
    broadcast: broadcast
};
exports.get = {
    onlineCount: onlineCount,
    gloriousOnlineCount: gloriousOnlineCount,
    getAllMsg: getAllMsg
};
