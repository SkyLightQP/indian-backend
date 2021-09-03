import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { ErrorCode } from '../common/error/errorCode';
import { logger } from '../index';

export const CONTROLLER_NAME = '/auth';
const router = express.Router();

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
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

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
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

router.delete('/logout', (req: express.Request, res: express.Response) => {
  const result = req.user;

  if (!result) return;

  logger.info(`${result.uuid} Logout`);
  req.logout();

  res.sendData(200, result);
});

export default router;
