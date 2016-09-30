"use strict";
var electron_1 = require('electron');
var SimpleClient_1 = require('./dal/SimpleClient');
var SimpleResolver_1 = require('./dal/SimpleResolver');
var loader_1 = require('./common/base/loader');
var windows_1 = require('./common/app/windows');
loader_1.ULoader.init();
/**
 * ready event
 */
electron_1.app.on('ready', function () {
    var client = new SimpleClient_1.SimpleClient(new SimpleResolver_1.SimpleResolver());
    client.connect(9005, '172.24.10.35');
    var obj = { reqno: 200, msgtype: 3 };
    client.send(obj);
    var window = new windows_1.MenuWindow({ state: { x: 100, y: 100, width: 300, height: 300, wStyle: 0 } });
    window.loadURL('sample.html');
    // window.show();
    // let showTimeoutHandler = setTimeout(function () {
    //     window.win.flashFrame(true);
    //     setTimeout(function () {
    //         window.win.flashFrame(false);
    //     }, 5000);
    // }, 2000);
});
