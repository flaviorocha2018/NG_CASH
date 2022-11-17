import express from 'express';

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
    }
    
}
export default App;