const express = require('express');
const { errors } = require('celebrate');
import routes from './routes';
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes);
app.use(errors());

export default app;