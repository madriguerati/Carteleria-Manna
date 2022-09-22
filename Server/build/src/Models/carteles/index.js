"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const cartelesSchema = new mongoose_1.Schema({
    faz: {
        type: [String],
        required: true
    },
    cartel: {
        type: [String],
        required: true
    },
    base: {
        type: Number,
        request: true
    },
    altura: {
        type: Number,
        request: true
    },
    medidas: {
        type: Number,
        request: true
    },
    valor: {
        type: Number,
        request: true
    },
    total: {
        type: Number,
        request: true
    },
    estructura: {
        type: String,
        required: true
    },
    archivo: {
        type: String,
        required: true
    },
    otros: {
        type: String,
        required: true
    }
});
exports.default = (0, mongoose_1.model)("insumo", cartelesSchema);
