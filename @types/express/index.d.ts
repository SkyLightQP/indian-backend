import { IErrorCode } from '../../src/common/error/errorCode';

export {};

declare global {
  namespace Express {
    interface UserModel {
      readonly uuid: string;
      readonly id: string;
      readonly password: string;
      readonly email: string;
      readonly nickname: string;
      readonly createdAt: Date;
      readonly updatedAt: Date;
      readonly deletedAt?: Date;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface User extends UserModel {}

    export interface Response {
      sendData: (status: number, data: unknown) => void;
      sendError: (error: IErrorCode) => void;
      sendErrorMessage: (status: number, message: string) => void;
    }
  }
}
