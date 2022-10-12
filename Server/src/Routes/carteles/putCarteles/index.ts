import {Router} from 'express';
import Carteles from '../../../Models/carteles'


const router = Router();

router.put('/', async(req, res, next)=>{
    const {descripcion, costo1, costo2, insumos, id} =req.body;
    try{
        await Carteles.findByIdAndUpdate(id, {
            descripcion, costo1, costo2, insumos
          });
          // Send response in here
          res.send('Item Updated!');    
    } catch (error){
        next(error)
    }
})

export default router;