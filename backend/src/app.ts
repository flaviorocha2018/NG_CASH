import express from 'express';
import {userRoute} from './database/routes/userRoute';
import accountRoute from './database/routes/accountRoute';
import ValidateError from './database/middleware/validationError';
import errorHandler from './database/middleware/errorHandler';

// import transactionRoute from './database/routes/transactionRoute'

class App{
  private app: express.Express;
  constructor(){
    this.app = express();
    this.config();
    
    
  }

  public start(port: string|number){
    this.app.listen(port, () => console.log(`rodando na porta: ${port}`))
        
  }

  private config(){
    this.app.use(express.json())
    // inserir routes 
    this.app.use('/users', userRoute);
    this.app.use('/account', accountRoute);
    // this.app.use('/transaction', transactionRoute);
    this.app.use(errorHandler);
  }
    
}
export default App;