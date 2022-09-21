import {Router} from 'express';
import Proveedores from '../../../Models/proveedores'



const router = Router();

router.post('/create', async(req, res, next)=>{
    const {name, direecion,telefono, cuit, email, web} =req.body;
    try{
        const proveedores = new Proveedores({name, direecion,telefono, cuit, email, web})
        await proveedores.save()
        res.status(201).json('proveedor adherido correctamente')
    } catch (error){
        next(error)
    }
})

export default router;