import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import log4js from 'log4js';
import { db } from './database';
import { registerPassport } from './auth';
import { config } from './config';

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

db().catch((e) => {
  logger.error(`데이터베이스 오류: ${e}`);
});

registerPassport();
