import {app, BrowserWindow } from 'electron';
import {SimpleClient} from './dal/SimpleClient';
import {SimpleResolver} from './dal/SimpleResolver';
import {ULoader} from './common/loader';

ULoader.init();
/**
 * ready event
 */
app.on('ready', () => {
    var client = new SimpleClient(new SimpleResolver());
    client.connect(9005, '172.24.10.35');

    var obj = { reqno: 200, msgtype: 3 };
    client.send(obj);
    obj.msgtype = 4;
    obj.codelist = [];
    client.send(obj);
    let window = new BrowserWindow();
    window.show();
});