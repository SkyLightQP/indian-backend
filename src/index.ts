import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import log4js from 'log4js';
import passport from 'passport';
import session from 'express-session';
import { db } from './database';
import { registerPassport } from './auth';
import { config } from './config';
import Router from './controllers';
import { IErrorCode } from './common/error/errorCode';

export const app = express();
export const logger = log4js.getLogger();

app.response.sendData = function (status: number, data: unknown) {
  this.status(status).json({
    data,
    error: null
  });
};
app.response.sendError = function (error: IErrorCode) {
  this.status(error.status).json({
    data: null,
    error: error.message
  });
};
app.response.sendErrorMessage = function (status: number, error: string) {
  this.status(status).json({
    data: null,
    error
  });
};

log4js.configure({
  appenders: {
    default: {
      type: 'console'
    }
  },
  categories: {
    default: {
      appenders: ['default'],
      level: 'DEBUG'
    }
  }
});
logger.level = 'ALL';

app.set('trust proxy', true);
app.use(helmet());
app.use(cors({ origin: [config.CORS, 'http://localhost:3000'], credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: Date.now() + 7 * 86400 * 1000
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

db().catch((e) => {
  logger.error(`데이터베이스 연결 중 오류가 발생하였습니다:`, e);
});

registerPassport();

app.use('/', Router);
