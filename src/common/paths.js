"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * chenlei 2016-09-01
 */
var fs = require('fs');
var path = require('path');
var decorator_1 = require('./decorator');
var Paths = (function () {
    function Paths() {
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
    Paths.getConfigration = function () {
        return Paths.configuration_ === null ? new Paths() : Paths.configuration_;
    };
    Paths.prototype.getBaseDir = function () {
        return this.basedir_;
    };
    Paths.prototype.getLogDir = function () {
        return this.logdir_;
    };
    Paths.prototype.getBackupDir = function () {
        return this.backupdir_;
    };
    Paths.prototype.getSettings = function () {
        var puser = path.join(this.basedir_, this.settings_.user);
        if (fs.existsSync(path.join(this.basedir_, this.settings_.user))) {
            return { default: path.join(this.basedir_, this.settings_.default), user: puser };
        }
        else {
            return { default: path.join(this.basedir_, this.settings_.default), user: null };
        }
    };
    Paths.configuration_ = null;
    Paths = __decorate([
        decorator_1.Decorator.sealed
    ], Paths);
    return Paths;
}());
exports.Paths = Paths;
// function sealed(constructor: Function) {
//     Object.seal(constructor);
//     Object.seal(constructor.prototype);
// } 
