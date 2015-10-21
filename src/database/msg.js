/**
 * @fileOverview 消息缓存数据库
 * @author Max
 * created at 2015-02-04 11:45
 */

var Channels = {}; // {channel: msgArray}

var config = require('../utils/config');
var MSG_CACHE_MAX_COUNT = config.load(config.CONFIG_FILE.GLOBAL_CONFIG).msgCacheMaxCount;

// 增加消息
var addMsg = function(channel, msg) {

    if(Channels[channel] === undefined) {
        Channels[channel] = [];
    }

    Channels[channel].push(msg);

    if(Channels[channel].length > MSG_CACHE_MAX_COUNT) {
        Channels[channel].shift();
    }

    return true;
};

// 获得某个频道所有消息
var getAllMsg = function(channel) {

    if(Channels[channel] === undefined) {
        return false;
    }

    return Channels[channel];
};

exports.addMsg = addMsg;
exports.getAllMsg = getAllMsg;
