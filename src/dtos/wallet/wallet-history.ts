export class WalletHistory {
    public transactionHistory: Array<TransactionItem>;
}

export class TransactionItem {
    public type: TransactionItemType;
    public toAddress: string;
    public id: number;
    public amount: number;
    public payments: Array<PaymentModel>;
    public fee: number;
    public confirmedInBlock: number;
    public timeStamp: Date;
}

export class PaymentModel {
    public destinationAddress: string;
    public amount: number;
}

export enum TransactionItemType {
    Received,
    Send,
    Staked
}