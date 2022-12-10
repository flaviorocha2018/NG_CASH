export default interface ITransaction {
id: number;
debitedAccountId: number;
creditedAccountId: number; 
value: number;
createdAt: Date;
// eslint-disable-next-line @typescript-eslint/no-extra-semi, semi
};