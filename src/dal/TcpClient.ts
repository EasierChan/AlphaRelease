import {IResolver} from './IResolver';
import net = require('net');
import {DefaultLogger} from '../common/logger';

const localhost: string = '127.0.0.1';
/**
 * TcpClient is
 */
export class TcpClient {
    sock: net.Socket;
    resolver: IResolver;
    /**
     * resolver: Resolver的实例
     */
    constructor(resolver: IResolver) {
        this.resolver = resolver;
    }
    /**
     * 连接
     */
    connect(port: number, ip = localhost): void {
        DefaultLogger.info(`start to connect to ${ip}:${port}...`);
        this.sock = null;
        this.sock = net.connect(port, ip, (e) => {
            this.resolver.onConnected(e);
        });

        this.sock.on('error', (err) => {
            this.resolver.onError(err);
        });

        this.sock.on('data', (data) => {
            this.resolver.onData(data);
        });

        this.sock.on('end', () => {
            this.resolver.onEnd({ remoteAddr: this.sock.remoteAddress, remotePort: this.sock.remotePort });
        });

        this.sock.on('close', (had_error) => {
            this.resolver.onClose(had_error);
        });
    }
    /**
     * 发送数据
     */
    send(data: any): void {
        if (this.sock.writable) {
            this.sock.write(data);
            return;
        }
        DefaultLogger.error('connection is not writable.');
    }
    /**
     * 关闭连接
     */
    close(): void {
        if (this.sock.writable) {
            this.sock.end();
            return;
        }
    }
}