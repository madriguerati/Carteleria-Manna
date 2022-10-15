import {Router} from 'express';
import Carteles from '../../../Models/carteles'


const router = Router();

router.post('/create', async(req, res, next)=>{
    const {descripcion, costo1faz, costo2faz, insumos} =req.body;
    try{
        const carteles = new Carteles({descripcion, costo1faz, costo2faz, insumos:[insumos]})
        await carteles.save()
        res.status(201).json('cartel adherido correctamente')
    } catch (error){
        next(error)
    }
})

export default router;