import { NextFunction, Request, Response } from 'express';
import { ErrorCode } from '../error/errorCode';

export const authenticated = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.isAuthenticated() || !req.user) {
    res.sendError(ErrorCode.UNAUTHORIZATION);
    return;
  }

  next();
};
