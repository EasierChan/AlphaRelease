/**
 * EasierChan 2016-08-31
 */
'use strict';
var paths_1 = require('./paths');
var log4js = require('log4js');
var ULogger = (function () {
    function ULogger() {
    }
    ULogger.init = function () {
        log4js.configure({
            appenders: [
                { type: 'console' },
                { type: 'file', filename: paths_1.Paths.configration.logDir + '/alert.log', pattern: "-yyyy-MM-dd", category: 'alert' }
            ]
        });
        exports.DefaultLogger = ULogger.console();
    };
    ULogger.console = function () {
        return log4js.getLogger();
    };
    ULogger.alert = function () {
        return log4js.getLogger('alert');
    };
    return ULogger;
}());
exports.ULogger = ULogger;
