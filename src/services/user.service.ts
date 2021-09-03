import { getRepository } from 'typeorm';
import { User } from '../models/user';
import { HttpException } from '../common/exception';
import { ErrorCode } from '../common/error/errorCode';

const userRepository = getRepository(User);

interface CreateUserProps {
  id: string;
  password: string;
  email: string;
  nickname: string;
}

interface UpdateUserProps {
  password: string;
  email: string;
  nickname: string;
}

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

export const createUser = async (props: CreateUserProps): Promise<User> => {
  const user = await userRepository.findOne({
    where: {
      id: props.id
    }
  });
  if (user) throw new HttpException(ErrorCode.USER_ALREADY_EXISTS.message, ErrorCode.USER_ALREADY_EXISTS.status);

  return userRepository.create(props);
};

export const updateUser = async (uuid: string, data: Partial<UpdateUserProps>): Promise<User> => {
  const user = await getUserByUuid(uuid);
  const { raw } = await userRepository.update(
    {
      uuid: user.uuid
    },
    data
  );
  return raw[0];
};

export const deleteUser = async (uuid: string): Promise<void> => {
  const user = await getUserByUuid(uuid);
  await userRepository.softDelete({
    uuid: user.uuid
  });
};
