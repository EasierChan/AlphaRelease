"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TcpClient_1 = require('./TcpClient');
/**
 * QtpMessageClient
 */
var SimpleClient = (function (_super) {
    __extends(SimpleClient, _super);
    function SimpleClient(resolver) {
        _super.call(this, resolver);
    }
    SimpleClient.prototype.send = function (data) {
        // TODO custom protocol to encode data.
        // send the encoded data.
        _super.prototype.send.call(this, data);
    };
    return SimpleClient;
}(TcpClient_1.TcpClient));
exports.SimpleClient = SimpleClient;
