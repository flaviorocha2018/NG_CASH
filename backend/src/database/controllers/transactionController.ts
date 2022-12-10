import { Request, Response } from 'express';
import TransactionService from '../services/transactionService';
import ITransaction from '../interfaces/transactionInterface';

export class transactionController {
 
  constructor(
    private transactionService = new TransactionService()) {}

  public CreateTransaction = async (req: Request, res: Response<Response>) => {
    try {
    
      const { username , value, targetUser } = req.body;
     
      const result = await this.transactionService.transfer(username, value, targetUser);
      return res.status(201).json(result);
    } catch (error) {
      throw new Error ('Não foi possível realizar a transação');
    }
  };

  public getAll = async (req: Request, res: Response<ITransaction[]>) => {
    try {
      const userId = req.body;
      const transaction = await this.transactionService.getAll(userId);
      return res.status(201).json(transaction);
    } catch (error) {
      throw new Error ('Não foi possível realizar a transação');
    }
  };
}

export default transactionController;