import {Router} from 'express';
import Role from '../../../Models/roles';
import Ordenes from '../../../Models/ordenes'


const router = Router();

router.get('/all', async(req: any, res: any, next)=>{
    
    try{
        const page : number = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 12;
        const name = parseInt(req.query.name) || '';

console.log("holaaaaaaaaaaaaaa", name)
        const ordenes = await Ordenes.find({ facturanum: { $regex: '.*' + name + '.*', $options: 'i' }}) 
            
            .skip(page*limit)
            .limit(limit)
            console.log(ordenes)  

        const total = await Ordenes.countDocuments({
            facturanum: {$regex: name, $options: 'i'},

        });

        const response = {
            error: false,
            total,
            page: page + 1,
            totalPages: Math.ceil(total / limit),
            limit,
            ordenes,
        };
        res.status(200).json(response)
    } catch (error){
        next(error)
    }
})

export default router;