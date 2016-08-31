/**
 * EasierChan 2016-08-31
 */
"use strict";
var log4js = require('log4js');
var TLogger = (function () {
    function TLogger() {
    }
    TLogger.init = function () {
        log4js.configure({
            appenders: [
                { type: 'console' },
                { type: 'file', filename: global['userLogDir'] + '/alert.log', pattern: "-yyyy-MM-dd", category: 'alert' }
            ]
        });
        exports.DefaultLogger = TLogger.console();
    };
    TLogger.console = function () {
        return log4js.getLogger();
    };
    TLogger.alert = function () {
        return log4js.getLogger('alert');
    };
    return TLogger;
}());
exports.TLogger = TLogger;
