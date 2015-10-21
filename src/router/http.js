/**
 * @fileOverview 接收HTTP请求,解析后路由给对应HTTP Action处理，并包装处理结果返回给客户端
 * @author Max
 * created at Wed Jun 11 2014 14:19:57 GMT+0800 (CST)
 */

var httpAction = require('../action/http');


function route(req, res, data) {
    
    // parse request
    var url = require('url')
    var querystring = require('querystring');
    
    var pathname = url.parse(req.url).pathname;
    pathname = pathname.substr(1);
    
    var query;
    if(req.method == 'GET'){//GET方法解析query
        query = querystring.parse(url.parse(req.url).query);
    }else if(req.method == 'POST'){//POST方法解析query
        if(data[0] === '{') { // JSON.stringfy
            try {
                query = JSON.parse(data)
            } catch(e) {
                logger.warn('解析POST query失败', data);
                return;
            }
        } else { // url encode
            query = querystring.parse(data);
        }
    } else {
        return;
    }
    
    logger.log('new', req.method, 'request');
    logger.log('client ip:', req.connection.remoteAddress);
    logger.log('action:', pathname);
    logger.log('query:', JSON.stringify(query));
    
    // route
    var result;
    var actions = {};
    if(req.method == 'GET') {
        actions = httpAction.get;
    } else if(req.method == 'POST') {
        actions = httpAction.post;
    }
    
    if(actions[pathname]) {
        result = actions[pathname](query);
    } else {
        logger.warn('no such action!');
    }
    
    // response
    if(result) {
        res.writeHead(200, {'Content-Type':'text/plain;charset=utf-8'});
        res.write(JSON.stringify(result));
        res.end();
        return true;
    } else {
        return false;
    }
    
}




exports.route = route;