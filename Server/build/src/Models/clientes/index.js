"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const clientesSchema = new mongoose_1.Schema({
    //nombre contacto
    name: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    },
    cuit: {
        type: Number,
        required: true
    },
    direccion: {
        type: String,
        request: true
    },
    email: {
        type: String,
        required: true
    },
    condicioniva: {
        type: [String],
        required: true
    },
    razonsocial: {
        type: String,
        required: true
    }
});
exports.default = (0, mongoose_1.model)("clientes", clientesSchema);
