"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events = require('events');
/**
 * SimpleResover extends Resolver
 */
var SimpleResolver = (function (_super) {
    __extends(SimpleResolver, _super);
    function SimpleResolver(bufLen) {
        _super.call(this);
        // 缓冲区长度下限 4K
        this.bufMiniumLen = 1 << 12;
        // 缓冲区长度上限 1G
        this.bufMaxiumLen = 1 << 30;
        // 缓冲区初始大小 4M
        this.bufLen = 1 << 22;
        this.bufBeg = 0;
        this.bufEnd = 0; //beg,end的取值范围在[0, 2*bufLen] 形成无琐队列
        // 消息格式
        this.headLen = 0;
        if (bufLen) {
            if (bufLen < this.bufMiniumLen) {
                throw Error('buffer minium length can\'t less than ' + this.bufMiniumLen);
            }
            else {
                this.bufLen = bufLen;
            }
        }
        this.buffer = new Buffer(this.bufLen);
    }
    SimpleResolver.prototype.setBufLen = function (len) {
        this.bufLen = len;
    };
    SimpleResolver.prototype.setHeadLen = function (len) {
        this.headLen = len;
    };
    SimpleResolver.prototype.onConnected = function (arg) {
        console.log("connected!");
    };
    SimpleResolver.prototype.onError = function (err) {
        console.log("something error!");
        console.log(err);
    };
    SimpleResolver.prototype.onData = function (data) {
        console.log("got data from server!");
        if (data.length + this.bufEnd - this.bufBeg > this.bufLen) {
            throw Error('more buffer length required.');
        }
        if (this.bufLen < this.bufEnd) {
            data.copy(this.buffer, this.bufEnd - this.bufLen);
        }
        else {
            data.copy(this.buffer, this.bufLen - this.bufEnd, 0, this.bufLen - this.bufEnd);
            data.copy(this.buffer, 0, this.bufLen - this.bufEnd, data.length - (this.bufLen - this.bufEnd));
        }
        this.bufEnd += data.length;
        var readLen = this.readMsg();
        while (readLen > 0) {
            this.bufBeg += readLen;
            if (this.bufBeg >= this.bufLen) {
                this.bufBeg -= this.bufLen;
                this.bufEnd -= this.bufLen;
            }
            readLen = this.readMsg();
        }
    };
    SimpleResolver.prototype.onEnd = function (arg) {
        console.log("got a FIN!");
    };
    SimpleResolver.prototype.onClose = function (arg) {
        console.log("connection closed!");
    };
    SimpleResolver.prototype.readMsg = function () {
        if (this.bufEnd < this.bufBeg + this.headLen) {
            return 0;
        }
        // read head
        var version = this.buffer.readUInt8(this.bufBeg % this.bufLen);
        var service = this.buffer.readUInt8((this.bufBeg + 1) % this.bufLen);
        var msgtype = this.buffer.readUInt16LE((this.bufBeg + 2) % this.bufLen);
        var topic = this.buffer.readUInt16LE((this.bufBeg + 4) % this.bufLen);
        var optslen = this.buffer.readUInt16LE((this.bufBeg + 6) % this.bufLen);
        var datalen = this.buffer.readUInt32LE((this.bufBeg + 8) % this.bufLen);
        // read content
        if (this.bufEnd < this.bufBeg + this.headLen + datalen) {
            return 0;
        }
        var content;
        if (this.bufBeg + this.headLen < this.bufLen) {
            content = JSON.stringify(Buffer.concat([this.buffer.slice(this.bufBeg + this.headLen, this.bufLen), this.buffer.slice(0, (this.bufBeg + this.headLen + datalen) % this.bufLen)]));
        }
        else {
            content = JSON.stringify(this.buffer.slice((this.bufBeg + this.headLen) % this.bufLen, (this.bufBeg + this.headLen + datalen) % this.bufLen));
        }
        var temp = JSON.parse(content, function (k, v) {
            return v && v.type === 'Buffer' ? new Buffer(v.data) : v;
        });
        var msgObj = JSON.parse(temp.toString());
        this.emit('data', msgObj);
        return this.headLen + datalen;
    };
    return SimpleResolver;
}(events.EventEmitter));
exports.SimpleResolver = SimpleResolver;
//# sourceMappingURL=SimpleResolver.js.map