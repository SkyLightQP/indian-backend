import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { ErrorCode } from '../common/error/errorCode';
import { logger } from '../index';
import { authenticated } from '../common/middlewares/auth.middleware';
import { validateBody } from '../common/middlewares/validator.middleware';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';

export const CONTROLLER_NAME = '/auth';
const router = express.Router();

router.post('/login', validateBody(AuthLoginDto), (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('login', async (error, user, info) => {
    if (error) {
      res.sendError(ErrorCode.SERVER_ERROR);
      return;
    }

    if (info) {
      const errorMessage = JSON.parse(info.message);
      res.sendErrorMessage(errorMessage.status, errorMessage.message);
      return;
    }

    req.login(user, (err) => {
      if (err) {
        res.sendError(ErrorCode.SERVER_ERROR);
        return;
      }

      logger.info(`${user.uuid} Login`);

      const result = user;
      result.password = null;

      res.sendData(200, result);
    });
  })(req, res, next);
});

router.post('/register', validateBody(AuthRegisterDto), async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('register', async (error, user, info) => {
    if (error) {
      res.sendError(ErrorCode.SERVER_ERROR);
      return;
    }

    if (info) {
      const errorMessage = JSON.parse(info.message);
      res.sendErrorMessage(errorMessage.status, errorMessage.message);
      return;
    }

    res.sendData(201, user);

    logger.info(`${user.uuid} Register`);
  })(req, res, next);
});

router.delete('/logout', authenticated, (req: Request, res: Response) => {
  const result = req.user;

  if (!result) return;

  logger.info(`${result.uuid} Logout`);
  req.logout();

  res.sendData(200, result);
});

router.get('/me', authenticated, (req: Request, res: Response) => {
  res.sendData(200, req.user);
});

export default router;
