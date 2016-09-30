"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 */
var window_1 = require('../base/window');
// MenuWindow 
var MenuWindow = (function (_super) {
    __extends(MenuWindow, _super);
    function MenuWindow(config) {
        if (config) {
            config.state.wStyle = window_1.WindowStyle.System;
            config.menuTemplate = [
                {
                    label: '文件'
                },
                {
                    label: '查看'
                },
                {
                    label: '窗口'
                },
                {
                    label: '帮助'
                }
            ];
        }
        // 修改最小高度
        window_1.UWindow.MIN_HEIGHT = 30;
        _super.call(this, config);
    }
    return MenuWindow;
}(window_1.UWindow));
exports.MenuWindow = MenuWindow;
