import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { loggerMiddleware } from './middlewares';
import router from './routers';
import passport from 'passport';
import { configurePassport } from './config';

const app: Express = express();
dotenv.config();

app.use(passport.initialize());
configurePassport(passport);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(loggerMiddleware);

app.use(router);
export { app };
