"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const DriverSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    driverImage: {
        type: String,
    },
    referral_code: {
        type: String,
    },
    joiningDate: {
        type: Date,
        deafult: Date.now(),
    },
    aadhar: {
        aadharId: {
            type: String,
        },
        aadharImage: {
            type: String,
        },
    },
    license: {
        licenseId: {
            type: String,
        },
        licenseImage: {
            type: String,
        },
    },
    location: {
        longitude: {
            type: String,
        },
        latitude: {
            type: String,
        },
    },
    vehicle_details: {
        registerationID: {
            type: String,
        },
        model: {
            type: String,
        },
        rcImageUrl: {
            type: String,
        },
        carImageUrl: {
            type: String,
        },
    },
    account_status: {
        type: String,
    },
    identification: {
        type: Boolean,
    },
    wallet: {
        balance: {
            type: Number,
            default: 0,
        },
        transactions: [
            {
                date: {
                    type: Date,
                },
                details: {
                    type: String,
                },
                amount: {
                    type: Number,
                },
                status: {
                    type: String,
                },
            },
        ],
    },
    RideDetails: {
        completedRides: {
            default: 0,
            type: Number,
        },
        cancelledRides: {
            default: 0,
            type: Number,
        },
        totalEarnings: {
            type: Number,
            default: 0,
        },
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    totalRatings: {
        type: Number,
        default: 0,
    },
    feedbacks: [
        {
            feedback: {
                type: String,
            },
            rating: {
                type: Number,
            },
            date: {
                type: Date
            }
        },
    ],
});
const driverModel = mongoose_1.default.model("Driver", DriverSchema);
exports.default = driverModel;
