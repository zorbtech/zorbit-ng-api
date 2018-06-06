import { SpendingDetails } from './spending-details';

export class TransactionData {
    public id: string;
    public amount: string;
    public isCoinStake: boolean;
    public index: number;
    public blockHeight: number;
    public blockHash: string;
    public creationTime: string;
    public merkleProof: any;
    public scriptPubKey: string;
    public hex: string;
    public isPropagated: boolean;
    public spendingDetails: SpendingDetails;
}