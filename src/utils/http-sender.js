/**
 * @fileOverview package node http request method
 * @author Max
 * created at Fri Sep 12 2014 10:12:12 GMT+0800 (CST)
 */

var http = require('http');
var querystring = require('querystring');

// post
function post(options, content, callback) {
    options.method = 'POST';
    options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': content.length
    };
    
    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            
            data += chunk;
            
        }).on('end', function() {
            callback(data);
        })
    })
    
    req.write(content + '\n');
    req.end();
}

exports.post = post;