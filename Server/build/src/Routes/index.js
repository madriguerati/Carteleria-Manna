"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
//user
const SignUp_1 = __importDefault(require("./user/SignUp"));
const SignIn_1 = __importDefault(require("./user/SignIn"));
router.use('/user', SignUp_1.default);
router.use('/user', SignIn_1.default);
//insumo
const postInsumo_1 = __importDefault(require("./insumo/postInsumo"));
const getInsumo_1 = __importDefault(require("./insumo/getInsumo"));
const deleteInsumo_1 = __importDefault(require("./insumo/deleteInsumo"));
const putInsumo_1 = __importDefault(require("./insumo/putInsumo"));
router.use('/insumo', postInsumo_1.default);
router.use('/insumo', getInsumo_1.default);
router.use('/insumo', deleteInsumo_1.default);
router.use('/insumo', putInsumo_1.default);
//clientes
const postClientes_1 = __importDefault(require("./clientes/postClientes"));
const getClientes_1 = __importDefault(require("./clientes/getClientes"));
const putClientes_1 = __importDefault(require("./clientes/putClientes"));
const deleteClientes_1 = __importDefault(require("./clientes/deleteClientes"));
router.use('/clientes', postClientes_1.default);
router.use('/clientes', getClientes_1.default);
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
exports.default = router;
