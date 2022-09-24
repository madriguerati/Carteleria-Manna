"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const cartelesSchema = new mongoose_1.Schema({
    faz: {
        type: [String],
        required: true
    },
    carteles: {
        type: [String],
        required: true
    },
    base: {
        type: Number,
        required: true
    },
    altura: {
        type: Number,
        required: true
    },
    medidas: {
        type: Number,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
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
exports.default = (0, mongoose_1.model)("carteles", cartelesSchema);
