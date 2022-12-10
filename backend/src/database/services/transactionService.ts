import { Op } from 'sequelize';
import Account from '../models/account';
import Transaction from '../models/transaction';
import User  from '../models/user';
import ValidateError from '../middleware/validationError';



class transactionServices {
  
  public async getAll(username: string,  date?: Date): Promise<Transaction[]> {
    const user = await User.findOne({
      // selecionar a conta do usuário tabela users
      where: {username: username}
    });
    const transaction = await Transaction.findAll({
      where: {
        [Op.or]:[
          {debitedAccountId: user?.accountId},
          {creditedAccountId: user?.accountId},
          {date}
        ]
      }
    });
    return transaction;
  }


  public async transfer(username: string, targetUsername:string, value:number ) {
    const userOrigin = await User.findOne({
      where: {username: username}
    });
    const userAccount =  await Account.findByPk(userOrigin?.accountId);
    if (!userAccount) return 'User not found!';
    if( userAccount?.balance < value){
      return 'Error: Not enough balance';
    }
    userAccount.balance = userAccount.balance - value;
    userAccount.save();

    const targetUser = await User.findOne({
      where: {username: targetUsername}
    });

    const targetAccount = await Account.findByPk(targetUser?.accountId);
    if(!targetAccount) return 'User account not found!';
    targetAccount.balance = targetAccount.balance + value;
    targetAccount.save();

    const newTransaction = await Transaction.create({ 
      debitedAccountId:userAccount.id, creditedAccountId:targetAccount.id, value, createdAt: Date.now() });
    return newTransaction;
  }

}

export default transactionServices;