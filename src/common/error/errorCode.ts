import { HttpStatus } from '../types/httpStatus';

interface IErrorCode {
  message: string;
  status: HttpStatus;
}

const createError = <T extends Record<string, IErrorCode>>(body: T): T => body;

export const ErrorCode = createError({
  USER_NOT_FOUND: {
    message: '존재하지 않는 사용자입니다.',
    status: 404
  },
  USER_ALREADY_EXISTS: {
    message: '이미 사용 중인 아이디입니다.',
    status: 409
  }
});
