import {Router} from 'express';
import Ordenes from '../../../Models/ordenes'
import User from '../../../Models/user'



const router = Router();

router.post('/create', async(req, res, next)=>{
    const {idUser, fecha, cliente, fechaentrega, resta, restaHistory,  montototal, contacto, stateImpresiones, carteles, stateCarteleria, operacion, lugardecolocacion,  seña, formadepago, facturanum, observaciones} =req.body;
    
    try{
        const ordenesNew:any = new Ordenes({fecha, cliente, resta, restaHistory, contacto, stateImpresiones, stateCarteleria, carteles, operacion, lugardecolocacion, seña, formadepago, fechaentrega, facturanum, observaciones, montototal})
        await ordenesNew.save()
        const user:any = await User.findById(idUser)

       if(user){
        user.ordenes.push(ordenesNew._id);
        await user.save(ordenesNew._id);
        console.log("hola soy un user", ordenesNew._id)
       }
        res.status(201).json('insumo adherido correctamente')
    } catch (error){
        next(error)
    }
})

export default router;