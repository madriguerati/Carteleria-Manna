"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
//import passportmiddleware from './middlewares/passport/passport'
require("./config/mongodb/db.js");
const server = (0, express_1.default)();
exports.server = server;
