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
router.use('/clientes', postClientes_1.default);
exports.default = router;
