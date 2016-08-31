import {IResolver} from './IResolver';
import events = require('events');
import {DefaultLogger} from '../common/logger';
/**
 * SimpleResover extends Resolver
 */
export class SimpleResolver extends events.EventEmitter implements IResolver {
    // 缓冲区长度下限 4K
    private bufMiniumLen: number = 1 << 12;
    // 缓冲区长度上限 1G
    private bufMaxiumLen: number = 1 << 30;
    // 缓冲区初始大小 4M
    private bufLen: number = 1 << 22;
    // 缓冲区
    private buffer: Buffer;
    private bufBeg: number = 0;
    private bufEnd: number = 0;
    // 消息格式
    private headLen: number = 0;

    resetBuffer(bufLen?: number): void {
        if (bufLen) {
            if (bufLen < this.bufMiniumLen) {
                DefaultLogger.error('buffer minium length can\'t less than ' + this.bufMiniumLen);
                throw Error('buffer minium length can\'t less than ' + this.bufMiniumLen);
            } else {
                this.bufLen = bufLen;
            }
        }

        this.buffer = Buffer.alloc(this.bufLen);
    }

    setHeadLen(len: number): void {
        this.headLen = len;
    }

    constructor(bufLen?: number) {
        super();
        this.resetBuffer(bufLen);
    }

    onConnected(arg: any): void {
        DefaultLogger.info("connected!");
    }

    onError(err: any): void {
        DefaultLogger.info(err);
    }

    onData(data: Buffer): void {
        DefaultLogger.trace("got data from server!");
        // auto grow buffer to store big data unless it greater than maxlimit.
        while (data.length + this.bufEnd > this.bufLen) {
            DefaultLogger.warn('more buffer length required.');
            if ((this.bufLen << 1) > this.bufMaxiumLen) {
                DefaultLogger.fatal('too max buffer');
                throw Error('too max buffer');
            }
            this.buffer = Buffer.concat([this.buffer, Buffer.alloc(this.bufLen)], this.bufLen << 1);
            this.bufLen <<= 1;
        }

        data.copy(this.buffer, this.bufEnd);
        this.bufEnd += data.length;

        var readLen = this.readMsg();
        while (readLen > 0) {
            this.bufBeg += readLen;

            if (this.bufBeg > (this.bufLen >> 1)) {
                this.bufBeg -= (this.bufLen >> 1);
                this.bufEnd -= (this.bufLen >> 1);
            }

            readLen = this.readMsg();
        }
    }

    onEnd(arg: any): void {
        DefaultLogger.info("got a FIN");
    }

    onClose(arg: any): void {
        DefaultLogger.info("connection closed!")
    }

    readMsg(): number {
        if (this.bufEnd < this.bufBeg + this.headLen) {
            return 0;
        }
        // read head
        var version = this.buffer.readUInt8(this.bufBeg);
        var service = this.buffer.readUInt8((this.bufBeg + 1));
        var msgtype = this.buffer.readUInt16LE((this.bufBeg + 2));
        var topic = this.buffer.readUInt16LE((this.bufBeg + 4));
        var optslen = this.buffer.readUInt16LE((this.bufBeg + 6));
        var datalen = this.buffer.readUInt32LE((this.bufBeg + 8));
        // read content
        if (this.bufEnd < this.bufBeg + this.headLen + datalen) {
            return 0;
        }

        let content: string = JSON.stringify(this.buffer.slice((this.bufBeg + this.headLen), (this.bufBeg + this.headLen + datalen)));

        var temp = JSON.parse(content, (k, v) => {
            return v && v.type === 'Buffer' ? new Buffer(v.data) : v;
        });

        var msgObj = JSON.parse(temp.toString());
        this.emit('data', msgObj);

        return this.headLen + datalen;
    }
}