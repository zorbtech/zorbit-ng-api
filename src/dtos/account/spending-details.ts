export class SpendingDetails {
    public transactionId: string;
    public payments: Array<PaymentDetails>;
    public blockHeight: number;
    public isCoinStake: boolean;
    public creationTime: string;
    public hex: string;
}