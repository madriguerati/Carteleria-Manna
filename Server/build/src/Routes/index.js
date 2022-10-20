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
const getUsers_1 = __importDefault(require("./user/getUsers"));
const PutUserDatos_1 = __importDefault(require("./user/PutUserDatos"));
const PutRoleUser_1 = __importDefault(require("./user/PutRoleUser"));
const getUserById_1 = __importDefault(require("./user/getUserById"));
router.use('/user', SignUp_1.default);
router.use('/user', SignIn_1.default);
router.use('/user', index_1.verifyToken, getUserById_1.default);
router.use('/user', index_1.verifyToken, index_1.isGerente, getUsers_1.default);
router.use('/user', index_1.verifyToken, index_1.isGerente, PutUserDatos_1.default);
router.use('/user', index_1.verifyToken, index_1.isGerente, PutRoleUser_1.default);
//insumo
const postInsumo_1 = __importDefault(require("./insumo/postInsumo"));
const getInsumo_1 = __importDefault(require("./insumo/getInsumo"));
const deleteInsumo_1 = __importDefault(require("./insumo/deleteInsumo"));
const putInsumo_1 = __importDefault(require("./insumo/putInsumo"));
router.use('/insumo', index_1.verifyToken, index_1.isAdmin, index_1.isGerente, postInsumo_1.default);
router.use('/insumos', index_1.verifyToken, index_1.isGerente, getInsumo_1.default);
router.use('/insumo', index_1.verifyToken, index_1.isAdmin, index_1.isGerente, deleteInsumo_1.default);
router.use('/insumo', index_1.verifyToken, index_1.isAdmin, index_1.isGerente, putInsumo_1.default);
//clientes
const postClientes_1 = __importDefault(require("./clientes/postClientes"));
const getClientes_1 = __importDefault(require("./clientes/getClientes"));
const putClientes_1 = __importDefault(require("./clientes/putClientes"));
const deleteClientes_1 = __importDefault(require("./clientes/deleteClientes"));
router.use('/clientes', postClientes_1.default);
router.use('/clientes', index_1.verifyToken, index_1.isAdmin, index_1.isGerente, getClientes_1.default);
router.use('/clientes', putClientes_1.default);
router.use('/clientes', deleteClientes_1.default);
//proveedores
const postProveedores_1 = __importDefault(require("./proveedores/postProveedores"));
const getProveedores_1 = __importDefault(require("./proveedores/getProveedores"));
const putProveedores_1 = __importDefault(require("./proveedores/putProveedores"));
const deleteProveedores_1 = __importDefault(require("./proveedores/deleteProveedores"));
router.use('/proveedores', postProveedores_1.default);
router.use('/proveedores', getProveedores_1.default);
router.use('/proveedores', putProveedores_1.default);
router.use('/proveedores', deleteProveedores_1.default);
//Carteles
const postCarteles_1 = __importDefault(require("./carteles/postCarteles"));
const getCarteles_1 = __importDefault(require("./carteles/getCarteles"));
const putCarteles_1 = __importDefault(require("./carteles/putCarteles"));
const deleteCarteles_1 = __importDefault(require("./carteles/deleteCarteles"));
router.use('/carteles', postCarteles_1.default);
router.use('/carteles', getCarteles_1.default);
router.use('/carteles', putCarteles_1.default);
router.use('/carteles', deleteCarteles_1.default);
//ordenes
const postOrdenes_1 = __importDefault(require("./ordenes/postOrdenes"));
const getOrdenes_1 = __importDefault(require("./ordenes/getOrdenes"));
const putOrdenes_1 = __importDefault(require("./ordenes/putOrdenes"));
const deleteOrdenes_1 = __importDefault(require("./ordenes/deleteOrdenes"));
router.use('/ordenes', postOrdenes_1.default);
router.use('/ordenes', getOrdenes_1.default);
router.use('/ordenes', putOrdenes_1.default);
router.use('/ordenes', deleteOrdenes_1.default);
//presupuesto
const postPresupuestos_1 = __importDefault(require("./presupuestos/postPresupuestos"));
const putPresupuestos_1 = __importDefault(require("./presupuestos/putPresupuestos"));
const getPresupuestos_1 = __importDefault(require("./presupuestos/getPresupuestos"));
const deletePresupuestos_1 = __importDefault(require("./presupuestos/deletePresupuestos"));
router.use('/presupuestos', postPresupuestos_1.default);
router.use('/presupuestos', putPresupuestos_1.default);
router.use('/presupuestos', getPresupuestos_1.default);
router.use('/presupuestos', deletePresupuestos_1.default);
exports.default = router;
