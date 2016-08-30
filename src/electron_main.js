"use strict";
var electron_1 = require('electron');
var QtpMessageClient_1 = require('./dal/QtpMessageClient');
/**
 * ready event
 */
electron_1.app.on('ready', function () {
    var temp = new QtpMessageClient_1.QtpMessageClient(null);
    console.log(temp instanceof QtpMessageClient_1.QtpMessageClient);
    var window = new electron_1.BrowserWindow();
    window.show();
});
