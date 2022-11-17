import { Request, Response, NextFunction } from 'express';
// import ValidateError from './validationError';
// import ILoginUser from '../interfaces/LoginUser';

import userService from '../services/userService';

const service = new userService();
console.log(service);

const validations = {

  loginFields: (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || email.length === 0) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!password || password.length === 0) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    // validação da senha

    next();
  },

};

export default validations;