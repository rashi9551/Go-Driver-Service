"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
exports.default = {
    rabbitMQ: {
        url: String(process.env.RabbitMqUrl),
    },
    queues: {
        driverQueue: "driver_queue",
    }
};
