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

//proveedores
import PostProveedores from './proveedores/postProveedores'
import GetProveedores from './proveedores/getProveedores'
import PutProveedores from './proveedores/putProveedores'
import DeleteProveedores from './proveedores/deleteProveedores'





router.use('/proveedores', PostProveedores)
router.use('/proveedores', GetProveedores)
router.use('/proveedores', PutProveedores)
router.use('/proveedores', DeleteProveedores)









export default router