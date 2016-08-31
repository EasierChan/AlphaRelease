import {SimpleResolver}  from './SimpleResolver';
import {TcpClient} from './TcpClient';

/**
 * QtpMessageClient
 */
export class SimpleClient extends TcpClient {
    public constructor(resolver?: SimpleResolver) {
        super(resolver);
    }

    send(data: any): void {
        // TODO custom protocol to encode data.

        // send the encoded data.
        super.send(data);
    }
}