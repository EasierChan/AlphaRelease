/**
 * chenlei 2016-09-01
 */
import fs = require('fs');
import path = require('path');
import {Decorator} from './decorator';

@Decorator.sealed
export class Paths {

    private static configuration_: Paths = null;

    static getConfigration(): Paths {
        return Paths.configuration_ === null ? new Paths() : Paths.configuration_;
    }

    private basedir_: string;
    private logdir_: string;
    private backupdir_: string;
    private settings_: { default: string, user: string };
    constructor() {
        this.basedir_ = process.cwd();
        this.logdir_ = path.join(this.basedir_, 'logs');
        this.backupdir_ = path.join(this.basedir_, '/backup');
        this.settings_ = {
            default: 'default-setting.json',
            user: 'user-setting.json'
        };

        if (!fs.existsSync(this.logdir_)) {
            fs.mkdir(this.logdir_);
        }

        if (!fs.existsSync(this.backupdir_)) {
            fs.mkdir(this.backupdir_);
        }

        if (!fs.existsSync(path.join(this.basedir_, this.settings_.default))) {
            throw Error(this.settings_.default + ' can not be found!');
        }
    }

    getBaseDir() {
        return this.basedir_;
    }

    getLogDir() {
        return this.logdir_;
    }

    getBackupDir() {
        return this.backupdir_;
    }

    getSettings() {
        let puser: string = path.join(this.basedir_, this.settings_.user);
        if (fs.existsSync(path.join(this.basedir_, this.settings_.user))) {
            return { default: path.join(this.basedir_, this.settings_.default), user: puser };
        } else {
            return { default: path.join(this.basedir_, this.settings_.default), user: null };
        }
    }
}


// function sealed(constructor: Function) {
//     Object.seal(constructor);
//     Object.seal(constructor.prototype);
// }