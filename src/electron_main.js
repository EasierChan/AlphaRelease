"use strict";
var electron_1 = require('electron');
var SimpleClient_1 = require('./dal/SimpleClient');
var SimpleResolver_1 = require('./dal/SimpleResolver');
var loader_1 = require('./common/loader');
loader_1.ULoader.init();
/**
 * ready event
 */
electron_1.app.on('ready', function () {
    var client = new SimpleClient_1.SimpleClient(new SimpleResolver_1.SimpleResolver());
    client.connect(9005, '172.24.10.35');
    var window = new electron_1.BrowserWindow();
    window.show();
});
