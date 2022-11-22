import { Request, Response } from 'express';
import { createToken } from '../middleware/auth';
import userService from '../services/userService';
import accountService from '../services/accountService';

class UserController {
  private _userService: userService;
  private _accountService: accountService;
  
  constructor(
    user: userService = new userService(),
    account: accountService = new accountService(),
  ) {
    this._userService = user;
    this._accountService = account;
  }

  public login = async (req: Request, res: Response, ) => {
    try {
      const { username, password } = req.body;
      await this._userService.login({ username, password });

      const token = createToken({ username });
      return res.status(200).json({ token });


    } catch (error) {
      return res.status(401).send('usuário não autorizado');
     
    }
  };

  public signUp = async (req: Request, res: Response, ) => {
    try {
      const { username, password } = req.body;
      const account = await this._accountService.create();
      if(account.id === undefined){
        return res.status(500).send('não foi possível criar a conta')
      }
      
      const user = await this._userService.createUser( username, password, account.id );
      if(user.id === undefined){
        return res.status(500).send('não foi possível criar o usário')
      }
      return res.status(201).json(user.id);
    } catch (error) {
      return res.status(500).send('não foi possível criar o usário')
    }
  };


}

export default UserController;
