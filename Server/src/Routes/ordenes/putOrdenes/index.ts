import {Router} from 'express';
import Ordenes from '../../../Models/ordenes'


const router = Router();

router.put('/', async(req, res, next)=>{
    const {fecha, cliente, fechadeentrega, montototal, contacto, carteles, operacion, lugardecolocacion, lugartraslado, seña, formadepago, fechaentrega, facturanum, observaciones, id} =req.body;
    try{
        await Ordenes.findByIdAndUpdate(id, {
            fecha, cliente, fechadeentrega, montototal, contacto, carteles, operacion, lugardecolocacion, lugartraslado, seña, formadepago, fechaentrega, facturanum, observaciones 
          });
          // Send response in here
          res.send('Item Updated!');    
    } catch (error){
        next(error)
    }
})

export default router;