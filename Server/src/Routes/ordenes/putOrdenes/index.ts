import {Router} from 'express';
import Ordenes from '../../../Models/ordenes'


const router = Router();

router.put('/', async(req, res, next)=>{
    const {fecha, cliente, fechadeentrega, entregadoCarteleria, montototal,entregadoImpresiones, stateImpresiones, contacto, carteles, operacion, lugardecolocacion, lugartraslado, seña, formadepago, fechaentrega, facturanum, stateCarteleria, observaciones, id} =req.body;
   console.log("hoy esto es un cambio", stateCarteleria)
    try{
        await Ordenes.findByIdAndUpdate(id, {
            fecha, cliente, fechadeentrega, montototal, entregadoCarteleria, entregadoImpresiones, contacto, stateImpresiones, carteles, operacion, lugardecolocacion, lugartraslado, seña, stateCarteleria, formadepago, fechaentrega, facturanum, observaciones 
          });
          // Send response in here
          res.send('Item Updated!');
          console.log("hoy esto es un cambi despueso", stateCarteleria, id)    
    } catch (error){
        next(error)
    }
})

export default router;