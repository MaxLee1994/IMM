/**
 * @fileOverview 服务器入口
 * @author Max
 * created at Wed Jun 04 2014 14:00:09 GMT+0800 (CST)
 */

/**
 * @modules
 */
var http            = require('http');
var sockjsAPP       = require('./src/router/sockjs');
var nodeStatic      = require('node-static');
var httpAPP         = require('./src/router/http');
var BufferHelper    = require('bufferhelper');
var config = require('./src/utils/config');
var util = require('util');


// global modules
global.globalConfig = config.load(config.CONFIG_FILE.GLOBAL_CONFIG);

// logger
var logM = require('logm');
logM.configure(config.CONFIG_FILE.LOGM_CONFIG);
global.logger = logM.getLogger('imm');


// memory usage
if(globalConfig.memoryMonitor) {
    var action = function() {
        logger.log('memory usage:', util.inspect(process.memoryUsage()));
    };
    setInterval(action, 10000);
}


// Static files server
var static_directory = new nodeStatic.Server(__dirname);

// Usual http stuff
var server = http.createServer(function(req, res){
    req.setEncoding('utf-8');

    var buffer = new BufferHelper(); //POST
    // receive data block
    req.addListener("data", function (dataChunk) {
        buffer.concat(dataChunk);
    });
    // 数据接收完毕，执行回调函数
    req.addListener("end", function () {
        var flag = httpAPP.route(req, res, buffer.toBuffer().toString());

        if(!flag) {
            static_directory.serve(req, res);
        }
    });
});

// sockjs server
var sockjs_opts = {
    sockjs_url: "http://cdn.sockjs.org/sockjs-0.3.min.js"
};
sockjsAPP.install(sockjs_opts, server);

logger.log(' [*] Listening on port:' + globalConfig.immPort);
server.listen(globalConfig.immPort);
