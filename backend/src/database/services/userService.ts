import * as bcrypt from 'bcryptjs';
import IUser from '../interfaces/userInterface';
import LoginUser from '../interfaces/loginUser';
import ValidationError from '../middleware/validationError';
import UserModel from '../models/user';
import AccountModel from '../models/account'

class UserService {
  private _model = UserModel;
  private _modelAccount = AccountModel;

  public createUser = async (username: string, password: string, accountId: number ): Promise<IUser> =>{
    const newUser = await this._model.create({

      username, password, accountId, 
    
    });
    return newUser;
  }

  private findByEmail = async (username: string): Promise<IUser | null> => {
    const user = await this._model.findOne({
      where: { username },
    });

    return user;
  };

  private emailValidation = async (username: string): Promise<IUser> => {
    const user = await this.findByEmail(username);

    if (!user) throw new ValidationError('Incorrect email or password', 401);

    return user;
  };

  public login = async (data: LoginUser): Promise<void> => {
    const { username, password } = data;

    const user = await this.emailValidation(username);

    const passVerify = bcrypt.compareSync(password, user.password);

    if (!passVerify) throw new ValidationError('Incorrect email or password', 401);
  };

}

export default UserService;
