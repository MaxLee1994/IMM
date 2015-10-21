/**
 * @fileOverview imm scaffold for tests
 * @author Max
 * created at Sun Sep 28 2014 16:27:20 GMT+0800 (CST)
 */

var imm = require('../js-client/src/imm');
var config = require('../conf/config.json');

window.imm = imm;
window.config = config;

var init = function() {
    initIMM();
};

function initIMM() {
    imm.init(IMM_URL, IMM_CHANMEL);
    imm.setUpConnection({
        uid: 5
    });
}


exports.init = init;
