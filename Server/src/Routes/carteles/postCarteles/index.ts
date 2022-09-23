import {Router} from 'express';
import Carteles from '../../../Models/carteles'


const router = Router();

router.post('/create', async(req, res, next)=>{
    const {cantidad, cartel, base, altura, medidas, faz, valor, total, estructura, archivo, otros} =req.body;
    try{
        const carteles = new Carteles({cantidad, cartel, base, altura, medidas, faz, valor, total, estructura, archivo, otros})
        await carteles.save()
        res.status(201).json('cartel adherido correctamente')
    } catch (error){
        next(error)
    }
})

export default router;