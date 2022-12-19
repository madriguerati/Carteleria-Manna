import {Router} from 'express';
import {verifyToken, isGerente, isGerenteVendedor, isGerenteObrero} from '../middlewares/Auth/index'

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
import GetUsersAll from './user/GetUsersAll'
import putChangeState from './user/ChangeStateUser'






router.use('/user', SignUp)
router.use('/user', SignIn)
router.use('/user', RefreshToken)
router.use('/user', verifyToken, GetUserById)
router.use('/user', verifyToken, isGerente, GetUser)
router.use('/users',  PutUserDatos)
router.use('/user', verifyToken, isGerente, PutRoleUser)
router.use('/user', verifyToken, isGerente, DeleteUserById)
router.use('/users', GetUsersAll)
router.use('/users', putChangeState)





//insumo
import PostInsumo from './insumo/postInsumo'
import GetInsumo from './insumo/getInsumo'
import DeleteInsumo from './insumo/deleteInsumo'
import PutInsumo from './insumo/putInsumo'
import GetInsumosAll from './insumo/getInsumosAllPages'


router.use('/insumo', verifyToken,  isGerente, PostInsumo)
router.use('/insumos', verifyToken,  isGerente, GetInsumo)
router.use('/insumo', verifyToken,  isGerente, DeleteInsumo)
router.use('/insumo', verifyToken,  isGerente, PutInsumo)
router.use('/insumo', verifyToken, isGerente, GetInsumosAll)


//clientes
import PostClientes from './clientes/postClientes'
import GetClientes from './clientes/getClientes'
import PutClientes from './clientes/putClientes'
import DeleteClientes from './clientes/deleteClientes'
import GetClientesAll from './clientes/getClientesAllPages'


router.use('/clientes',verifyToken,  PostClientes)
router.use('/clientes',verifyToken,   GetClientes)
router.use('/clientes', verifyToken, PutClientes)
router.use('/clientes',verifyToken,  DeleteClientes)
router.use('/clientes',verifyToken,isGerenteVendedor,   GetClientesAll)


//proveedores
import PostProveedores from './proveedores/postProveedores'
import GetProveedores from './proveedores/getProveedores'
import PutProveedores from './proveedores/putProveedores'
import DeleteProveedores from './proveedores/deleteProveedores'
import GetProveedoresAll from './proveedores/getProveedoresAllPages'


router.use('/proveedores', PostProveedores)
router.use('/proveedores',verifyToken,  GetProveedores)
router.use('/proveedores',PutProveedores)
router.use('/proveedores',verifyToken,  DeleteProveedores)
router.use('/proveedores',verifyToken,  GetProveedoresAll)


//Carteles
import PostCarteles from './carteles/postCarteles'
import GetCarteles from './carteles/getCarteles'
import PutCarteles from './carteles/putCarteles'
import DeleteCarteles from './carteles/deleteCarteles'
import GetCartelesAll from './carteles/getCartelesAllPages'


router.use('/carteles',verifyToken,   PostCarteles)
router.use('/carteles', GetCarteles)
router.use('/carteles',verifyToken,  PutCarteles)
router.use('/carteles',verifyToken,  DeleteCarteles)
router.use('/carteles',verifyToken,  GetCartelesAll)


//ordenes
import PostOrdenes from './ordenes/postOrdenes'
import GetOrdenes from './ordenes/getOrdenes'
import PutOrdenes from './ordenes/putOrdenes'
import DeleteOrdenes from './ordenes/deleteOrdenes'
import GetOrdenesAll from './ordenes/getOrdenesAllPages'
import GetOrdenesDate from './ordenes/getOrdenesDate'
import GetOrdenesAllByName from './ordenes/getOrdenesAllByName'



router.use('/ordenes',  PostOrdenes)
router.use('/ordeness',verifyToken,  isGerenteVendedor, GetOrdenes)
router.use('/orden',  PutOrdenes)
router.use('/ordene',verifyToken,  isGerente, DeleteOrdenes)
router.use('/ordeness',verifyToken,  isGerenteVendedor, GetOrdenesAll)
router.use('/ordeness', GetOrdenesAllByName)

router.use('/ordenes',verifyToken,  isGerenteVendedor, GetOrdenesDate)



//presupuesto
import PostPresupuesto from './presupuestos/postPresupuestos'
import PutPresupuesto from './presupuestos/putPresupuestos'
import GetPresupuesto from './presupuestos/getPresupuestos'
import DeletePresupuesto from './presupuestos/deletePresupuestos'
import GetPresupuestosAll from './presupuestos/getPresupuestosAllPages'


router.use('/presupuesto',PostPresupuesto);
router.use('/presupuesto', PutPresupuesto)
router.use('/presupuesto',verifyToken,  isGerenteVendedor, GetPresupuesto)
router.use('/presupuesto',verifyToken,  isGerente, DeletePresupuesto)
router.use('/presupuestoss',verifyToken,  isGerenteVendedor,GetPresupuestosAll)












export default router