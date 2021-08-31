import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import log4js from 'log4js';
import { sequelize } from './database';

export const app = express();
export const logger = log4js.getLogger();

dotenv.config();

log4js.configure({
  appenders: {
    console: {
      type: 'console'
    },
    default: {
      type: 'file',
      filename: 'logs/log.log',
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
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

sequelize.sync().catch((e) => {
  logger.error(`데이터베이스 오류: ${e}`);
});
