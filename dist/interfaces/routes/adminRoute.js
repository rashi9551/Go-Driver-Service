"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = __importDefault(require("../controllers/adminController"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const adminRoute = (0, express_1.Router)();
adminRoute.get('/pendingDrivers', auth_1.default.verifyToken, adminController_1.default.pendingDrivers);
adminRoute.get('/verifiedDrivers', auth_1.default.verifyToken, adminController_1.default.verifiedDrivers);
adminRoute.get('/blockedDrivers', auth_1.default.verifyToken, adminController_1.default.blockedDrivers);
adminRoute.get('/driverData', auth_1.default.verifyToken, adminController_1.default.driverData);
adminRoute.post('/verifiedUser', auth_1.default.verifyToken, adminController_1.default.verifiedUser);
adminRoute.post('/rejectDriver', auth_1.default.verifyToken, adminController_1.default.rejectDriver);
adminRoute.post('/updateDriverStatus', auth_1.default.verifyToken, adminController_1.default.updateDriverStatus);
exports.default = adminRoute;
