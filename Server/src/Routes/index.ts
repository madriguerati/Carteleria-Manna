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

//Carteles
import PostCarteles from './carteles/postCarteles'
import GetCarteles from './carteles/getCarteles'
import PutCarteles from './carteles/putCarteles'
import DeleteCarteles from './carteles/deleteCarteles'

router.use('/carteles', PostCarteles)
router.use('/carteles', GetCarteles)
router.use('/carteles', PutCarteles)
router.use('/carteles', DeleteCarteles)

//ordenes
import PostOrdenes from './ordenes/postOrdenes'
import GetOrdenes from './ordenes/getOrdenes'
import PutOrdenes from './ordenes/putOrdenes'
import DeleteOrdenes from './ordenes/deleteOrdenes'

router.use('/ordenes', PostOrdenes)
router.use('/ordenes', GetOrdenes)
router.use('/ordenes', PutOrdenes)
router.use('/ordenes', DeleteOrdenes)

//presupuestos
import PostPresupuestos from './presupuestos/postPresupuestos'
import GetPresupuestos from './presupuestos/getPresupuestos'
import PutPresupuestos from './presupuestos/putPresupuestos'
import DeletePresupuestos from './presupuestos/deletePresupuestos'

router.use('/presupuestos', PostPresupuestos)
router.use('/presupuestos', GetPresupuestos)
router.use('/presupuestos', PutPresupuestos)
router.use('/presupuestos', DeletePresupuestos)







export default router