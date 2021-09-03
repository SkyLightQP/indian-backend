import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { getUserById } from '../services/user.service';
import { logger } from '../index';
import { ErrorCode } from '../common/error/errorCode';
import { HttpException } from '../common/exception';

export default (): void => {
  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'id',
        passwordField: 'password',
        passReqToCallback: true
      },
      async (req, id, password, done) => {
        try {
          const user = await getUserById(id);

          if (!bcrypt.compareSync(password, user.password)) {
            logger.warn(`${user.uuid} ${user.id} 사용자 비밀번호가 틀렸습니다.`);
            return done(null, false, {
              message: JSON.stringify({
                message: ErrorCode.USER_NOT_FOUND.message,
                status: ErrorCode.USER_NOT_FOUND.status
              })
            });
          }

          return done(null, user);
        } catch (e) {
          if (e instanceof HttpException) {
            const message = JSON.stringify({
              message: e.message,
              status: e.httpStatus
            });
            return done(null, false, { message });
          }

          return done(e);
        }
      }
    )
  );
};
