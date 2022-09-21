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
import DeleteInsumo from './insumo/deleteInsumo'
import PutInsumo from './insumo/putInsumo'

router.use('/insumo', PostInsumo)
router.use('/insumo', GetInsumo)
router.use('/insumo', DeleteInsumo)
router.use('/insumo', PutInsumo)

//clientes
import PostClientes from './clientes/postClientes'
import GetClientes from './clientes/getClientes'
import PutClientes from './clientes/putClientes'
import DeleteClientes from './clientes/deleteClientes'





router.use('/clientes', PostClientes)
router.use('/clientes', GetClientes)
router.use('/clientes', PutClientes)
router.use('/clientes', DeleteClientes)









export default router