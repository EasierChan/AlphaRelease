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
        this.resolver = resolver;
    }
    /**
     * 连接
     */
    TcpClient.prototype.connect = function (port, ip) {
        var _this = this;
        if (ip === void 0) { ip = localhost; }
        logger_1.DefaultLogger.info("start to connect to " + ip + ":" + port + "...");
        this.sock = null;
        this.sock = net.connect(port, ip, function (e) {
            _this.resolver.onConnected(e);
        });
        this.sock.on('error', function (err) {
            _this.resolver.onError(err);
        });
        this.sock.on('data', function (data) {
            _this.resolver.onData(data);
        });
        this.sock.on('end', function () {
            _this.resolver.onEnd({ remoteAddr: _this.sock.remoteAddress, remotePort: _this.sock.remotePort });
        });
        this.sock.on('close', function (had_error) {
            _this.resolver.onClose(had_error);
        });
    };
    /**
     * 发送数据
     */
    TcpClient.prototype.send = function (data) {
        if (this.sock.writable) {
            this.sock.write(data);
            return;
        }
        logger_1.DefaultLogger.error('connection is not writable.');
    };
    /**
     * 关闭连接
     */
    TcpClient.prototype.close = function () {
        if (this.sock.writable) {
            this.sock.end();
            return;
        }
    };
    return TcpClient;
}());
exports.TcpClient = TcpClient;
