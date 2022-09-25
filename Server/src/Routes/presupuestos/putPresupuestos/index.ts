import {Router} from 'express';
import Presupuestos from '../../../Models/presupuesto'


const router = Router();

router.put('/', async(req, res, next)=>{
    const {fecha, clientes, contacto, carteles, operacion, lugardecolocacion, lugartraslado, montototal, formadepago, plazodeentrega, fechavalida, observaciones, id} =req.body;
    try{
        await Presupuestos.findByIdAndUpdate(id, {
            fecha, clientes, contacto, carteles, operacion, lugardecolocacion, lugartraslado, montototal, formadepago, plazodeentrega, fechavalida, observaciones
          });
          // Send response in here
          res.send('Item Updated!');    
    } catch (error){
        next(error)
    }
})

export default router;