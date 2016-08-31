/**
 * EasierChan 2016-08-31
 */

import log4js = require('log4js');

export var DefaultLogger: log4js.Logger;
export class TLogger {
    static init(): void {
        log4js.configure({
            appenders: [
                { type: 'console' },
                { type: 'file', filename: global['userLogDir'] + '/alert.log', pattern: "-yyyy-MM-dd", category: 'alert' }
            ]
        });
        DefaultLogger = TLogger.console();
    }

    static console(): log4js.Logger {
        return log4js.getLogger();
    }

    static alert(): log4js.Logger {
        return log4js.getLogger('alert');
    }
}