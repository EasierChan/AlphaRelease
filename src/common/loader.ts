/**
 * 
 */
import fs = require('fs');
import {TLogger, DefaultLogger} from './logger';

export class Loader {
    static init(): void {
        global['userDir'] = process.cwd();
        global['userLogDir'] = global['userDir'] + '/logs';
        global['userMarketDir'] = global['userDir'] + '/marketdata';
        
        if(!fs.existsSync(global['userLogDir'])){
            fs.mkdir(global['userLogDir']);
        }

        if(!fs.existsSync(global['userMarketDir'])){
            fs.mkdir(global['userMarketDir']);
        }
        
        // init logger
        TLogger.init();
        DefaultLogger.info('Program environment initialize...');
    }
}