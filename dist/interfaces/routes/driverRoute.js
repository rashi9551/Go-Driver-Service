"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registerController_1 = __importDefault(require("../controllers/registerController"));
const loginController_1 = __importDefault(require("../controllers/loginController"));
const multer_1 = __importDefault(require("../../middleware/multer"));
const driverRouter = (0, express_1.Router)();
driverRouter.post("/checkLoginDriver", loginController_1.default.checkLogin);
driverRouter.post("/checkGoogleLoginDriver", loginController_1.default.checkGoogleLoginDriver);
driverRouter.post("/registerDriver", registerController_1.default.register);
driverRouter.post("/checkDriver", registerController_1.default.checkDriver);
driverRouter.post("/location", registerController_1.default.location);
driverRouter.post("/identification", multer_1.default.fields([
    { name: "aadharImage", maxCount: 1 },
    { name: "licenseImage", maxCount: 1 },
]), registerController_1.default.identificationUpdate);
driverRouter.post("/uploadDriverImage", multer_1.default.single("driverImage"), registerController_1.default.updateDriverImage);
driverRouter.post("/vehicleDetails", multer_1.default.fields([
    { name: "carImage", maxCount: 1 },
    { name: "rcImage", maxCount: 1 },
]), registerController_1.default.vehicleUpdate);
exports.default = driverRouter;
