/**
 * @fileOverview load config files
 * @author Max
 * created at Mon Sep 15 2014 10:27:58 GMT+0800 (CST)
 */


var fs = require('fs');
var configCacheList = [];

var CONFIG_FILE_BASE = './conf/';
var CONFIG_FILE_POSTFIX = '.json';
var GLOBAL_CONFIG = CONFIG_FILE_BASE + 'config' + CONFIG_FILE_POSTFIX;
var LOGM_CONFIG = CONFIG_FILE_BASE + 'logM-config' + CONFIG_FILE_POSTFIX;
var ONLINE_COUNT_CONFIG = CONFIG_FILE_BASE + 'online-count-config' + CONFIG_FILE_POSTFIX;

var load = function(file, noCache) {

    if(!noCache) {
        for(var i in configCacheList) {
            if(configCacheList[i].file === file) {
                return configCacheList[i].config;
            }
        }
    }

    var configFileContent = fs.readFileSync(file);
    var configContent = JSON.parse(configFileContent);

    if(!noCache) {
        configCacheList.push({
            file: file,
            config: configContent
        });
    }

    return configContent;
};

exports.load = load;
exports.CONFIG_FILE = {
    GLOBAL_CONFIG: GLOBAL_CONFIG,
    LOGM_CONFIG: LOGM_CONFIG,
    ONLINE_COUNT_CONFIG: ONLINE_COUNT_CONFIG
};
