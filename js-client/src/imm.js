/**
 * @fileOverview 封装SockJS客户端方法，提供适应IMM的更加健壮、简洁的管理
 * @require SockJS?ver=0.3
 * @author Max
 * created at Thu Jun 05 2014 09:59:58 GMT+0800 (CST)
 */



    var SockJS = require('./sockjs-0.3');
    var enumCommon = require('./fb-common/enum/common');

    // private
    var url, channel, userinfo;
    var sockJS;

    var connectionFlag = false;// is connection set up or not
    var msgCache = [];// msg cache queue

    var handlerKeyGen = 0;
    var msgHandlers = {};// handlers whose type = msg
    var onlineCountHandlers = {};// handlers whose type = onlineCount
    var realOnlineCountHandlers = {};// handlers whose type = realOnlineCount
    var actionHandlers = {};// handlers with custom type

    var onlineCount = 0;
    var realOnlineCount = 0;
    var CHECK_ONLINE_COUNT_INTERVAL = 30 * 1000;

    var init = function(urlParam, channelParam) {
        url = urlParam;
        channel = channelParam;
    };

    // call `setUpConnection` before send
    var setUpConnection = function (user){
        if(sockJS) {
            console.warn('connection already set up!');
            return;
        }
        try{
            sockJS = new SockJS(url);
            sockJS.onopen = onOpen;
            sockJS.onclose = onClose;
            sockJS.onmessage = onMessage;
            userinfo = user;
        }catch(e){
            console.log(e);
            console.error('init SockJS connection failed!');
            return;
        }
    };

    var registerMsgHandler = function(callback){
        if(!url || !channel) {
            console.error('imm-client is not initialized!');
            return;
        }

        var key = generateHandlerKey();
        msgHandlers[key] = callback;

        return key;
    };

    var registerOnlineCountHandler = function(callback) {
        if(!url || !channel) {
            console.error('imm-client is not initialized!');
            return;
        }

        var key = generateHandlerKey();
        onlineCountHandlers[key] = callback;
        callback(onlineCount);

        return key;
    };
    var registerRealOnlineCountHandler = function(callback) {
        if(!url || !channel) {
            console.error('imm-client is not initialized!');
            return;
        }

        var key = generateHandlerKey();
        realOnlineCountHandlers[key] = callback;
        callback(realOnlineCount);

        return key;
    };

    var registerActionHandler = function(handler) {
        if(!url || !channel) {
            console.error('imm-client is not initialized!');
            return;
        }

        var key = generateHandlerKey();
        actionHandlers[key] = handler;

        return key;
    };

    var unregisterHandler = function(key) {

        delete msgHandlers[key];
        delete onlineCountHandlers[key];
        delete realOnlineCountHandlers[key];
        delete actionHandlers[key];

    };


    // SockJS object life circle management
    function onOpen(){
        console.log('connection open!');
    }
    function onClose(){
        console.log('connection closed!');
        connectionFlag = false;
    }
    function onMessage(e){
        var msg = e.data;

        var json;
        try{
            json = JSON.parse(msg);
        } catch(exception) {
            console.error('wrong format json from node server!');
        }

        // 处理系统信息
        var flag = systemMsgHandler(json);

        // 处理外部注册的信息
        if(!flag) {
            registeredMsgHandler(json);
        }

    }
    //----------------------------------


    function sendMsg(msg, force) {
        if(!connectionFlag && !force) {
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
        var msgType = enumCommon.msgType;

        if(json.flag) {
            switch(json.type) {
                case msgType.defaultType.MSG:
                    for(var i in msgHandlers) {
                        if(msgHandlers[i]) {
                            msgHandlers[i](json.content);
                        }
                    }
                    return true;
                case msgType.reserved.ONLINE_COUNT:
                    onlineCount = json.content.count;
                    for(var j in onlineCountHandlers) {
                        if(onlineCountHandlers[j]) {
                            onlineCountHandlers[j](onlineCount);
                        }
                    }
                    return true;
                case msgType.reserved.REAL_ONLINE_COUNT:
                    realOnlineCount = json.content.count;
                    for(var l in realOnlineCountHandlers) {
                        if(realOnlineCountHandlers[l]) {
                            realOnlineCountHandlers[l](realOnlineCount);
                        }
                    }
                    return true;
                default:
                    for(var k in actionHandlers) {
                        var handler = actionHandlers[k];
                        if(handler.type == json.type && handler.action) {
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
        var msgType = enumCommon.msgType;
        var msgContent = enumCommon.msgContent;

        if(json.flag) {
            switch(json.type) {
                case msgType.reserved.CONNECTION:
                    if(json.content.msg == msgContent.FIRST_SHAKE_HAND) {
                        sendConnectionMsg();
                    } else if(json.content.msg == msgContent.CHANNEL_CONNECTION_SET_UP) {
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

        for(var i=0;i<msgCache.length;i++) {
            sendMsg(msgCache[i]);
        }
        msgCache = [];

    }

    function createConnectJSON() {
        var actionEnum = enumCommon.action;
        var json = {
            action : actionEnum.CONNECT,
            channel : channel,
            userinfo: userinfo
        };
        return JSON.stringify(json);
    }

    function initCheckForOnlineCount() {
        var actionForOnlineCount = function() {
            var content = {
                action: enumCommon.action.ONLINE_COUNT,
                channel: channel
            };
            sendMsg(JSON.stringify(content));
        };
        var actionForRealOnlineCount = function() {
            var content = {
                action: enumCommon.action.REAL_ONLINE_COUNT,
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


exports.init = init;
exports.setUpConnection = setUpConnection;
exports.registerMsgHandler = registerMsgHandler;
exports.registerOnlineCountHandler = registerOnlineCountHandler;
exports.registerRealOnlineCountHandler = registerRealOnlineCountHandler;
exports.registerActionHandler = registerActionHandler;
exports.unregisterHandler = unregisterHandler;
