import LoginUser from './loginUser';
export default interface IUser extends LoginUser{
  id?: number;
  accountId: number;
}