import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDb } from './db';
import v1Routes from './routes/v1/api';
import { responseHandler } from './utils/ResponseHandler';

const app = express();
const env = dotenv.config().parsed;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(responseHandler);
// connect to db
connectDb();
// api router
app.use('/api/v1', v1Routes);

module.exports = app.listen(env.PORT, () => {
	console.log(`Started on port ${env.PORT}`);
});
