/**
 * @fileOverview create formatted result obj
 * @author Max
 * created at Sat Sep 27 2014 15:37:21 GMT+0800 (CST)
 */

// success result obj
var success = function(type, content) {
    var result = {
        flag: true,
        type: type,
        content: content
    };

    return result;
};

// error result obj
var error = function(msg) {
    var result = {
        flag: false,
        msg: msg
    };

    return result;
};

// plain success result obj
var plainSuccess = function(content) {
    var result = {
        flag: true,
        content: content
    };

    return result;
};


exports.success = success;
exports.error = error;
exports.plainSuccess = plainSuccess;
