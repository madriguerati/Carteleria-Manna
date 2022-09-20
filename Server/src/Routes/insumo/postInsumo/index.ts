import {Router} from 'express';
import Insumo from '../../../Models/insumo'


const router = Router();

router.post('/create', async(req, res, next)=>{
    const {name, descripcion, unidad, costo, categoria} =req.body;
    try{
        const insumo = new Insumo({name, descripcion, unidad, costo, categoria:[categoria]})
        await insumo.save()
        res.status(201).json('insumo adherido correctamente')
    } catch (error){
        next(error)
    }
})

export default router;