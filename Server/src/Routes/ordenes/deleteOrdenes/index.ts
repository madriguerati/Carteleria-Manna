import {Router} from 'express';
import Ordenes from '../../../Models/ordenes'


const router = Router();

router.delete('/:id', async(req, res, next)=>{
    const {id} =req.params;
     try{
        let deleteOrdenes = await Ordenes.findByIdAndDelete(id);
        res.status(200).json({message: 'insumo deleted'});
        
    } catch (error){
        next(error)
    }
})

export default router;