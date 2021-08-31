import dotenv from 'dotenv';

dotenv.config();

export const config = {
  DATABASE_HOST: process.env.DATABASE_HOST ?? 'localhost',
  DATABASE_PORT: Number(process.env.DATABASE_PORT) ?? 3306,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME ?? 'user',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD ?? '',
  DATABASE_DB: process.env.DATABASE_DB ?? 'indian'
};
