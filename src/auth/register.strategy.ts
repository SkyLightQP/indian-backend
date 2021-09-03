import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { config } from '../config';
import { createUser } from '../services/user.service';
import { HttpException } from '../common/exception';

export default (): void => {
  passport.use(
    'register',
    new LocalStrategy(
      {
        usernameField: 'id',
        passwordField: 'password',
        passReqToCallback: true
      },
      async (req, id, password, done) => {
        try {
          const { email, nickname } = req.body;

          const hashed = await bcrypt.hash(password, config.SALT);
          const result = await createUser({
            id,
            password: hashed,
            email,
            nickname
          });

          return done(null, result);
        } catch (e) {
          if (e instanceof HttpException) {
            const message = JSON.stringify({
              message: e.message,
              status: e.httpStatus
            });
            return done(null, undefined, { message });
          }
          return done(e);
        }
      }
    )
  );
};
