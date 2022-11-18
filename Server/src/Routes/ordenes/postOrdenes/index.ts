import {Router} from 'express';
import Ordenes from '../../../Models/ordenes'


const router = Router();

router.post('/create', async(req, res, next)=>{
    const {fecha, cliente, entregadoCarteleria, fechaentrega,  montototal, contacto, stateImpresiones, carteles, stateCarteleria, operacion, lugardecolocacion, lugartraslado, seña, formadepago, facturanum, observaciones} =req.body;
    console.log("hola soy una orden", carteles)
    try{
        const ordenes = new Ordenes({fecha, cliente, entregadoCarteleria, contacto, stateImpresiones, stateCarteleria, carteles, operacion, lugardecolocacion, lugartraslado, seña, formadepago, fechaentrega, facturanum, observaciones, montototal})
        await ordenes.save()
        res.status(201).json('insumo adherido correctamente')
    } catch (error){
        next(error)
    }
})

export default router;