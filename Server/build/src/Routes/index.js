"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../middlewares/Auth/index");
const router = (0, express_1.Router)();
//user
const SignUp_1 = __importDefault(require("./user/SignUp"));
const SignIn_1 = __importDefault(require("./user/SignIn"));
const RefreshToken_1 = __importDefault(require("./user/RefreshToken"));
const getUsers_1 = __importDefault(require("./user/getUsers"));
const PutUserDatos_1 = __importDefault(require("./user/PutUserDatos"));
const PutRoleUser_1 = __importDefault(require("./user/PutRoleUser"));
const getUserById_1 = __importDefault(require("./user/getUserById"));
const deleteUserById_1 = __importDefault(require("./user/deleteUserById"));
const GetUsersAll_1 = __importDefault(require("./user/GetUsersAll"));
const ChangeStateUser_1 = __importDefault(require("./user/ChangeStateUser"));
router.use('/user', SignUp_1.default);
router.use('/user', SignIn_1.default);
router.use('/user', RefreshToken_1.default);
router.use('/user', index_1.verifyToken, getUserById_1.default);
router.use('/user', index_1.verifyToken, index_1.isGerente, getUsers_1.default);
router.use('/users', PutUserDatos_1.default);
router.use('/user', index_1.verifyToken, index_1.isGerente, PutRoleUser_1.default);
router.use('/user', index_1.verifyToken, index_1.isGerente, deleteUserById_1.default);
router.use('/users', GetUsersAll_1.default);
router.use('/users', ChangeStateUser_1.default);
//insumo
const postInsumo_1 = __importDefault(require("./insumo/postInsumo"));
const getInsumo_1 = __importDefault(require("./insumo/getInsumo"));
const deleteInsumo_1 = __importDefault(require("./insumo/deleteInsumo"));
const putInsumo_1 = __importDefault(require("./insumo/putInsumo"));
const getInsumosAllPages_1 = __importDefault(require("./insumo/getInsumosAllPages"));
router.use('/insumo', index_1.verifyToken, index_1.isGerente, postInsumo_1.default);
router.use('/insumos', index_1.verifyToken, index_1.isGerente, getInsumo_1.default);
router.use('/insumo', index_1.verifyToken, index_1.isGerente, deleteInsumo_1.default);
router.use('/insumo', index_1.verifyToken, index_1.isGerente, putInsumo_1.default);
router.use('/insumo', index_1.verifyToken, index_1.isGerente, getInsumosAllPages_1.default);
//clientes
const postClientes_1 = __importDefault(require("./clientes/postClientes"));
const getClientes_1 = __importDefault(require("./clientes/getClientes"));
const putClientes_1 = __importDefault(require("./clientes/putClientes"));
const deleteClientes_1 = __importDefault(require("./clientes/deleteClientes"));
const getClientesAllPages_1 = __importDefault(require("./clientes/getClientesAllPages"));
router.use('/clientes', index_1.verifyToken, postClientes_1.default);
router.use('/clientes', index_1.verifyToken, getClientes_1.default);
router.use('/clientes', index_1.verifyToken, putClientes_1.default);
router.use('/clientes', index_1.verifyToken, deleteClientes_1.default);
router.use('/clientes', index_1.verifyToken, index_1.isGerenteVendedor, getClientesAllPages_1.default);
//proveedores
const postProveedores_1 = __importDefault(require("./proveedores/postProveedores"));
const getProveedores_1 = __importDefault(require("./proveedores/getProveedores"));
const putProveedores_1 = __importDefault(require("./proveedores/putProveedores"));
const deleteProveedores_1 = __importDefault(require("./proveedores/deleteProveedores"));
const getProveedoresAllPages_1 = __importDefault(require("./proveedores/getProveedoresAllPages"));
router.use('/proveedores', index_1.verifyToken, postProveedores_1.default);
router.use('/proveedores', index_1.verifyToken, getProveedores_1.default);
router.use('/proveedores', index_1.verifyToken, putProveedores_1.default);
router.use('/proveedores', index_1.verifyToken, deleteProveedores_1.default);
router.use('/proveedores', index_1.verifyToken, getProveedoresAllPages_1.default);
//Carteles
const postCarteles_1 = __importDefault(require("./carteles/postCarteles"));
const getCarteles_1 = __importDefault(require("./carteles/getCarteles"));
const putCarteles_1 = __importDefault(require("./carteles/putCarteles"));
const deleteCarteles_1 = __importDefault(require("./carteles/deleteCarteles"));
const getCartelesAllPages_1 = __importDefault(require("./carteles/getCartelesAllPages"));
router.use('/carteles', index_1.verifyToken, postCarteles_1.default);
router.use('/carteles', getCarteles_1.default);
router.use('/carteles', index_1.verifyToken, putCarteles_1.default);
router.use('/carteles', index_1.verifyToken, deleteCarteles_1.default);
router.use('/carteles', index_1.verifyToken, getCartelesAllPages_1.default);
//ordenes
const postOrdenes_1 = __importDefault(require("./ordenes/postOrdenes"));
const getOrdenes_1 = __importDefault(require("./ordenes/getOrdenes"));
const putOrdenes_1 = __importDefault(require("./ordenes/putOrdenes"));
const deleteOrdenes_1 = __importDefault(require("./ordenes/deleteOrdenes"));
const getOrdenesAllPages_1 = __importDefault(require("./ordenes/getOrdenesAllPages"));
const getOrdenesDate_1 = __importDefault(require("./ordenes/getOrdenesDate"));
router.use('/ordenes', postOrdenes_1.default);
router.use('/ordeness', index_1.verifyToken, index_1.isGerenteVendedor, getOrdenes_1.default);
router.use('/orden', putOrdenes_1.default);
router.use('/ordene', index_1.verifyToken, index_1.isGerente, deleteOrdenes_1.default);
router.use('/ordeness', index_1.verifyToken, index_1.isGerenteVendedor, getOrdenesAllPages_1.default);
router.use('/ordenes', index_1.verifyToken, index_1.isGerenteVendedor, getOrdenesDate_1.default);
//presupuesto
const postPresupuestos_1 = __importDefault(require("./presupuestos/postPresupuestos"));
const putPresupuestos_1 = __importDefault(require("./presupuestos/putPresupuestos"));
const getPresupuestos_1 = __importDefault(require("./presupuestos/getPresupuestos"));
const deletePresupuestos_1 = __importDefault(require("./presupuestos/deletePresupuestos"));
const getPresupuestosAllPages_1 = __importDefault(require("./presupuestos/getPresupuestosAllPages"));
router.use('/presupuesto', index_1.verifyToken, index_1.isGerenteVendedor, postPresupuestos_1.default);
router.use('/presupuesto', index_1.verifyToken, index_1.isGerente, putPresupuestos_1.default);
router.use('/presupuesto', index_1.verifyToken, index_1.isGerenteVendedor, getPresupuestos_1.default);
router.use('/presupuesto', index_1.verifyToken, index_1.isGerente, deletePresupuestos_1.default);
router.use('/presupuestoss', index_1.verifyToken, index_1.isGerenteVendedor, getPresupuestosAllPages_1.default);
exports.default = router;
