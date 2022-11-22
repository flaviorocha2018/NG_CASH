import { NextFunction, Request, Response } from 'express';
// import { createToken, ReqData, TokenData } from '../middleware/auth';
import accountService from '../services/accountService';

class AccountController {
 
  constructor( private  account = new accountService()) { }

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accounts =  await this.account.getAll();
      res.status(200).json(accounts)

    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const account = await this.account.getById(id);
    res.status(200).json(account);
  };

}

export default AccountController;