import {Router} from 'express';

const router = Router();

//user
import SignUp from './user/SignUp'
import SignIn from './user/SignIn'

router.use('/user', SignUp)
router.use('/user', SignIn)

//insumo
import PostInsumo from './insumo/postInsumo'
import GetInsumo from './insumo/getInsumo'


router.use('/insumo', PostInsumo)
router.use('/insumo', GetInsumo)






export default router