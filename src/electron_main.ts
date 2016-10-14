import {app} from 'electron';
import {SimpleClient} from './dal/SimpleClient';
import {SimpleResolver} from './dal/SimpleResolver';
import {ULoader} from './common/base/loader';
import {UApplication} from './common/app/application';

ULoader.init();

Promise
/**
 * ready event
 */
app.on('ready', () => {
    var client = new SimpleClient(new SimpleResolver());
    client.connect(9005, '172.24.10.35');

    var obj = { reqno: 200, msgtype: 3 };
    client.send(obj);

    UApplication.bootstrapUIContainer();
    // window.show();
    // let showTimeoutHandler = setTimeout(function () {
    //     window.win.flashFrame(true);
    //     setTimeout(function () {
    //         window.win.flashFrame(false);
    //     }, 5000);
    // }, 2000);
});

app.on('window-all-closed', () => {
    app.quit();
})