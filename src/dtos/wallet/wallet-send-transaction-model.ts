export class WalletSendTransactionModel {
    public transactionId: string;
    public outputs: Array<TransactionOutputModel>;
}

export class TransactionOutputModel {
    public address: string;
    public amount: string;
}