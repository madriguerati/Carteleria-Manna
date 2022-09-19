import { Router } from 'express';

import User, { IUser } from '../../../Models/user';
import jwt from "jsonwebtoken";
import config from "../../../config/ConfigEntorno/config";

const router = Router();

router.get('/singUp', async(req, res, next) =>{
    if (!req.body.email || !req.body.password) {
        return res
          .status(400)
          .json({ msg: "Please. Send your email and password" });
      }
    
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ msg: "The User already Exists" });
      }
    
      const newUser = new User(req.body);
      await newUser.save();
      return res.status(201).json(newUser);

})

export default router;
