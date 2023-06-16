"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const animechema = new Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
        require: true
    },
    sipnosis: {
        type: String,
        require: true
    },
    year: {
        type: String,
        require: true
    },
    episodes: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    }
});
const Model = mongoose_1.default.model("Animes", animechema);
exports.default = Model;
//# sourceMappingURL=anime.js.map