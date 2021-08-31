import { Sequelize } from 'sequelize-typescript';
import { config } from '../config';
import { User } from '../models/user';
import { CompanyBoard } from '../models/companyBoard';
import { GameBoard } from '../models/gameBoard';
import { Company } from '../models/company';

export const sequelize = new Sequelize({
  database: config.DATABASE_DB,
  host: config.DATABASE_HOST,
  port: config.DATABASE_PORT,
  dialect: 'mysql',
  username: config.DATABASE_USERNAME,
  password: config.DATABASE_PASSWORD,
  models: [User, Company, CompanyBoard, GameBoard],
  logging: process.env.NODE_ENV !== 'production'
});
