/**
 * 
 */
import {UWindow, IWindowCreationOptions, WindowStyle} from '../base/window';
import {Menu} from 'electron';

// MenuWindow 
export class MenuWindow extends UWindow {

    constructor(config?: IWindowCreationOptions) {
        if (config) {
            config.state.wStyle = WindowStyle.System;
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
            ]
        }
        // 修改最小高度
        UWindow.MIN_HEIGHT = 30;
        super(config);
    }	
}

