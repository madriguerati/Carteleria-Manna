import config from '../../../config/ConfigEntorno/config';
import { IUser } from '../../../Models/user';
import jwt from 'jsonwebtoken';

function createToken(user: IUser) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
      expiresIn: 86400
    });
  }

  export default createToken;