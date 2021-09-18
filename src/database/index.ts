import { createConnection, getConnection, Repository } from 'typeorm';
import { config } from '../config';
import { User } from '../models/user.model';
import { CompanyBoard } from '../models/companyBoard.model';
import { GameBoard } from '../models/gameBoard.model';

export const db = async (): ReturnType<typeof createConnection> =>
  createConnection({
    type: 'mysql',
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    username: config.DATABASE_USERNAME,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_DB,
    entities: [User, CompanyBoard, GameBoard],
    synchronize: process.env.NODE_ENV !== 'production'
  });

export const userRepository = (): Repository<User> => getConnection().getRepository(User);
export const companyBoardRepository = (): Repository<CompanyBoard> => getConnection().getRepository(CompanyBoard);
export const gameBoardRepository = (): Repository<GameBoard> => getConnection().getRepository(GameBoard);
