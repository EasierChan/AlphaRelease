/**
 * 
 */

import {MenuWindow, ContentWindow} from './windows';
import {UWindwManager} from './windowmgr';

export class UApplication {
    constructor(){
    }

    public static bootstrapUIContainer(): void{
        let menuWindow: MenuWindow = new MenuWindow({ state: {  width: 300, height: 60}});
        menuWindow.ready().then(function(){
            console.log("i'm MenuWindow");
        });
        menuWindow.loadURL('sample.html');
        UWindwManager.addMenuWindow(menuWindow);
        
        let contentWindow: ContentWindow = new ContentWindow();
        contentWindow.loadURL('sample.html');
        UWindwManager.addWindowToMenu(contentWindow, 'test', {level1: 2});

        menuWindow.show();
    }
}