import { any, number } from 'joi';
import IAccount from '../interfaces/accountInterface';
import ValidateError from '../middleware/validationError';
import Account from '../models/account';

class accountService {
  account = Account;

  public async create(balance  = 100): Promise<IAccount>   {
    const account = await this.account.create({balance});
    return account;
  }

  public async getAll(): Promise<Account[]> {
    const account = await this.account.findAll();
    return account;
  }

  public async getById(id: number): Promise<Account> {
    const account = await this.account.findByPk(id);
    if (!account) throw new ValidateError('Account not found', 400);
    return account;
  }

}

export default accountService;