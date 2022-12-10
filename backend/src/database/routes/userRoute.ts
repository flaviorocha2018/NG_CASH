import { Router } from 'express';
import UserController from '../controllers/userController';

import validations from '../middleware/validation';

const userRoute = Router();
const userController = new UserController();

userRoute.post('/signup', validations.loginFields, userController.signUp );
userRoute.post('/login', validations.loginFields, userController.login);
userRoute.get('/validate', validations.loginFields, userController.login)

export  {userRoute};