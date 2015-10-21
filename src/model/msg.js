/**
 * @fileOverview message model
 * @author Max
 * created at 2015-02-04 11:41
 */

var msgDatabase = require('../database/msg');

// 保存消息
var saveMsg = function(channel, msg) {

    return msgDatabase.addMsg(channel, msg);

};

// 获取某个频道的所有缓存消息
var getAllMsg = function(channel) {

    return msgDatabase.getAllMsg(channel);

};

exports.saveMsg = saveMsg;
exports.getAllMsg = getAllMsg;
