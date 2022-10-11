import {Router} from 'express';
import {verifyToken, isObrero, isAdmin, isVendedor, isGerente} from '../middlewares/Auth/index'

const router = Router();

//user
import SignUp from './user/SignUp'
import SignIn from './user/SignIn'
import RefreshToken from './user/RefreshToken'
import GetUser from './user/getUsers'
import PutUserDatos from './user/PutUserDatos'
import PutRoleUser from './user/PutRoleUser'
import GetUserById from './user/getUserById'
import DeleteUserById from './user/deleteUserById'





router.use('/user', SignUp)
router.use('/user', SignIn)
router.use('/user', RefreshToken)
router.use('/user', verifyToken, GetUserById)
router.use('/user', verifyToken, isGerente, GetUser)
router.use('/user', verifyToken, isGerente, PutUserDatos)
router.use('/user', verifyToken, isGerente, PutRoleUser)
router.use('/user', verifyToken, isGerente, DeleteUserById)



//insumo
import PostInsumo from './insumo/postInsumo'
import GetInsumo from './insumo/getInsumo'
import DeleteInsumo from './insumo/deleteInsumo'
import PutInsumo from './insumo/putInsumo'

router.use('/insumo', verifyToken, isAdmin, isGerente, PostInsumo)
router.use('/insumos', verifyToken, isAdmin, isGerente, GetInsumo)
router.use('/insumo', verifyToken, isAdmin, isGerente, DeleteInsumo)
router.use('/insumo', verifyToken, isAdmin, isGerente, PutInsumo)

//clientes
import PostClientes from './clientes/postClientes'
import GetClientes from './clientes/getClientes'
import PutClientes from './clientes/putClientes'
import DeleteClientes from './clientes/deleteClientes'

router.use('/clientes', PostClientes)
router.use('/clientes', verifyToken, isAdmin, isGerente, GetClientes)
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

router.use('/carteles',  PostCarteles)
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

//presupuesto
import PostPresupuesto from './presupuestos/postPresupuestos'
import PutPresupuesto from './presupuestos/putPresupuestos'
import GetPresupuesto from './presupuestos/getPresupuestos'
import DeletePresupuesto from './presupuestos/deletePresupuestos'

router.use('/presupuestos', PostPresupuesto);
router.use('/presupuestos', PutPresupuesto)
router.use('/presupuestos', GetPresupuesto)
router.use('/presupuestos', DeletePresupuesto)











export default router