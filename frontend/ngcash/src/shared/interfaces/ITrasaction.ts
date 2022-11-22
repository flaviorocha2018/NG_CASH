import { ETransactionTypes } from "../enum/TransactionTypes";

export interface ITransaction {
    type: ETransactionTypes;
    created_at: Date;
    value: number;
}