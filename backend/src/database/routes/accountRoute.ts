import * as express from 'express';
import AccountController from '../controllers/accountController';

const accountRoute = express.Router();
const accountController = new AccountController();

accountRoute.get('/', accountController.getAll );
accountRoute.get('/:id', accountController.getById);

export default accountRoute;