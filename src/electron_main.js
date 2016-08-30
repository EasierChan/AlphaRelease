"use strict";
var electron_1 = require('electron');
var SimpleClient_1 = require('./dal/SimpleClient');
/**
 * ready event
 */
electron_1.app.on('ready', function () {
    var temp = new SimpleClient_1.SimpleClient(null);
    console.log(temp instanceof SimpleClient_1.SimpleClient);
    var window = new electron_1.BrowserWindow();
    window.show();
});
