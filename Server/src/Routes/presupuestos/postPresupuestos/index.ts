import {Router} from 'express';
import Presupuestos from '../../../Models/presupuesto'


const router = Router();

router.post('/create', async(req, res, next)=>{
    const {fecha, clientes,  carteles, operacion, lugardecolocacion,  montototal, formadepago, plazodeentrega, fechavalida, observaciones} =req.body;
    try{
        const presupuestos = new Presupuestos({fecha, clientes,  carteles:[carteles], operacion, lugardecolocacion,  montototal, formadepago, plazodeentrega, fechavalida, observaciones})
        await presupuestos.save()
        res.status(201).json('Presupuestos adherido correctamente')
    } catch (error){
        next(error)
    }
})

export default router;