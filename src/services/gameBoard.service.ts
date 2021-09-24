import { gameBoardRepository } from '../database';
import { HttpException } from '../common/exception';
import { ErrorCode } from '../common/error/errorCode';
import { getUserByUuid } from './user.service';
import { GameBoard } from '../models/gameBoard.model';
import { getCompanyBoard } from './companyBoard.service';

interface CreateAndUpdateGameBoardProps {
  title: string;
  content: string;
  tags: string;
  startLink: string;
  image?: string;
  companyId: string;
  writerId?: string;
}

export const getGameBoards = async (): Promise<GameBoard[]> => {
  return gameBoardRepository().find();
};

export const getGameBoard = async (id: string): Promise<GameBoard> => {
  const result = await gameBoardRepository().findOne({
    where: {
      id
    }
  });
  if (!result) throw new HttpException(ErrorCode.GAME_BOARD_NOT_FOUND.message, ErrorCode.GAME_BOARD_NOT_FOUND.status);
  return result;
};

export const createGameBoard = async (props: CreateAndUpdateGameBoardProps): Promise<GameBoard> => {
  if (props.writerId) {
    const user = await getUserByUuid(props.writerId);
    if (!user) throw new HttpException(ErrorCode.USER_NOT_FOUND.message, ErrorCode.USER_NOT_FOUND.status);
  }

  if (!(await getCompanyBoard(props.companyId))) {
    throw new HttpException(ErrorCode.COMPANY_BOARD_NOT_FOUND.message, ErrorCode.COMPANY_BOARD_NOT_FOUND.status);
  }

  const result = await gameBoardRepository().findOne({
    where: {
      title: props.title
    }
  });
  if (result) {
    throw new HttpException(ErrorCode.GAME_BOARD_ALREADY_EXISTS.message, ErrorCode.GAME_BOARD_ALREADY_EXISTS.status);
  }

  return gameBoardRepository().save(props);
};

export const updateGameBoard = async (
  id: string,
  data: Omit<Partial<CreateAndUpdateGameBoardProps>, 'writerId' | 'companyId'>
): Promise<GameBoard> => {
  const game = await getGameBoard(id);
  const { raw } = await gameBoardRepository().update(
    {
      id: game.id
    },
    data
  );
  return raw[0];
};

export const deleteGameBoard = async (id: string): Promise<void> => {
  const game = await getGameBoard(id);
  await gameBoardRepository().delete({
    id: game.id
  });
};
