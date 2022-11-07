import {Router} from 'express';
import Role from '../../../Models/roles';
import Clientes from '../../../Models/clientes'


const router = Router();

router.get('/allclientes', async(req: any, res: any, next)=>{
    
    try{
        const page : number = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 12;

        const clientes = await Clientes.find() 
            
            .skip(page*limit)
            .limit(limit)

        const total = await Clientes.countDocuments({
           // username: {$regex: search, $options: 'i'},
        });

        const response = {
            error: false,
            total,
            page: page + 1,
            totalPages: Math.ceil(total / limit),
            limit,
            clientes,
        };
        console.log("hola soy un total", total)
        res.status(200).json(response)   
    } catch (error){
        next(error)
    }
})

export default router;