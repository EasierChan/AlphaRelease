import {IResolver} from './IResolver';
import net = require('net');
import {DefaultLogger} from '../common/logger';

const localhost: string = '127.0.0.1';
/**
 * TcpClient is
 */
export class TcpClient {
    sock_: net.Socket;
    resolver_: IResolver;
    /**
     * resolver: Resolver的实例
     */
    constructor(resolver: IResolver) {
        this.resolver_ = resolver;
    }
    /**
     * 连接
     */
    connect(port: number, ip = localhost): void {
        DefaultLogger.info(`start to connect to ${ip}:${port}...`);
        this.sock_ = null;
        this.sock_ = net.connect(port, ip, (e) => {
            this.resolver_.onConnected(e);
        });

        this.sock_.on('error', (err) => {
            this.resolver_.onError(err);
        });

        this.sock_.on('data', (data) => {
            this.resolver_.onData(data);
        });

        this.sock_.on('end', () => {
            this.resolver_.onEnd({ remoteAddr: this.sock_.remoteAddress, remotePort: this.sock_.remotePort });
        });

        this.sock_.on('close', (had_error) => {
            this.resolver_.onClose(had_error);
        });
    }
    /**
     * 发送数据
     */
    send(data: any): void {
        if (this.sock_.writable) {
            this.sock_.write(data);
            return;
        }
        DefaultLogger.error('connection is not writable.');
    }
    /**
     * 关闭连接
     */
    close(): void {
        if (this.sock_.writable) {
            this.sock_.end();
            return;
        }
    }
}