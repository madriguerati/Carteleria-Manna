"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const SignUp_1 = __importDefault(require("./user/SignUp"));
const SignIn_1 = __importDefault(require("./user/SignIn"));
router.use('/user', SignUp_1.default);
router.use('/user', SignIn_1.default);
exports.default = router;