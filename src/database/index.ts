import { Sequelize } from 'sequelize-typescript';
import { config } from '../config';

export const sequelize = new Sequelize({
  database: config.DATABASE_DB,
  host: config.DATABASE_HOST,
  port: config.DATABASE_PORT,
  dialect: 'mysql',
  username: config.DATABASE_USERNAME,
  password: config.DATABASE_PASSWORD,
  models: [`${__dirname}/models`]
});
