import passportJwt from 'passport-jwt';
import { currentConfig } from './config';
import { PassportStatic } from 'passport';
import { UserModel } from '../models';

const strategy = passportJwt.Strategy;
const extractJwt = passportJwt.ExtractJwt;

const options = {
  secretOrKey: currentConfig.secret,
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
};

type Payload = {
  id: string;
  email: string;
  iat: number;
  exp: number;
};

export const configurePassport = (passport: PassportStatic) => {
  passport.use(
    new strategy(options, async (payload: Payload, done) => {
      try {
        const user = await UserModel.findById(payload.id);
        if (user) {
          const UserPayload = {
            id: user?._id,
            email: user?.email,
            role: user?.role,
          };
          return done(null, UserPayload);
        }
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    }),
  );
};

const checkTime = (exp: number) => {
  return exp < Date.now();
};
