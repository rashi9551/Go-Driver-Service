"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePIN = void 0;
const generatePIN = () => {
    let pin = "";
    for (let i = 0; i < 6; i++) {
        pin += Math.floor(Math.random() * 10);
    }
    return parseInt(pin);
};
exports.generatePIN = generatePIN;
