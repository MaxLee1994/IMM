/**
 * @fileOverview 封装SockJS客户端方法，提供适应IMM的更加健壮、简洁的管理
 * @author Max
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _sockjsClient = require('sockjs-client');

var _sockjsClient2 = _interopRequireDefault(_sockjsClient);

var _enum = require('./enum');

var _enum2 = _interopRequireDefault(_enum);

// private
var url, channel, userinfo;
var sockJS;

var connectionFlag = false; // is connection set up or not
var msgCache = []; // msg cache queue

var handlerKeyGen = 0;
var msgHandlers = {}; // handlers whose type = msg
var onlineCountHandlers = {}; // handlers whose type = onlineCount
var realOnlineCountHandlers = {}; // handlers whose type = realOnlineCount
var actionHandlers = {}; // handlers with custom type

var onlineCount = 0;
var realOnlineCount = 0;
var CHECK_ONLINE_COUNT_INTERVAL = 30 * 1000;

var init = function init(urlParam, channelParam) {
    url = urlParam;
    channel = channelParam;
};

exports.init = init;
// call `setUpConnection` before send
var setUpConnection = function setUpConnection(user) {
    if (sockJS) {
        console.warn('connection already set up!');
        return;
    }
    try {
        sockJS = new _sockjsClient2['default'](url);
        sockJS.onopen = onOpen;
        sockJS.onclose = onClose;
        sockJS.onmessage = onMessage;
        userinfo = user;
    } catch (e) {
        console.log(e);
        console.error('init SockJS connection failed!');
        return;
    }
};

exports.setUpConnection = setUpConnection;
var registerMsgHandler = function registerMsgHandler(callback) {
    if (!url || !channel) {
        console.error('imm-client is not initialized!');
        return;
    }

    var key = generateHandlerKey();
    msgHandlers[key] = callback;

    return key;
};

exports.registerMsgHandler = registerMsgHandler;
var registerOnlineCountHandler = function registerOnlineCountHandler(callback) {
    if (!url || !channel) {
        console.error('imm-client is not initialized!');
        return;
    }

    var key = generateHandlerKey();
    onlineCountHandlers[key] = callback;
    callback(onlineCount);

    return key;
};
exports.registerOnlineCountHandler = registerOnlineCountHandler;
var registerRealOnlineCountHandler = function registerRealOnlineCountHandler(callback) {
    if (!url || !channel) {
        console.error('imm-client is not initialized!');
        return;
    }

    var key = generateHandlerKey();
    realOnlineCountHandlers[key] = callback;
    callback(realOnlineCount);

    return key;
};

exports.registerRealOnlineCountHandler = registerRealOnlineCountHandler;
var registerActionHandler = function registerActionHandler(handler) {
    if (!url || !channel) {
        console.error('imm-client is not initialized!');
        return;
    }

    var key = generateHandlerKey();
    actionHandlers[key] = handler;

    return key;
};

exports.registerActionHandler = registerActionHandler;
var unregisterHandler = function unregisterHandler(key) {

    delete msgHandlers[key];
    delete onlineCountHandlers[key];
    delete realOnlineCountHandlers[key];
    delete actionHandlers[key];
};

exports.unregisterHandler = unregisterHandler;
// SockJS object life circle management
function onOpen() {
    console.log('connection open!');
}
function onClose() {
    console.log('connection closed!');
    connectionFlag = false;
}
function onMessage(e) {
    var msg = e.data;

    var json;
    try {
        json = JSON.parse(msg);
    } catch (exception) {
        console.error('wrong format json from node server!');
    }

    // 处理系统信息
    var flag = systemMsgHandler(json);

    // 处理外部注册的信息
    if (!flag) {
        registeredMsgHandler(json);
    }
}
//----------------------------------

function sendMsg(msg, force) {
    if (!connectionFlag && !force) {
        msgCache.push(msg);
        return;
    }
    sockJS.send(msg);
}
function sendConnectionMsg() {
    var msg = createConnectJSON();
    sendMsg(msg, true);
}
function registeredMsgHandler(json) {
    var msgType = _enum2['default'].msgType;

    if (json.flag) {
        switch (json.type) {
            case msgType.defaultType.MSG:
                for (var i in msgHandlers) {
                    if (msgHandlers[i]) {
                        msgHandlers[i](json.content);
                    }
                }
                return true;
            case msgType.reserved.ONLINE_COUNT:
                onlineCount = json.content.count;
                for (var j in onlineCountHandlers) {
                    if (onlineCountHandlers[j]) {
                        onlineCountHandlers[j](onlineCount);
                    }
                }
                return true;
            case msgType.reserved.REAL_ONLINE_COUNT:
                realOnlineCount = json.content.count;
                for (var l in realOnlineCountHandlers) {
                    if (realOnlineCountHandlers[l]) {
                        realOnlineCountHandlers[l](realOnlineCount);
                    }
                }
                return true;
            default:
                for (var k in actionHandlers) {
                    var handler = actionHandlers[k];
                    if (handler.type == json.type && handler.action) {
                        handler.action(json.content);
                        return true;
                    }
                }
        }
    } else {
        console.error(json.msg);
        return true;
    }

    return false;
}
function systemMsgHandler(json) {
    var msgType = _enum2['default'].msgType;
    var msgContent = _enum2['default'].msgContent;

    if (json.flag) {
        switch (json.type) {
            case msgType.reserved.CONNECTION:
                if (json.content.msg == msgContent.FIRST_SHAKE_HAND) {
                    sendConnectionMsg();
                } else if (json.content.msg == msgContent.CHANNEL_CONNECTION_SET_UP) {
                    console.log('init Connection Success!');
                    connectionFlag = true;
                    clearAllMsgCache();

                    // init check for online count
                    initCheckForOnlineCount();
                }
                return true;
            case msgType.reserved.SYSTEM:
                console.log(json);
                return true;
        }
    } else {
        console.error(json.msg);
        return true;
    }

    return false;
}

function clearAllMsgCache() {

    for (var i = 0; i < msgCache.length; i++) {
        sendMsg(msgCache[i]);
    }
    msgCache = [];
}

function createConnectJSON() {
    var actionEnum = _enum2['default'].action;
    var json = {
        action: actionEnum.CONNECT,
        channel: channel,
        userinfo: userinfo
    };
    return JSON.stringify(json);
}

function initCheckForOnlineCount() {
    var actionForOnlineCount = function actionForOnlineCount() {
        var content = {
            action: _enum2['default'].action.ONLINE_COUNT,
            channel: channel
        };
        sendMsg(JSON.stringify(content));
    };
    var actionForRealOnlineCount = function actionForRealOnlineCount() {
        var content = {
            action: _enum2['default'].action.REAL_ONLINE_COUNT,
            channel: channel
        };
        sendMsg(JSON.stringify(content));
    };

    setInterval(actionForOnlineCount, CHECK_ONLINE_COUNT_INTERVAL);
    setInterval(actionForRealOnlineCount, CHECK_ONLINE_COUNT_INTERVAL);

    actionForOnlineCount();
    actionForRealOnlineCount();
}

function generateHandlerKey() {
    var key = handlerKeyGen;
    handlerKeyGen++;

    return key;
}