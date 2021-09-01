import { createConnection } from 'typeorm';
import { config } from '../config';
import { User } from '../models/user';
import { Company } from '../models/company';
import { CompanyBoard } from '../models/companyBoard';
import { GameBoard } from '../models/gameBoard';

export const db = (): ReturnType<typeof createConnection> =>
  createConnection({
    type: 'mysql',
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    username: config.DATABASE_USERNAME,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_DB,
    entities: [User, Company, CompanyBoard, GameBoard],
    synchronize: process.env.NODE_ENV !== 'production'
  });
