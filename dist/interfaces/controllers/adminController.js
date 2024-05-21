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
const moment_1 = __importDefault(require("moment"));
const driver_1 = __importDefault(require("../../entities/driver"));
const nodeMailer_1 = require("../../services/nodeMailer");
exports.default = {
    pendingDrivers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("it coming");
            const response = yield driver_1.default.find({ account_status: "Pending" });
            res.json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    verifiedDrivers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield driver_1.default.find({ account_status: { $nin: ["Pending", "Rejected", "Blocked"] } });
            res.json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    blockedDrivers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield driver_1.default.find({ account_status: "Blocked" });
            res.json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    driverData: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.query;
            const response = yield driver_1.default.findById(id);
            if (response) {
                const formattedRideDate = Object.assign({}, response === null || response === void 0 ? void 0 : response.toObject());
                const formattedFeedbacks = formattedRideDate === null || formattedRideDate === void 0 ? void 0 : formattedRideDate.feedbacks.map((feedbacks) => (Object.assign(Object.assign({}, feedbacks), { formattedDate: (0, moment_1.default)(feedbacks.date).format("DD-MM-YYYY") })));
                const newData = Object.assign(Object.assign({}, formattedRideDate), { formattedFeedbacks });
                console.log(newData);
                res.json(newData);
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    verifiedUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.query;
            const response = yield driver_1.default.findByIdAndUpdate(id, {
                $set: {
                    account_status: "Good"
                }
            }, {
                new: true
            });
            if (response === null || response === void 0 ? void 0 : response.email) {
                const subject = "Account Verified Successfully";
                const text = `Hello ${response.name}, 
                Thank you for registering with Go! We're excited to have you on board. Your account has been successfully verified.
                
                Thank you for choosing Go. We look forward to serving you and making your journeys safe and convenient.
                
                Best regards,
                Go India`;
                try {
                    yield (0, nodeMailer_1.sendMail)(response.email, subject, text);
                    res.json({ message: "Success" });
                }
                catch (error) {
                    console.log(error);
                    res.json(error.message);
                }
            }
            else {
                res.json("Somthing error");
            }
        }
        catch (error) {
            console.log(error);
            res.json(error.message);
        }
    }),
    rejectDriver: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.query;
            const reason = req.body.reason;
            const response = yield driver_1.default.findByIdAndUpdate(id, {
                $set: {
                    account_status: "Rejected"
                }
            }, {
                new: true
            });
            if (response === null || response === void 0 ? void 0 : response.email) {
                const subject = "Account Registration  Rejected";
                const text = `Hello ${response.name}, 
                We regret to inform you that your registration with Go has been rejected. We appreciate your interest, 
                but unfortunately, we are unable to accept your application at this time.
                
                Reason : ${reason}

                You have the option to resubmit your registration and provide any missing or updated information.

                If you have any questions or need further information, please feel free to contact our support team.
                
                Sincerely,
                Go India`;
                try {
                    yield (0, nodeMailer_1.sendMail)(response.email, subject, text);
                    res.json({ message: "Success" });
                }
                catch (error) {
                    console.log(error);
                    res.json(error.message);
                }
            }
            else {
                res.json("Somthing error");
            }
        }
        catch (error) {
            console.log(error);
            res.json(error.message);
        }
    }),
    updateDriverStatus: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let newStatus;
            const { id } = req.query;
            const { reason, status } = req.body;
            if (status == "Block")
                newStatus = "Blocked";
            else
                newStatus = status;
            const response = yield driver_1.default.findByIdAndUpdate(id, {
                $set: {
                    account_status: newStatus
                }
            }, {
                new: true
            });
            if (response === null || response === void 0 ? void 0 : response.email) {
                const subject = "Account Status Updated";
                const text = `Hello ${response.name}, 

                We inform you that your Safely account status has been updated.

                Status : ${newStatus}
                Reason : ${reason}

                If you have any questions or need further information, please feel free to contact our support team.
                
                Sincerely,
                Safely India`;
                try {
                    yield (0, nodeMailer_1.sendMail)(response.email, subject, text);
                    res.json({ message: "Success" });
                }
                catch (error) {
                    console.log(error);
                    res.json(error.message);
                }
            }
            else {
                res.json("Somthing error");
            }
        }
        catch (error) {
            res.json(error);
        }
    })
};
