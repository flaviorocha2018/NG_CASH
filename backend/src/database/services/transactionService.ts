import { Op } from 'sequelize';
import ValidateError from '../middleware/validationError';
import Transaction from '../models/transaction';
import User  from '../models/user';

class transactionServices {
 

  public async getAll(username: string): Promise<Transaction[]> {
    const userAndAccount = await User.findOne({
      where: {username}
    });
    const transaction = await Transaction.findAll({
      where: {
        [Op.or]:[
          {debitedAccountId: userAndAccount?.accountId},
          {creditedAccountId: userAndAccount?.accountId},
        ]
      }
    });
    return transaction;
  }
  // filtro das transactions

  // fazer lançamentos débito e crédito  
  public async create(id: number): Promise<Transaction> {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) throw new ValidateError('Transaction not found', 400);
    return transaction;
  }

  public async getById(id: number): Promise<Transaction> {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) throw new ValidateError('Transaction not found', 400);
    return transaction;
  }
}

export default transactionServices;