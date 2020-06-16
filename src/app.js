import 'dotenv/config';

const express = require('express');
import { errors } from 'celebrate';
import routes from './routes';
import cors from 'cors';

import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    // this.server.use(
    //   '/files',
    //   express.static(path.resolve(__dirname, '..', 'temp', 'uploads'))
    // );
  }

  routes() {
    this.server.use(routes);
    this.server.use(errors());
  }

}

export default new App().server;