import {app, BrowserWindow } from 'electron';

import {SimpleClient} from './dal/SimpleClient';
/**
 * ready event
 */
app.on('ready', () => {
    var temp = new SimpleClient(null);
    console.log(temp instanceof SimpleClient);
    let window = new BrowserWindow();
    window.show();
});