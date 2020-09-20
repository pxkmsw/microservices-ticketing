require('express-async-errors');
import express from 'express';
import { logger } from './startup/logger';
import { routing } from './startup/routes';
import { dbConnect } from './startup/database';

const app = express();

dbConnect();
routing(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => logger.info(`Listening on ${port} ....`));

export default server;
