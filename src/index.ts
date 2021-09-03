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

export const app = express();
export const logger = log4js.getLogger();

log4js.configure({
  appenders: {
    console: {
      type: 'console'
    },
    default: {
      type: 'file',
      filename: 'logs/indian.log',
      pattern: '-yyyy-MM-dd',
      compress: true
    }
  },
  categories: {
    default: {
      appenders: ['default', 'console'],
      level: 'DEBUG'
    }
  }
});
logger.level = 'ALL';

app.set('trust proxy', true);
app.use(helmet());
app.use(cors({ origin: config.CORS, credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: Date.now() + 7 * 86400 * 1000
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

db().catch((e) => {
  logger.error(`데이터베이스 오류: ${e}`);
});

registerPassport();

app.use('/', Router);
