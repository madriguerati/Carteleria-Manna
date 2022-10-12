import {Router} from 'express';
import Insumo from '../../../Models/insumo'


const router = Router();

router.post('/create', async(req, res, next)=>{
    const {name, descripcion, unidad, costo, category} =req.body;
    try{
        const insumo = new Insumo({name, descripcion, unidad, costo, category:[category]})
        await insumo.save()
        res.status(201).json('insumo adherido correctamente')
    } catch (error){
        next(error)
    }
})

export default router;