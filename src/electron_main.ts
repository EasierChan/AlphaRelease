import {app, BrowserWindow } from 'electron';
import {SimpleClient} from './dal/SimpleClient';
import {SimpleResolver} from './dal/SimpleResolver';
import {Loader} from './common/loader';

Loader.init();
/**
 * ready event
 */
app.on('ready', () => {
    var client = new SimpleClient(new SimpleResolver());
    client.connect(9005, '172.24.10.35');
    let window = new BrowserWindow();
    window.show();
});