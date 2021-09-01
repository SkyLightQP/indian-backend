import { getRepository } from 'typeorm';
import { User } from '../models/user';
import { HttpException } from '../common/exception';
import { ErrorCode } from '../common/error/errorCode';

const userRepository = getRepository(User);

export const getUsers = async (): Promise<User[]> => {
  return userRepository.find();
};

export const getUserByUuid = async (uuid: string): Promise<User> => {
  const user = await userRepository.findOne({
    where: {
      uuid
    }
  });
  if (!user) throw new HttpException(ErrorCode.USER_NOT_FOUND.message, ErrorCode.USER_NOT_FOUND.status);
  return user;
};

export const getUserById = async (id: string): Promise<User> => {
  const user = await userRepository.findOne({
    where: {
      id
    }
  });
  if (!user) throw new HttpException(ErrorCode.USER_NOT_FOUND.message, ErrorCode.USER_NOT_FOUND.status);
  return user;
};
