/**
 * @fileOverview 前后端通用类型枚举
 * @author Max
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var ENUM = {
    action: {
        CONNECT: 'connect',
        DISCONNECT: 'disconnect',
        FIRST_SHAKE_HAND: 'firstShakeHand',
        ONLINE_COUNT: 'onlineCount',
        REAL_ONLINE_COUNT: 'realOnlineCount'
    },
    msgType: {
        reserved: {
            SYSTEM: 'system',
            CONNECTION: 'connection',
            ONLINE_COUNT: 'onlineCount',
            REAL_ONLINE_COUNT: 'realonlineCount'
        },
        defaultType: {
            MSG: 'msg'
        }
    },
    msgContent: {
        FIRST_SHAKE_HAND: 'first shake hand',
        CHANNEL_CONNECTION_SET_UP: 'channel connection set up',
        DISCONNECT: 'disconnect'
    }
};

exports['default'] = ENUM;
module.exports = exports['default'];