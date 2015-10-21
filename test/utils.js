/**
 * @fileOverview util methods
 * @author Max
 * created at Mon Sep 29 2014 15:23:30 GMT+0800 (CST)
 */

function post(url, content, success) {
    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(content),
        success: function(data) {
            var json = JSON.parse(data);
            
            if(success) success(json);
        }
    })
}

function get(url, success) {
    $.get(url, null, function(data) {
        var json = JSON.parse(data);
            
        if(success) success(json);
    })
}