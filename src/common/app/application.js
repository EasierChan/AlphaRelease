/**
 *
 */
"use strict";
var windows_1 = require('./windows');
var windowmgr_1 = require('./windowmgr');
var UApplication = (function () {
    function UApplication() {
    }
    UApplication.bootstrapUIContainer = function () {
        var menuWindow = new windows_1.MenuWindow({ state: { width: 300, height: 60 } });
        menuWindow.ready().then(function () {
            console.log("when MenuWindow ready say: hello");
        });
        menuWindow.loadURL('sample.html');
        windowmgr_1.UWindwManager.addMenuWindow(menuWindow);
        var contentWindow = new windows_1.ContentWindow();
        contentWindow.loadURL('sample.html');
        windowmgr_1.UWindwManager.addWindowToMenu(contentWindow, 'test', { level1: 2 });
        menuWindow.show();
    };
    UApplication.quit = function () {
        windowmgr_1.UWindwManager.closeAll();
    };
    return UApplication;
}());
exports.UApplication = UApplication;
