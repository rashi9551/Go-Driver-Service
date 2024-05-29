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
const driver_1 = __importDefault(require("../entities/driver"));
exports.default = {
    saveDriver: (DriverData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newDriver = new driver_1.default({
                name: DriverData.name,
                email: DriverData.email,
                mobile: DriverData.mobile,
                password: DriverData.password,
                referral_code: DriverData.referral_code
            });
            const saveDriver = yield newDriver.save();
            return saveDriver;
        }
        catch (error) {
            return error.message;
        }
    }),
    findDriver: (mobile) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const driverData = yield driver_1.default.findOne({ mobile: mobile });
            return driverData;
        }
        catch (error) {
            return error.message;
        }
    }),
    findDriverEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const driverData = yield driver_1.default.findOne({ email: email });
            return driverData;
        }
        catch (error) {
            return error.message;
        }
    }),
    updateIdentification: (driverData) => __awaiter(void 0, void 0, void 0, function* () {
        const { driverId, aadharID, licenseID, aadharImageUrl, licenseImageUrl } = driverData;
        const response = yield driver_1.default.findByIdAndUpdate(driverId, {
            $set: {
                aadhar: {
                    aadharId: aadharID,
                    aadharImage: aadharImageUrl,
                },
                license: {
                    licenseId: licenseID,
                    licenseImage: licenseImageUrl,
                },
            },
        }, {
            new: true
        });
        return response;
    }),
    updateDriverImage: (driverData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { driverId, imageUrl } = driverData;
            const response = yield driver_1.default.findByIdAndUpdate(driverId, {
                $set: {
                    driverImage: imageUrl,
                },
            }, {
                new: true,
            });
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    vehicleUpdate: (vehicleData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { registerationID, model, driverId, rcImageUrl, carImageUrl } = vehicleData;
            const response = yield driver_1.default.findByIdAndUpdate(driverId, {
                $set: {
                    vehicle_details: {
                        registerationID,
                        model,
                        rcImageUrl,
                        carImageUrl
                    }
                }
            }, {
                new: true
            });
            console.log(response);
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    locationUpdate: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { driverId, longitude, latitude } = data;
        const response = yield driver_1.default.findByIdAndUpdate(driverId, {
            $set: {
                location: {
                    latitude,
                    longitude
                },
                identification: true,
                account_status: "Pending"
            }
        }, {
            new: true
        });
        return response;
    })
};
