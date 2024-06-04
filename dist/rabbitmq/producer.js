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
Object.defineProperty(exports, "__esModule", { value: true });
class Producer {
    constructor(channel) {
        this.channel = channel;
    }
    produceMessages(data, correlationId, replyToQueue) {
        return __awaiter(this, void 0, void 0, function* () {
            this.channel.sendToQueue(replyToQueue, Buffer.from(JSON.stringify(data)), {
                correlationId: correlationId
            });
        });
    }
}
exports.default = Producer;
