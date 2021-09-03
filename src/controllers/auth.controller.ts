import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { ErrorCode } from '../common/error/errorCode';
import { logger } from '../index';

export const CONTROLLER_NAME = '/auth';
const router = express.Router();

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('login', async (error, user, info) => {
    if (error) {
      res.status(ErrorCode.SERVER_ERROR.status).json({
        data: null,
        error: ErrorCode.SERVER_ERROR.message
      });
      return;
    }

    if (info) {
      const errorMessage = JSON.parse(info.message);
      res.status(errorMessage.status).json({
        data: null,
        error: errorMessage.message
      });
      return;
    }

    req.login(user, (err) => {
      if (err) {
        res.status(ErrorCode.SERVER_ERROR.status).json({
          data: null,
          error: ErrorCode.SERVER_ERROR.message
        });
        return;
      }

      logger.info(`${user.uuid} Login`);

      const result = user;
      result.password = null;

      res.status(200).json({
        data: result,
        error: null
      });
    });
  })(req, res, next);
});

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('register', async (error, user, info) => {
    if (error) {
      res.status(ErrorCode.SERVER_ERROR.status).json({
        data: null,
        error: ErrorCode.SERVER_ERROR.message
      });
      return;
    }

    if (info) {
      const errorMessage = JSON.parse(info.message);
      res.status(errorMessage.status).json({
        data: null,
        error: errorMessage.message
      });
      return;
    }

    res.status(201).json({
      data: user,
      error: null
    });

    logger.info(`${user.uuid} Register`);
  })(req, res, next);
});

router.delete('/logout', (req: express.Request, res: express.Response) => {
  const result = req.user;

  if (!result) return;

  logger.info(`${result.uuid} Logout`);
  req.logout();

  res.status(200).json({
    data: result,
    error: null
  });
});

export default router;
