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
var QtpMessageClient = (function (_super) {
    __extends(QtpMessageClient, _super);
    function QtpMessageClient(resolver) {
        _super.call(this, resolver);
    }
    QtpMessageClient.prototype.send = function (data) {
        // TODO custom protocol to encode data.
        // send the encoded data.
        _super.prototype.send.call(this, data);
    };
    return QtpMessageClient;
}(TcpClient_1.TcpClient));
exports.QtpMessageClient = QtpMessageClient;
//# sourceMappingURL=QtpMessageClient.js.map