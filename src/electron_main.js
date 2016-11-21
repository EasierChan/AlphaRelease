"use strict";
var electron_1 = require('electron');
var SimpleClient_1 = require('./dal/SimpleClient');
var SimpleResolver_1 = require('./dal/SimpleResolver');
var loader_1 = require('./common/base/loader');
var application_1 = require('./common/app/application');
loader_1.ULoader.init();
/**
 * ready event
 */
electron_1.app.on('ready', function () {
    console.log("node: ", process.versions.node);
    console.log("electron: ", process.versions.electron);
    console.log("chrome: ", process.versions.chrome);
    var client = new SimpleClient_1.SimpleClient(new SimpleResolver_1.SimpleResolver());
    client.connect(9005, '172.24.10.35');
    var obj = { reqno: 200, msgtype: 3 };
    client.send(obj);
    application_1.UApplication.bootstrapUIContainer();
    // window.show();
    // let showTimeoutHandler = setTimeout(function () {
    //     window.win.flashFrame(true);
    //     setTimeout(function () {
    //         window.win.flashFrame(false);
    //     }, 5000);
    // }, 2000);
});
electron_1.app.on('window-all-closed', function () {
    electron_1.app.quit();
});
