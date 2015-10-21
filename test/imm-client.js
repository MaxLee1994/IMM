/**
 * @fileOverview IMM client test suite
 * @author Max
 * created at Mon Sep 29 2014 16:04:33 GMT+0800 (CST)
 */

describe('IMM-Client onMessage: msg', function() {
    it('normal msg', function(done) {
        var expected = {
            speaker: '2',
            msg: 'memeda'
        };
        var content = {
            channel: IMM_CHANMEL,
            type: 'msg',
            msg: expected
        };

        imm.registerMsgHandler(function(data) {
            expect(data).to.eql(expected);
            done();
        });
        post(HTTP_BROADCAST_URL, content);
    });
});

describe('IMM-Client onMessage: realOnlineCount', function() {
    it('interval', function(done) {
        this.timeout(40 * 1000);

        imm.registerRealOnlineCountHandler(function(data) {
            expect(data).to.be.a('number');
            console.log('imm真实在线人数:' + data);
            done();
        });

    });
});

describe('IMM-Client onMessage: onlineCount', function() {
    it('interval', function(done) {
        this.timeout(40 * 1000);

        imm.registerOnlineCountHandler(function(data) {
            expect(data).to.be.a('number');
            console.log('imm虚假在线人数:' + data);
            done();
        });

    });
});

describe('IMM-Client onMessage: any other type', function() {
    it('normal msg', function(done) {
        var expected = {
            speaker: '2',
            msg: 'memeda'
        };
        var content = {
            channel: IMM_CHANMEL,
            type: 'bullet',
            msg: expected
        };

        imm.registerActionHandler({
            type: 'bullet',
            action: function(data) {
                expect(data).to.eql(expected);
                done();
            }
        });
        post(HTTP_BROADCAST_URL, content);
    });
});

describe('IMM-Client unregisterHandler', function() {
    it('unregister msgHandler', function(done) {
        var msgHandlerKey;
        msgHandlerKey = imm.registerMsgHandler(function() {
            expect(false).to.be.ok();
        });

        imm.unregisterHandler(msgHandlerKey);

        var content = {
            channel: IMM_CHANMEL,
            type: 'msg',
            msg: {
                speaker: '2',
                msg: 'memeda'
            }
        };

        post(HTTP_BROADCAST_URL, content);

        var action = function() {
            expect(true).to.be.ok();
            done();
        };
        setTimeout(action, 1800);
    });
    it('unregister actionHandler', function(done) {
        var actionHandlerKey;
        actionHandlerKey = imm.registerActionHandler({
            type: 'bullet',
            action: function(data) {
                expect(false).to.be.ok();
            }
        });

        imm.unregisterHandler(actionHandlerKey);

        var expected = {
            speaker: '2',
            msg: 'memeda'
        };
        var content = {
            channel: IMM_CHANMEL,
            type: 'bullet',
            msg: expected
        };

        post(HTTP_BROADCAST_URL, content);

        var action = function() {
            expect(true).to.be.ok();
            done();
        };
        setTimeout(action, 1800);
    });
});
