"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const registerController_1 = __importDefault(require("../interfaces/controllers/registerController"));
const client_1 = __importDefault(require("./client"));
const controller = registerController_1.default;
class MessageHandler {
    static handle(operation, data, correlationId, replyTo) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = data;
            console.log("The operation is", operation, data);
            switch (operation) {
                case "login-check":
                    console.log(data);
                default:
                    response = "Request-key notfound";
                    break;
            }
            //Produce the response back to the client
            yield client_1.default.produce(response, correlationId, replyTo);
        });
    }
}
exports.default = MessageHandler;
