import { companyBoardRepository } from '../database';
import { HttpException } from '../common/exception';
import { ErrorCode } from '../common/error/errorCode';
import { CompanyBoard } from '../models/companyBoard.model';
import { getUserByUuid } from './user.service';

interface CreateAndUpdateCompanyBoardProps {
  name: string;
  description?: string;
  tags?: string;
  link: string;
  image?: string;
  writerUuid: string;
}

export const getCompanyBoards = async (): Promise<CompanyBoard[]> => {
  return companyBoardRepository().find();
};

export const getCompanyBoard = async (id: string): Promise<CompanyBoard> => {
  const result = await companyBoardRepository().findOne({
    where: {
      id
    }
  });
  if (!result)
    throw new HttpException(ErrorCode.COMPANY_BOARD_NOT_FOUND.message, ErrorCode.COMPANY_BOARD_NOT_FOUND.status);
  return result;
};

export const createCompanyBoard = async (props: CreateAndUpdateCompanyBoardProps): Promise<CompanyBoard> => {
  if (props.writerUuid) {
    const user = await getUserByUuid(props.writerUuid);
    if (!user) throw new HttpException(ErrorCode.USER_NOT_FOUND.message, ErrorCode.USER_NOT_FOUND.status);
  }

  const result = await companyBoardRepository().findOne({
    where: {
      name: props.name
    }
  });
  if (result) {
    throw new HttpException(
      ErrorCode.COMPANY_BOARD_ALREADY_EXISTS.message,
      ErrorCode.COMPANY_BOARD_ALREADY_EXISTS.status
    );
  }

  return companyBoardRepository().save(props);
};

export const updateCompanyBoard = async (
  id: string,
  data: Omit<Partial<CreateAndUpdateCompanyBoardProps>, 'writerId'>
): Promise<CompanyBoard> => {
  const company = await getCompanyBoard(id);
  const { raw } = await companyBoardRepository().update(
    {
      id: company.id
    },
    data
  );
  return raw[0];
};

export const deleteCompanyBoard = async (id: string): Promise<void> => {
  const company = await getCompanyBoard(id);
  await companyBoardRepository().delete({
    id: company.id
  });
};
