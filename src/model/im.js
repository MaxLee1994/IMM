/**
 * @fileOverview Instant Messaging相关Model
 * @author Max
 * created at Sat Sep 27 2014 15:26:33 GMT+0800 (CST)
 */



var broadcast = function(msg, conns) {
    
    try {
        for(var i in conns) {
            conns[i].write(JSON.stringify(msg));
        }
    } catch(e) {
        logger.error('broadcast write error!');
        return false;
    }
    
    return true;
}

exports.broadcast = broadcast;
