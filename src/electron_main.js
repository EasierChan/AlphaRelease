const { app, BrowserWindow } = require('electron');
/**
 * ready event
 */
app.on('ready', () => {
    let window = new BrowserWindow();
    window.show();
    
});