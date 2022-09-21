import {Router} from 'express';
import Proveedores from '../../../Models/proveedores'



const router = Router();

router.put('/', async(req, res, next)=>{
    const {name, direecion,telefono, cuit, email, web, id} =req.body;
    try{
        await Proveedores.findByIdAndUpdate(id, {
            name, direecion,telefono, cuit, email, web
          });
          // Send response in here
          res.send('Item Updated!');    
    } catch (error){
        next(error)
    }
})

export default router;