"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const uuid_1 = require("uuid");
const express_session_1 = __importDefault(require("express-session"));
const http_1 = __importDefault(require("http"));
const mongo_1 = __importDefault(require("./config/mongo"));
const driverRoute_1 = __importDefault(require("./interfaces/routes/driverRoute"));
const adminRoute_1 = __importDefault(require("./interfaces/routes/adminRoute"));
const socket_io_1 = require("./services/socket-io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
app.use((0, cors_1.default)());
app.use((0, express_session_1.default)({
    secret: (0, uuid_1.v4)(),
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    },
}));
(0, mongo_1.default)();
(0, socket_io_1.setUpSocketIO)(server);
app.use('/driver', driverRoute_1.default);
app.use('/admin', adminRoute_1.default);
app.get('/', (req, res) => {
    res.send().status(200);
});
const port = process.env.PORT || 3002;
server.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
