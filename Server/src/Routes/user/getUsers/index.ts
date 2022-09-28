import {Router} from 'express';
import User from '../../../Models/user'


const router = Router();

router.get('/', async(req, res, next)=>{
    try{
        const users = await User.find() 

        res.status(200).json(users)   
    } catch (error){
        next(error)
    }
})

export default router;