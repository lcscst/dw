import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';

import config from './core/config.js';

import usersRouter from './routes/users.js';
import loginRouter from './routes/login.js';
import machinesRouter from './routes/machines.js';
import pingMachine from './routes/ping.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.use(usersRouter);
app.use(loginRouter);
app.use(machinesRouter);
app.use(pingMachine);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
