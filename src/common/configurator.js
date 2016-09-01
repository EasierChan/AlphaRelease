"use strict";
/**
 * chenlei 20160901
 */
var paths_1 = require('./paths');
var fs = require('fs');
var _ = require('lodash');
var logger_1 = require('./logger');
var UConfig = (function () {
    function UConfig() {
    }
    UConfig.init = function () {
        try {
            UConfig.default = JSON.parse(fs.readFileSync(paths_1.Paths.getConfigration().getSettings().default, 'utf-8'));
            if (paths_1.Paths.getConfigration().getSettings().user !== null) {
                UConfig.user = _.cloneDeep(UConfig.default);
                _.assign(UConfig.user, JSON.parse(fs.readFileSync(paths_1.Paths.getConfigration().getSettings().user, 'utf-8')));
            }
        }
        catch (err) {
            logger_1.DefaultLogger.error('app settings load error!');
            throw Error('app settings load error!');
        }
    };
    return UConfig;
}());
exports.UConfig = UConfig;
