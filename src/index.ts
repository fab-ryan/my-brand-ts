import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { loggerMiddleware } from './middlewares';
import router from './routers';
const app: Express = express();

dotenv.config();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(loggerMiddleware);

app.use(router);
export { app };
