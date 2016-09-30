"use strict";
/**
 * manager the windows
 */
var window_1 = require('../base/window');
var windows_1 = require('./windows');
var UWindwManager = (function () {
    function UWindwManager() {
        this._menuWindow = new windows_1.MenuWindow({
            state: {
                x: 100,
                y: 100,
                width: 300,
                height: 300,
                wStyle: window_1.WindowStyle.System
            },
            viewUrl: 'sample.html'
        });
        this._windows.push(this._menuWindow);
    }
    return UWindwManager;
}());
exports.UWindwManager = UWindwManager;
