import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Validator } from 'class-validator';
import { plainToClass } from 'class-transformer';

export const validateBody =
  <T>(dto: { new (): T extends unknown ? any : any }) =>
  (req: Request, res: Response, next: NextFunction): RequestHandler | undefined => {
    const validator = new Validator();
    const error = validator.validateSync(plainToClass(dto, req.body));

    if (error.length > 0) {
      res.status(400).json({
        data: null,
        error
      });
      return;
    }

    next();
  };
