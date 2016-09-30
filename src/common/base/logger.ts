/**
 * EasierChan 2016-08-31
 */
'use strict';

import {Paths} from './paths';
import log4js = require('log4js');

export var DefaultLogger: log4js.Logger;
export class ULogger {
    static init(): void {
        log4js.configure({
            appenders: [
                { type: 'console' },
                { type: 'file', filename: Paths.configration.logDir + '/alert.log', pattern: "-yyyy-MM-dd", category: 'alert' }
            ]
        });
        DefaultLogger = ULogger.console();
    }

    static console(): log4js.Logger {
        return log4js.getLogger();
    }

    static alert(): log4js.Logger {
        return log4js.getLogger('alert');
    }
}