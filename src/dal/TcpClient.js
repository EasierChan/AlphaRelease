"use strict";
var net = require('net');
var logger_1 = require('../common/logger');
var localhost = '127.0.0.1';
/**
 * TcpClient is
 */
var TcpClient = (function () {
    /**
     * resolver: Resolver的实例
     */
    function TcpClient(resolver) {
        this.resolver_ = resolver;
    }
    /**
     * 连接
     */
    TcpClient.prototype.connect = function (port, ip) {
        var _this = this;
        if (ip === void 0) { ip = localhost; }
        logger_1.DefaultLogger.info("start to connect to " + ip + ":" + port + "...");
        this.sock_ = null;
        this.sock_ = net.connect(port, ip, function (e) {
            _this.resolver_.onConnected(e);
        });
        this.sock_.on('error', function (err) {
            _this.resolver_.onError(err);
        });
        this.sock_.on('data', function (data) {
            _this.resolver_.onData(data);
        });
        this.sock_.on('end', function () {
            _this.resolver_.onEnd({ remoteAddr: _this.sock_.remoteAddress, remotePort: _this.sock_.remotePort });
        });
        this.sock_.on('close', function (had_error) {
            _this.resolver_.onClose(had_error);
        });
    };
    /**
     * 发送数据
     */
    TcpClient.prototype.send = function (data) {
        if (this.sock_.writable) {
            this.sock_.write(data);
            return;
        }
        logger_1.DefaultLogger.error('connection is not writable.');
    };
    /**
     * 关闭连接
     */
    TcpClient.prototype.close = function () {
        if (this.sock_.writable) {
            this.sock_.end();
            return;
        }
    };
    return TcpClient;
}());
exports.TcpClient = TcpClient;
