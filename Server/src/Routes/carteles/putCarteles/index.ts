import {Router} from 'express';
import Carteles from '../../../Models/carteles'


const router = Router();

router.put('/', async(req, res, next)=>{
    const {cantidad, cartel, base, altura, medidas, faz, valor, total, estructura, archivo, otros, id} =req.body;
    try{
        await Carteles.findByIdAndUpdate(id, {
            cantidad, cartel, base, altura, medidas, faz, valor, total, estructura, archivo, otros
          });
          // Send response in here
          res.send('Item Updated!');    
    } catch (error){
        next(error)
    }
})

export default router;