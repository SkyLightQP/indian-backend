import passport from 'passport';
import LoginStrategy from './login.strategy';
import RegisterStrategy from './register.strategy';
import { User } from '../models/user.model';

export const registerPassport = (): void => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: User, done) => {
    done(null, user);
  });

  LoginStrategy();
  RegisterStrategy();
};
