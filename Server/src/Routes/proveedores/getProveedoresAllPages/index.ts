import {Router} from 'express';
import Role from '../../../Models/roles';
import Proveedores from '../../../Models/proveedores'


const router = Router();

router.get('/allproveedores', async(req: any, res: any, next)=>{
    
    try{
        const page : number = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 12;

        const proveedores = await Proveedores.find() 
            
            .skip(page*limit)
            .limit(limit)

        const total = await Proveedores.countDocuments({
           // username: {$regex: search, $options: 'i'},
        });

        const response = {
            error: false,
            total,
            page: page + 1,
            totalPages: Math.ceil(total / limit),
            limit,
            proveedores,
        };
        res.status(200).json(response)   
    } catch (error){
        next(error)
    }
})

export default router;