"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const cartelesSchema = new mongoose_1.Schema({
    insumos: {
        type: [String],
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    costo1faz: {
        type: Number,
        request: true
    },
    costo2faz: {
        type: Number,
        request: true
    }
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = (0, mongoose_1.model)("carteles", cartelesSchema);
