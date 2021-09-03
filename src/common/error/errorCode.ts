import { HttpStatus } from '../types/httpStatus';

export interface IErrorCode {
  message: string;
  status: HttpStatus;
}

const createError = <T extends Record<string, IErrorCode>>(body: T): T => body;

export const ErrorCode = createError({
  SERVER_ERROR: {
    message: '잠시후 다시 시도해주세요.',
    status: 500
  },
  UNAUTHORIZATION: {
    message: '권한이 없습니다.',
    status: 403
  },
  USER_NOT_FOUND: {
    message: '존재하지 않는 사용자입니다.',
    status: 404
  },
  USER_ALREADY_EXISTS: {
    message: '이미 사용 중인 아이디입니다.',
    status: 409
  }
});
