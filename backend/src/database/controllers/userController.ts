import { Request, Response } from 'express';
import { createToken } from '../middleware/auth';
import UserService from '../services/userService';
import AccountService from '../services/accountService';

class UserController {

  constructor(
   private userService = new UserService(),
   private accountService = new AccountService(),
  ) {
   
  }

  public login = async (req: Request, res: Response, ) => {
    try {
      const { username } = req.body;
  
      const token = createToken({ username });
      return res.status(200).json({ token });

    } catch (error) {
      return res.status(401).send('Login não autorizado');
    }
  };

  public signUp = async (req: Request, res: Response ) => {
    try {
      const { username, password } = req.body;
     
      const account = await this.accountService.create();
      
      if(account.id === undefined){
        return res.status(500).send('não foi possível criar a conta')
      }
      
      const user = await this.userService.createUser( username, password, account.id );
     
      const token = createToken({username: user.username})
      if(user.id === undefined){

        return res.status(500).send('não foi possível criar o usário / usuário já cadastrado')
      }
      return res.status(201).json({token});
    } catch (error) {
      console.log(error)
      return res.status(500).send('não foi possível criar o usário / usuário já cadastrado')
    }
  };

}

export default UserController;
