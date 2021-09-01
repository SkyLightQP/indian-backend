import { HttpStatus } from '../types/httpStatus';

export class HttpException extends Error {
  public httpStatus: HttpStatus;

  constructor(message: string, httpStatus: HttpStatus) {
    super(message);
    this.message = message;
    this.name = 'HttpError';
    this.httpStatus = httpStatus;
  }
}
