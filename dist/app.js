"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = __importDefault(require("./config/mongo"));
const client_1 = __importDefault(require("./rabbitMq/client"));
const express_1 = __importDefault(require("express"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        client_1.default.initialize();
        (0, mongo_1.default)();
    }
}
exports.default = App;
