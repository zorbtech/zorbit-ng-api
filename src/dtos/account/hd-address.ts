import { TransactionData } from './transaction-data';

export class HdAddress {
    public index: number;
    public scriptPubKey: string;
    public pubkey: string;
    public address: string;
    public hdPath: string;
    public transactions: Array<TransactionData>;
}