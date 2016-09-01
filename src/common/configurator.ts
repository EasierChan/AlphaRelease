/**
 * chenlei 20160901 
 */
import {Paths} from './paths';
import fs = require('fs');
import _ = require('lodash');
import {DefaultLogger} from './logger';

interface UAppSetting {
    front_addr  :   string;
    front_port  :   number;
    heartbeat   :   number;
    recvwnd_size:   number;
}

interface UWindowSetting{
    left    :   number;
    right   :   number;
    width   :   number;
    height  :   number;
    other   :   any;
}


export class UConfig {
    static default: UAppSetting;
    static user: UAppSetting;

    static init(): void {
        try {
            UConfig.default = JSON.parse(fs.readFileSync(Paths.getConfigration().getSettings().default, 'utf-8'));
            
            if (Paths.getConfigration().getSettings().user !== null) {
                UConfig.user = _.cloneDeep(UConfig.default);
                _.assign(UConfig.user, JSON.parse(fs.readFileSync(Paths.getConfigration().getSettings().user, 'utf-8')));
            }
        } catch(err){
            DefaultLogger.error('app settings load error!');
            throw Error('app settings load error!');
        }
    }
}