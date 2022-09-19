import { Router } from 'express';

import User, { IUser } from '../../../Models/user';
import jwt from "jsonwebtoken";
import config from "../../../config/ConfigEntorno/config";
import createToken from '../../../Controllers/Token/createdToken'

const router = Router();

router.post('/singIn', async(req, res, next) =>{
    if (!req.body.email || !req.body.password) {
        return res
          .status(400)
          .json({ msg: "Please. Send your email and password" });
      }
    
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ msg: "The User does not exists" });
      }
    
      const isMatch = await user.comparePassword(req.body.password);
      if (isMatch) {
        return res.status(400).json({ token: createToken(user) });
      }
    
      return res.status(400).json({
        msg: "The email or password are incorrect"
      });
}

)

export default router;