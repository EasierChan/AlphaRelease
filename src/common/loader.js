"use strict";
/**
 *
 */
var fs = require('fs');
var logger_1 = require('./logger');
var Loader = (function () {
    function Loader() {
    }
    Loader.init = function () {
        global['userDir'] = process.cwd();
        global['userLogDir'] = global['userDir'] + '/logs';
        global['userMarketDir'] = global['userDir'] + '/marketdata';
        if (!fs.existsSync(global['userLogDir'])) {
            fs.mkdir(global['userLogDir']);
        }
        if (!fs.existsSync(global['userMarketDir'])) {
            fs.mkdir(global['userMarketDir']);
        }
        // init logger
        logger_1.TLogger.init();
        logger_1.DefaultLogger.info('Program environment initialize...');
    };
    return Loader;
}());
exports.Loader = Loader;
