import {app} from 'electron';
import {SimpleClient} from './dal/SimpleClient';
import {SimpleResolver} from './dal/SimpleResolver';
import {ULoader} from './common/base/loader';
import {MenuWindow} from './common/app/windows';

ULoader.init();
/**
 * ready event
 */
app.on('ready', () => {
    var client = new SimpleClient(new SimpleResolver());
    client.connect(9005, '172.24.10.35');

    var obj = { reqno: 200, msgtype: 3 };
    client.send(obj);

    let window: MenuWindow = new MenuWindow({ state: { x: 100, y: 100, width: 300, height: 300, wStyle: 0 }});
    window.ready().then(function(){
        console.log("i'm ready"); 
    })
    window.loadURL('sample.html');
    // window.show();
    // let showTimeoutHandler = setTimeout(function () {
    //     window.win.flashFrame(true);
    //     setTimeout(function () {
    //         window.win.flashFrame(false);
    //     }, 5000);
    // }, 2000);
});