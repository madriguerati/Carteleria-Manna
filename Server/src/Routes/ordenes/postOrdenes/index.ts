import {Router} from 'express';
import Ordenes from '../../../Models/ordenes'


const router = Router();

router.post('/create', async(req, res, next)=>{
    const {fecha, cliente, contacto, carteles, operacion, lugardecolocacion, lugartraslado, seña, formadepago, fechaentrega, facturanum, observaciones} =req.body;
    try{
        const ordenes = new Ordenes({fecha, cliente, contacto, carteles, operacion, lugardecolocacion, lugartraslado, seña, formadepago, fechaentrega, facturanum, observaciones})
        await ordenes.save()
        res.status(201).json('insumo adherido correctamente')
    } catch (error){
        next(error)
    }
})

export default router;