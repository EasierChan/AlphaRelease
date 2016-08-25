const { app, BrowserWindow } = require('electron');

const {QtpMessageClient} = require('./dal/QtpMessageClient');
/**
 * ready event
 */
app.on('ready', () => {
    var temp = new QtpMessageClient(null);
    console.log(temp instanceof QtpMessageClient);
    let window = new BrowserWindow();
    window.show();
});