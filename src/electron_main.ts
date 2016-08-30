import {app, BrowserWindow } from 'electron';

import {QtpMessageClient} from './dal/QtpMessageClient';
/**
 * ready event
 */
app.on('ready', () => {
    var temp = new QtpMessageClient(null);
    console.log(temp instanceof QtpMessageClient);
    let window = new BrowserWindow();
    window.show();
});