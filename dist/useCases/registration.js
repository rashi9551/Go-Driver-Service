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
const referralCode_1 = require("../utilities/referralCode");
const bcrypt_1 = __importDefault(require("../services/bcrypt"));
const driverRepo_1 = __importDefault(require("../repositories/driverRepo"));
const awsS3_1 = __importDefault(require("../services/awsS3"));
exports.default = {
    register: (DriverData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, mobile, password, reffered_code } = DriverData;
            const referral_code = (0, referralCode_1.refferalCode)();
            const hashedPassword = yield bcrypt_1.default.securePassword(password);
            const newDriver = {
                name,
                email,
                mobile,
                password: hashedPassword,
                referral_code
            };
            const response = yield driverRepo_1.default.saveDriver(newDriver);
            if (typeof response !== "string" && response.email) {
                // const token = await auth.createToken(response._id.toString());
                return { message: "Success", driverId: response._id };
            }
        }
        catch (error) {
        }
    }),
    checkDriver: (mobile) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield driverRepo_1.default.findDriver(mobile);
            if (response) {
                // Get the first driver from the array
                if (response.identification) {
                    return { message: "Driver login" };
                }
                else {
                    return { message: "Driver must fill documents", driverId: response._id };
                }
            }
            return "Driver not registered";
        }
        catch (error) {
            return { message: error.message };
        }
    }),
    identification_update: (driverData) => __awaiter(void 0, void 0, void 0, function* () {
        const { driverId, aadharID, licenseID, aadharFile, licenseFile } = driverData;
        try {
            const aadharImageUrl = yield (0, awsS3_1.default)(aadharFile);
            const licenseImageUrl = yield (0, awsS3_1.default)(licenseFile);
            const newDriverData = {
                driverId: driverId,
                aadharID,
                licenseID,
                aadharImageUrl,
                licenseImageUrl
            };
            const response = yield driverRepo_1.default.updateIdentification(newDriverData);
            if (response === null || response === void 0 ? void 0 : response.email) {
                return ({ message: "Success" });
            }
            else {
                return ({ message: "Couldn't update now. Try again later!" });
            }
        }
        catch (error) {
            return { message: error.message };
        }
    }),
    driverImage_update: (driverData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { driverId, file } = driverData;
            const imageUrl = yield (0, awsS3_1.default)(file);
            const newDriverData = {
                driverId,
                imageUrl
            };
            const response = yield driverRepo_1.default.updateDriverImage(newDriverData);
            if (response === null || response === void 0 ? void 0 : response.email) {
                return ({ message: "Success" });
            }
            else {
                return ({ message: "User not found" });
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    vehicleUpdate: (vehicleData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield driverRepo_1.default.vehicleUpdate(vehicleData);
            if (response) {
                return ({ message: "Success" });
            }
            else {
                return ({ message: "Something Error" });
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    location_update: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield driverRepo_1.default.locationUpdate(data);
            if (response === null || response === void 0 ? void 0 : response.email) {
                return ({ message: "Success" });
            }
            else {
                return ({ message: "User not found" });
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    })
};
