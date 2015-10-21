/**
 * @fileOverview 在线用户Model
 * @author Max
 * created at Sat Sep 27 2014 10:48:22 GMT+0800 (CST)
 */

var userDatabase = require('../database/user');
var config = require('../utils/config');

// 获得某个频道的全部连接
var getConnsOfChannel = function(channel) {

    var allUsers = userDatabase.getAllUsersOfChannel(channel);

    if(allUsers !== false) {
        var conns = {};
        for(var i in allUsers) {
            conns[i] = allUsers[i].conn;
        }

        return conns;
    } else {
        return false;
    }
};

// 获得某个频道的在线人数
var getOnlineCount = function(channel) {

    return userDatabase.getOnlineCountOfChannel(channel);
};

// 获得某个频道的浮夸后的在线人数
var getGloriousOnlineCount = function(channel) {

    var realCount = userDatabase.getOnlineCountOfChannel(channel);

    if(realCount !== false) {
        var onlineCountConfig = config.load(config.CONFIG_FILE.ONLINE_COUNT_CONFIG, true);
        var base = onlineCountConfig.default.base;
        var ratio = onlineCountConfig.default.ratio;

        if(onlineCountConfig.custom[channel] !== undefined) {
            base = onlineCountConfig.custom[channel].base || base;
            ratio = onlineCountConfig.custom[channel].ratio || ratio;
        }

        return onlineCountGloriousFunction(realCount, base, ratio);
    } else {
        return false;
    }

};

function onlineCountGloriousFunction(input, base, ratio) {

    if(input === 0) {
        return base;
    } else {
        return parseInt((Math.log(input) / Math.log(ratio)) * input + 1 + base, 10);
    }

}

// 新增用户
var addUser = function(channel, conn, userinfo) {

    if(userDatabase.userExists(channel, conn.id)) {
        return false;
    }
    if(!userDatabase.channelExists(channel)) {
        userDatabase.addChannel(channel);
    }

    userDatabase.addUser(channel, conn, userinfo);

    return true;
};

// 删除用户
var deleteUser = function(conn) {

    return userDatabase.deleteUser(conn.id);

};

// 更新某个用户的信息
var updateUserInfo = function(channel, conn, userinfo) {

    return userDatabase.updateUser(channel, conn.id, userinfo);

};


exports.getConnsOfChannel = getConnsOfChannel;
exports.getOnlineCount = getOnlineCount;
exports.getGloriousOnlineCount = getGloriousOnlineCount;
exports.addUser = addUser;
exports.deleteUser = deleteUser;
exports.updateUserInfo = updateUserInfo;
