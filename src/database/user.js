/**
 * @fileOverview 在线频道与用户数据库
 * @author Max
 * created at Wed Jun 04 2014 14:35:28 GMT+0800 (CST)
 */


var Channels = {};
var ChannelLength = {};

// 新增频道

var addChannel = function(channelID) {

    if(!channelExists(channelID)) {
        Channels[channelID] = {};
        ChannelLength[channelID] = 0;

        return true;
    } else {
        return false;
    }
};

// 新增用户

var addUser = function(channelID, conn, userinfo) {

    if(userExists(channelID, conn.id)) {
        return false;
    }

    Channels[channelID][conn.id] = newUser(conn, userinfo, channelID);
    ChannelLength[channelID]++;
};

// 删除频道

var deleteChannel = function(channelID) {

    if(channelExists(channelID)) {
        delete Channels[channelID];
        delete ChannelLength[channelID];

        return true;
    } else {
        return false;
    }
};

// 删除用户

var deleteUser = function(userID) {

    for(var id in Channels) {
        if(Channels[id][userID] !== undefined) {
            var obj = Channels[id][userID];

            delete Channels[id][userID];
            ChannelLength[id]--;

            return obj;
        }
    }

    return false;
};

// 更改用户信息

var updateUser = function(channelID, connID, userinfo) {

    if(!userExists(channelID, connID)) {
        return false;
    }

    for(var key in userinfo) {
        Channels[channelID][connID][key] = userinfo[key] || Channels[channelID][connID][key];
    }

    return true;
};

// 获取某个频道所有用户

var getAllUsersOfChannel = function(channelID) {

    if(channelExists(channelID)) {
        return Channels[channelID];
    } else {
        return false;
    }
};

// 获取某个频道在线人数

var getOnlineCountOfChannel = function(channelID) {

    if(channelExists(channelID)) {
        return ChannelLength[channelID];
    } else {
        return false;
    }
};

// 频道是否存在

var channelExists = function(channelID) {
    if(Channels[channelID] === undefined) {
        return false;
    }
    return true;
};

// 用户是否存在

var userExists = function(channelID, connID) {
    if(Channels[channelID] === undefined || Channels[channelID][connID] === undefined) {
        return false;
    }
    return true;
};

// 构造用户对象

function newUser(conn, userinfo, channelID) {
    var newObj = {
        conn: conn,
        uid: userinfo.uid,
        type: userinfo.type,
        useragent: userinfo.useragent,
        channel: channelID
    };
    return newObj;
}


exports.addChannel = addChannel;
exports.addUser = addUser;
exports.deleteChannel = deleteChannel;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.getAllUsersOfChannel = getAllUsersOfChannel;
exports.getOnlineCountOfChannel = getOnlineCountOfChannel;
exports.channelExists = channelExists;
exports.userExists = userExists;
