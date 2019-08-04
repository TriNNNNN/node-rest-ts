import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';

import { registerRoutes } from "./routes";

class Server {
  private app: express.Application

  constructor() {
    this.app = express();
    this.dbConfig();
    this.config();
    this.setupRoutes();
  }
  
  config() {
    //Settings
    this.app.set('port', process.env.PORT || 3000);
    //middlewares
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: false}));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(cors());
  }

  dbConfig() {
    const MONGO_URI = 'mongodb://sa:Zew#ub#qC7@ds259377.mlab.com:59377/restapit';
    mongoose.set('useFindAndModify', true);
    mongoose.connect(MONGO_URI || process.env.MONGO_URI , {
      useNewUrlParser: true,
      useCreateIndex: true
    })
    .then(db => console.log('Database Connected'))
    .catch(err => console.log('Error while connecting database'))
  }
  
  private setupRoutes(): void {
    registerRoutes(this.app);
  }

  start() {
    this.app.listen(this.app.get('port'), () => {
      console.log('Server on port', this.app.get('port'))
    })
  }
}

const server = new Server();

server.start()