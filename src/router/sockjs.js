/**
 * @fileOverview 注册SockJS客户端handler,接收SockJS客户端请求,
 *               解析并路由给对应SockJS Action处理，并包装处理结果返回给客户端
 * @author Max
 * created at Wed Jun 04 2014 14:10:11 GMT+0800 (CST)
 */

var sockjs = require('sockjs');
var sockjsAction = require('../action/sockjs');
var actionEnum = require('../../js-client/src/fb-common/enum/common').action;

// const
var PREFIX = '/imm';

var install = function(options, server) {
    var msgHandler = sockjs.createServer(options);

    msgHandler.on('connection',function(conn){
        logger.log('[+] connection open ', conn);

        route(actionEnum.FIRST_SHAKE_HAND, conn);

        conn.on('close', function() {
            logger.log('[-] connection close', conn);
            route(actionEnum.DISCONNECT, conn, {conn: conn});
        });
        conn.on('data', function(m) {
            logger.log('[-] connection request', m);

            var param;
            try {
                param = JSON.parse(m);
            } catch(e) {
                logger.warn('parse connection query failed!');
                return;
            }

            param.conn = conn;
            route(param.action, conn, param);
        });
    });

    msgHandler.installHandlers(server,{prefix:PREFIX});
};

// route
function route(path, conn, param) {
    var result;
    if(sockjsAction[path]) {
        result = sockjsAction[path](param);
    } else {
        logger.warn('no such action!');
    }

    if(result) {
        conn.write(JSON.stringify(result));
    } else {
        result = {
            flag: false,
            msg: 'no such action!'
        };
        conn.write(JSON.stringify(result));
    }
}


exports.install = install;
