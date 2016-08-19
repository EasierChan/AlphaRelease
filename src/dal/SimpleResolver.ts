/**
 * SimpleResover extends Resolver
 */
import {IResolver} from './IResolver';
import events = require('events');

export default class SimpleResover extends events.EventEmitter implements IResolver {
    // 缓冲区长度下限 4K
    private bufMiniumLen: number = 1 << 12;
    // 缓冲区长度上限 1G
    private bufMaxiumLen: number = 1 << 30;
    // 缓冲区初始大小 4M
    private bufLen: number = 1 << 22;
    // 缓冲区
    private buffer: Buffer;
    private bufBeg: number = 0;
    private bufEnd: number = 0; //beg,end的取值范围在[0, 2*bufLen] 形成无琐队列
    // 消息格式
    private headLen: number = 0;

    setBufLen(len: number): void {
        this.bufLen = len;
    }

    setHeadLen(len: number): void {
        this.headLen = len;
    }

    constructor(bufLen?: number) {
        super();
        if (bufLen) {
            if (bufLen < this.bufMiniumLen) {
                throw Error('buffer minium length can\'t less than ' + this.bufMiniumLen);
            } else {
                this.bufLen = bufLen;
            }
        }

        this.buffer = new Buffer(this.bufLen);
    }

    onConnected(arg: any): void {
        console.log("connected!");
    }

    onError(err: any): void {
        console.log("something error!");
        console.log(err);
    }

    onData(data: Buffer): void {
        console.log("got data from server!");
        if (data.length + this.bufEnd - this.bufBeg > this.bufLen) {
            throw Error('more buffer length required.');
        }

        if (this.bufLen < this.bufEnd) {
            data.copy(this.buffer, this.bufEnd - this.bufLen);
        } else {
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
    }

    onEnd(arg: any): void {
        console.log("got a FIN!")
    }

    onClose(arg: any): void {
        console.log("connection closed!")
    }

    readMsg(): number {
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

        let content: string;
        if (this.bufBeg + this.headLen < this.bufLen) {
            content = JSON.stringify(Buffer.concat([this.buffer.slice(this.bufBeg + this.headLen, this.bufLen), this.buffer.slice(0, (this.bufBeg + this.headLen + datalen) % this.bufLen)]));
        } else {
            content = JSON.stringify(this.buffer.slice((this.bufBeg + this.headLen) % this.bufLen, (this.bufBeg + this.headLen + datalen) % this.bufLen));
        }

        var temp = JSON.parse(content, (k, v) => {
            return v && v.type === 'Buffer' ? new Buffer(v.data) : v;
        });

        var msgObj = JSON.parse(temp.toString());
        this.emit('data', msgObj);

        return this.headLen + datalen;
    }
}