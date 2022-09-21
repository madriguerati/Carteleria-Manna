import {Router} from 'express';
import Clientes from '../../../Models/clientes'


const router = Router();

router.post('/create', async(req, res, next)=>{
    const {name, telefono, cuit, direccion, email, web} =req.body;
    try{
        const clientes = new Clientes({name, telefono, cuit, direccion, email, web})
        await clientes.save()
        res.status(201).json('cliente adherido correctamente')
    } catch (error){
        next(error)
    }
})

export default router;