"use strict";
/**
 * manager the windows
 */
var window_1 = require('../base/window');
var windows_1 = require('./windows');
var UWindwManager = (function () {
    function UWindwManager() {
    }
    UWindwManager.prototype.addMenuWindow = function (bound) {
        if (!this._menuWindow) {
            this._menuWindow = new windows_1.MenuWindow({
                state: {
                    x: bound.x,
                    y: bound.y,
                    width: bound.width || 300,
                    height: bound.height || 300,
                    wStyle: window_1.WindowStyle.System
                },
                viewUrl: 'sample.html'
            });
            this._windows.push(this._menuWindow);
        }
    };
    /**
     * @description 添加菜单
     * @param window an instance of UWindow.
     * @param presentItem item's presentation on MenuWindow, it supports
     * @param fatherItem presentItem attached to.
     */
    UWindwManager.prototype.addWindowToMenu = function (window, presentItem, fatherItem) {
    };
    /**
     * @description 广播消息
     */
    UWindwManager.prototype.broadcastMessage = function (message) {
    };
    /**
     * @description 发消息至某个窗口
     */
    UWindwManager.prototype.sendMessage = function (windowItem, message) {
    };
    /**
     * @description 关闭所有窗口
     */
    UWindwManager.prototype.closeAll = function () {
    };
    return UWindwManager;
}());
exports.UWindwManager = UWindwManager;
