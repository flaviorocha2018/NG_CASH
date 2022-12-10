import { IUser } from '../interfaces/IUserInterface';
import { ILoginUser, LoginUserSchema } from '../interfaces/ILoginUser';
import ValidateError from '../middleware/validationError';
import UserModel from '../models/user';
import AccountModel from '../models/account'
import { z } from 'zod';

class UserService {
  private _model = UserModel;
  private _modelAccount = AccountModel;

  static async validateUserExist(obj: ILoginUser): Promise<ILoginUser> {
    const userData = await LoginUserSchema.safeParseAsync(obj);
    if (!userData.success) {
      console.log(userData.error);
      throw userData.error;
    }
    return userData.data;
  }

  public createUser = async (username: string, password: string, accountId: number ): Promise<IUser> =>{
    
    //  const LoginUserSchema =  z.ZodObject<{ username: z.ZodString;  password: z.ZodString;}>
    const userExist = await this._model.findOne({ where: {username}})
    if (userExist) throw new ValidateError(' username já cadastrado', 400);

    const newUser = await this._model.create({ username, password, accountId});
  
    return newUser.dataValues;
  };


  public findByEmail = async (username: string): Promise<IUser | null> => {
    const user = await this._model.findOne({
      where: { username },
    });

    if (!user) throw new ValidateError('User does not exist', 401);
    
    return user;
  };

  public emailValidation = async (username: string): Promise<IUser> => {
    const user = await this.findByEmail(username);

    if (!user) throw new ValidateError('Incorrect email or password', 401);

    return user;
  };

  public login = async (data: ILoginUser): Promise<void> => {
    const { username } = data;
    const user = await this.emailValidation(username);
  
    // const passVerify = bcrypt.compareSync(password, user.password);
    // if (!passVerify) throw new ValidationError('Incorrect email or password', 401);
  };
}

export default UserService;
