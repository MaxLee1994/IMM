/**
 * @fileOverview IMM http interface test suite
 * @author Max
 * created at Sun Sep 28 2014 15:22:12 GMT+0800 (CST)
 */


describe('HTTP INTERFACE: broadcast', function(){

    it('normal msg', function(done) {
        var content = {
            channel: IMM_CHANMEL,
            type: 'msg',
            msg: {
                speaker: '2',
                msg: 'haha'
            }
        };
        var expected = {
            flag: true,
            type: 'system'
        };

        post(HTTP_BROADCAST_URL, content, function(data) {
            expect(data).to.eql(expected);
            done();
        });
    });

    it('error channel', function(done) {
        var content = {
            channel: IMM_CHANMEL - 1,
            type: 'msg',
            msg: {
                speaker: '2',
                msg: 'haha'
            }
        };
        // expected
        var expected = {
            flag: false,
            msg: '不存在该Channel'
        };
        post(HTTP_BROADCAST_URL, content, function(data) {
            expect(data).to.eql(expected);
            done();
        });

    });

    it('empty msg', function(done) {
        var content = {
            channel: IMM_CHANMEL,
            type: 'msg'
        };
        // expected
        var expected = {
            flag: false,
            msg: 'msg不能为空'
        };
        post(HTTP_BROADCAST_URL, content, function(data) {
            expect(data).to.eql(expected);
            done();
        });

    });

    it('reserved msg type: system', function(done) {
        var content = {
            channel: IMM_CHANMEL,
            type: 'system',
            msg: {
                speaker: '2',
                msg: 'haha'
            }
        };
        // expected
        var expected = {
            flag: false,
            msg: '不能广播系统保留type'
        };
        post(HTTP_BROADCAST_URL, content, function(data) {
            expect(data).to.eql(expected);
            done();
        });

    });

    it('reserved msg type: connection', function(done) {
        var content = {
            channel: IMM_CHANMEL,
            type: 'connection',
            msg: {
                speaker: '2',
                msg: 'haha'
            }
        };
        // expected
        var expected = {
            flag: false,
            msg: '不能广播系统保留type'
        };
        post(HTTP_BROADCAST_URL, content, function(data) {
            expect(data).to.eql(expected);
            done();
        });

    });

    it('reserved msg type: onlineCount', function(done) {
        var content = {
            channel: IMM_CHANMEL,
            type: 'onlineCount',
            msg: {
                speaker: '2',
                msg: 'haha'
            }
        };
        // expected
        var expected = {
            flag: false,
            msg: '不能广播系统保留type'
        };
        post(HTTP_BROADCAST_URL, content, function(data) {
            expect(data).to.eql(expected);
            done();
        });

    });

    it('wrong msg format', function(done) {
        var content = {
            channel: IMM_CHANMEL,
            type: 'msg',
            msg: 'I am a string'
        };
        // expected
        var expected = {
            flag: false,
            msg: 'msg格式错误'
        };
        post(HTTP_BROADCAST_URL, content, function(data) {
            expect(data).to.eql(expected);
            done();
        });

    });

    it('saveMsg', function(done) {
        var content = {
            channel: IMM_CHANMEL,
            type: 'msg',
            msg: {
                speaker: '2',
                msg: 'haha'
            },
            saveMsg: true
        };
        var expected = {
            flag: true,
            type: 'system'
        };

        post(HTTP_BROADCAST_URL, content, function(data) {
            expect(data).to.eql(expected);
            done();
        });
    });

});


describe('HTTP INTERFACE: onlineCount', function() {

    it('normal', function(done) {
        var content = {
            channel: IMM_CHANMEL
        };
        // expected
        var expected = {
            flag: true,
            type: 'onlineCount',
            content: {
                count: 1
            }
        };
        get(HTTP_ONLINE_COUNT_URL + '?channel=' + IMM_CHANMEL, function(data) {
            expect(data).to.be.an('object');
            expect(data.content.count).to.be.a('number');
            console.log('真实在线人数:' + data.content.count);
            done();
        });
    });

    it('error channel', function(done) {
        var content = {
            channel: IMM_CHANMEL - 1
        };
        // expected
        var expected = {
            flag: false,
            msg: '不存在该Channel'
        };
        get(HTTP_ONLINE_COUNT_URL + '?channel=' + (IMM_CHANMEL-1), function(data) {
            expect(data).to.eql(expected);
            done();
        });
    });
});

describe('HTTP INTERFACE: gloriousOnlineCount', function() {

    it('normal', function(done) {
        var content = {
            channel: IMM_CHANMEL
        };
        // expected
        var expected = {
            flag: true,
            type: 'onlineCount',
            content: {
                count: 1
            }
        };
        get(HTTP_GLORIOUS_ONLINE_COUNT_URL + '?channel=' + IMM_CHANMEL, function(data) {
            expect(data).to.be.an('object');
            expect(data.content.count).to.be.a('number');
            console.log('浮夸在线人数:' + data.content.count);
            done();
        });
    });

    it('error channel', function(done) {
        var content = {
            channel: IMM_CHANMEL - 1
        };
        // expected
        var expected = {
            flag: false,
            msg: '不存在该Channel'
        };
        get(HTTP_GLORIOUS_ONLINE_COUNT_URL + '?channel=' + (IMM_CHANMEL-1), function(data) {
            expect(data).to.eql(expected);
            done();
        });
    });
});

describe('HTTP INTERFACE: getAllMsg', function() {

    it('normal', function(done) {

        get(HTTP_GET_ALL_MSG_URL + '?channel=' + IMM_CHANMEL, function(data) {
            expect(data.content).to.be.an('array');
            console.log('缓存消息数:', data.content.length);
            console.log('缓存消息:', data.content);
            done();
        });
    });

    it('maxCount', function(done) {
        this.timeout(20 * 1000);

        var content = {
            channel: IMM_CHANMEL,
            type: 'msg',
            msg: {
                speaker: '2',
                msg: 'haha'
            },
            saveMsg: true
        };

        var maxCount = config.msgCacheMaxCount;
        var count = maxCount + 5;

        var action = function() {
            post(HTTP_BROADCAST_URL, content, function() {
                count--;
                if(count > 0) {
                    action();
                } else {
                    get(HTTP_GET_ALL_MSG_URL + '?channel=' + IMM_CHANMEL, function(data) {
                        expect(data.content).to.be.an('array');
                        expect(data.content.length).to.eql(maxCount);
                        done();
                    });
                }
            });
        };

        action();

    });
});
