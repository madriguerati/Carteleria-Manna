"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const ordenesSchema = new mongoose_1.Schema({
    fecha: {
        type: Date,
        required: true
    },
    cliente: {
        type: String,
        required: true,
    },
    contacto: //nombre de contacto
    {
        type: String,
        required: true
    },
    carteles: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'carteles',
        required: true
    },
    operacion: {
        type: String,
        required: true
    },
    lugardecolocacion: {
        type: String,
        required: true
    },
    lugartraslado: {
        type: String,
        required: true
    },
    formadepago: {
        type: [String],
        required: true
    },
    fechavalida: {
        type: Date,
        required: true
    },
    montoTotal: {
        type: Number,
        required: true
    },
    plazodeentrega: {
        type: Number,
        required: true
    },
    observaciones: {
        type: String,
        required: true
    }
});
exports.default = (0, mongoose_1.model)("ordenes", ordenesSchema);
