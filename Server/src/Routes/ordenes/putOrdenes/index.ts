import {Router} from 'express';
import Ordenes from '../../../Models/ordenes'


const router = Router();

router.put('/', async(req, res, next)=>{
    const {fecha, cliente, fechadeentrega, montototal,contacto, carteles, operacion, lugardecolocacion, seña, formadepago, fechaentrega, facturanum,  observaciones, id} =req.body;
    console.log("hoy esto es un cambi despueso", fecha, cliente, fechadeentrega,  montototal,  contacto, operacion, lugardecolocacion, seña, formadepago, fechaentrega, facturanum, observaciones, id )  
    try{
        await Ordenes.findByIdAndUpdate(id, {
            fecha, cliente, fechadeentrega, montototal, contacto, carteles, operacion, lugardecolocacion,  seña, formadepago, fechaentrega, facturanum, observaciones 
          });
          // Send response in here
          res.send('Item Updated!');
          console.log("hoy esto es un cambi despueso",fecha, cliente, fechadeentrega,  montototal,  contacto,  operacion, lugardecolocacion,  seña, formadepago, fechaentrega, facturanum, observaciones, id )    
    } catch (error){
        next(error)
    }
})

export default router;