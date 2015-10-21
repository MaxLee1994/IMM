/**
 * @fileOverview chat page
 * @author Max
 * created at 2015-01-30 16:09
 */

var imm = require('../js-client/src/imm');

var IMM_URL = '/imm';
var IMM_CHANNEL = '13951893509';
var HTTP_BROADCAST_URL = '/broadcast';
var HTTP_GET_ALL_MSG_URL = '/getAllMsg';

var init = function() {
    initCacheMsg();
    initIMM();
    registerEvents();
};

function initCacheMsg() {
    $.get(HTTP_GET_ALL_MSG_URL + '?channel=' + IMM_CHANNEL, function(data) {
        console.log(data);
        var json = JSON.parse(data);

        if(json.flag) {
            var msgs = json.content;
            for(var i in msgs) {
                var $msg = generateMsgObj(msgs[i]);
                $('#msg-ul').prepend($msg);
            }
        }
    });
}

function initIMM() {
    imm.init(IMM_URL, IMM_CHANNEL);
    imm.setUpConnection({
        uid: 5
    });
}
function registerEvents() {

    imm.registerMsgHandler(onMsg);

    $('#text-input').keydown(function(e) {
        if(e.which === 13) {
            if($('#text-input').val() === '') return;

            sendMsg($('#text-input').val());
        }
    });
}

function onMsg(data) {

    var $msg = generateMsgObj(data);

    if($('[data-timestamp=' + data.timestamp + ']').size() === 0) {
        $('#msg-ul').prepend($msg);
    }
}

function sendMsg(text) {

    var content = {
        channel: IMM_CHANNEL,
        type: 'msg',
        msg: {
            timestamp: new Date().valueOf(),
            msg: text
        },
        saveMsg: true
    };
    var localContent = content.msg;

    var $msg = generateMsgObj(localContent);
    $('#msg-ul').prepend($msg);
    $('#text-input').val('');

    $.ajax({
        url: HTTP_BROADCAST_URL,
        type: 'POST',
        data: JSON.stringify(content),
        success: function(data) {
            var json = JSON.parse(data);

            console.log(json);
        }
    });
}

function generateMsgObj(data) {

    var $obj = $('<li></li>');

    // url reg
    var urlReg = /http(s)?:\/\//;

    if(urlReg.test(data.msg)) {
        $obj.html('<a href="' + data.msg + '" target="_blank">' + data.msg + '</a>');
    } else {
        $obj.html(data.msg);
    }

    $obj.attr('data-timestamp', data.timestamp);

    return $obj;
}

exports.init = init;
