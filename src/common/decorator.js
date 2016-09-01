/**
 *
 */
"use strict";
var Decorator = (function () {
    function Decorator() {
    }
    Decorator.sealed = function (constructor) {
        Object.seal(constructor);
        Object.seal(constructor.prototype);
    };
    return Decorator;
}());
exports.Decorator = Decorator;
