/**
 * manager the windows
 */
import {UWindow, IWindowCreationOptions, WindowStyle} from '../base/window';
import {MenuWindow} from './windows';

interface Bounds {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class UWindwManager {
    private _windows: Array<UWindow>;
    private _menuWindow: MenuWindow;

    constructor() {

    }

    addMenuWindow(bound: Bounds): void {
        if (!this._menuWindow) {
            this._menuWindow = new MenuWindow({
                state: {
                    x: bound.x,
                    y: bound.y,
                    width: bound.width || 300,
                    height: bound.height || 300,
                    wStyle: WindowStyle.System
                },
                viewUrl: 'sample.html'
            });
            this._windows.push(this._menuWindow);
        }
    }
    /**
     * @description 添加菜单
     * @param window an instance of UWindow.
     * @param presentItem item's presentation on MenuWindow, it supports 
     * @param fatherItem presentItem attached to.
     */
    addWindowToMenu(window: UWindow, presentItem: Object, fatherItem: string): void {

    }
    /**
     * @description 广播消息
     */
    broadcastMessage(message: Object): void {

    }
    /**
     * @description 发消息至某个窗口
     */
    sendMessage(windowItem: Object, message: Object): void {

    }
    /**
     * @description 关闭所有窗口
     */
    closeAll(): void {

    }
}

