import { HdAddress } from './hd-address';

export class HdAccount {
    public index: number;
    public name: string;
    public hdPath: string;
    public extPubKey: string;
    public creationTime: string;
    public externalAddresses: Array<HdAddress>;
    public internalAddress: Array<HdAddress>;
}