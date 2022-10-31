import {Router} from 'express';
import Ordenes from '../../../Models/ordenes'


const router = Router();

router.post('/create', async(req, res, next)=>{
    const {fecha, cliente, fechaentrega, montototal, contacto, carteles, operacion, lugardecolocacion, lugartraslado, seña, formadepago, facturanum, observaciones} =req.body;
    console.log("hola soy una orden", fecha)
    try{
        const ordenes = new Ordenes({fecha, cliente, contacto, carteles:[carteles], operacion, lugardecolocacion, lugartraslado, seña, formadepago, fechaentrega, facturanum, observaciones, montototal})
        await ordenes.save()
        res.status(201).json('insumo adherido correctamente')
    } catch (error){
        next(error)
    }
})

export default router;