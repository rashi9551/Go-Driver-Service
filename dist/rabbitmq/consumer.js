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
const messageHandler_1 = __importDefault(require("./messageHandler"));
class Consumer {
    constructor(channel, rpcQueue) {
        this.channel = channel;
        this.rpcQueue = rpcQueue;
    }
    consumeMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Ready to consume-order messages...");
            this.channel.consume(this.rpcQueue, (message) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                if (message) {
                    if (message.properties) {
                        const { correlationId, replyTo } = message.properties;
                        const operation = (_a = message.properties.headers) === null || _a === void 0 ? void 0 : _a.function;
                        if (!correlationId || !replyTo) {
                            console.log("Missing some properties...");
                        }
                        if (message.content) {
                            yield messageHandler_1.default.handle(operation, JSON.parse(message.content.toString()), correlationId, replyTo);
                        }
                        else {
                            console.log("Received message content is null or undefined.");
                        }
                    }
                    else {
                        console.log("Received message is null.");
                    }
                }
                else {
                    console.log("missing message properties ");
                }
            }), { noAck: true });
        });
    }
}
exports.default = Consumer;
