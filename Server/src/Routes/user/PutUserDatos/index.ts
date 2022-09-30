import {Router} from 'express';
import User, { IUser } from '../../../Models/user';


const router = Router();

router.put('/datoss', async(req, res, next)=>{
    const {name, lastname, dni, fechaNacimiento, direccion, id} =req.body;
    try{
        await User.findByIdAndUpdate(id, {
            name, lastname, dni, fechaNacimiento, direccion
          });
          // Send response in here
          res.send('Item Updated!');    
    } catch (error){
        next(error)
    }
})

export default router;