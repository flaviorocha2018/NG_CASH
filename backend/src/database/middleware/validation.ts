import { Request, Response, NextFunction } from 'express';
import UserService from '../services/userService';
import { z } from 'zod';

const service = new UserService();

const validations = {

  loginFields: (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
     
    const  LoginUserSchema = z.object({
      username: z.string().min(2),
      password: z.string().min(7).regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/)
    })

    if (!username || username.length === 0) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!password || password.length === 0) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (username == LoginUserSchema && password == LoginUserSchema ) {
      return res.status(400).json({message: 'Username invalid or password invalid'});
    }

    next();
  },

};

export default validations;