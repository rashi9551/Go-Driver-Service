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
exports.setUpSocketIO = void 0;
const socket_io_1 = require("socket.io");
const driver_1 = __importDefault(require("../entities/driver"));
const amqplib_1 = __importDefault(require("amqplib"));
const generatePIN_1 = require("../utilities/generatePIN");
const rabbitMqUrl = 'amqp://localhost:5672';
const exchangeName = "rideDetails";
let connection, channel, userDetails;
function connectToRabbitMq() {
    return __awaiter(this, void 0, void 0, function* () {
        connection = yield amqplib_1.default.connect(rabbitMqUrl);
        channel = yield connection.createChannel();
        yield channel.assertExchange(exchangeName, 'direct', { durable: true });
    });
}
const calculateDistance = (driverLatitude, driverLongitude, userLatitude, userLongitude) => {
    const deg2rad = (deg) => deg * (Math.PI / 180);
    driverLatitude = deg2rad(driverLatitude);
    driverLongitude = deg2rad(driverLongitude);
    userLatitude = deg2rad(userLatitude);
    userLongitude = deg2rad(userLongitude);
    const radius = 6371;
    const dlat = userLatitude - driverLatitude;
    const dlon = userLongitude - driverLongitude;
    const a = Math.sin(dlat / 2) ** 2 + Math.cos(driverLatitude) * Math.cos(driverLongitude) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = radius * c;
    return distance;
};
const setUpSocketIO = (server) => {
    let driverLatitude;
    let driverLongitude;
    let rideDetails;
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: process.env.SOCKET_FRONTEND_URL,
            credentials: true,
        },
    });
    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);
        socket.on("getNearByDrivers", (rideData) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("nearby drivers edukkunu");
            rideDetails = rideData;
            console.log(rideDetails);
            io.emit("getNearByDrivers");
        }));
        socket.on("driverLocation", (latitude, longitude, driver_id) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                console.log("driver location kitty");
                driverLatitude = latitude;
                driverLongitude = longitude;
                const distance = calculateDistance(driverLatitude, driverLongitude, rideDetails.pickupCoordinates.latitude, rideDetails.pickupCoordinates.longitude);
                if (distance <= 5) {
                    const driverIds = yield driver_1.default.find({ "vehicle_details.model": rideDetails.vehicleModel, account_status: { $in: ["Good", "Warning"] }, isAvailable: true })
                        .select("_id")
                        .exec();
                    const ArrayOfIds = driverIds.map((driver) => driver._id);
                    console.log(ArrayOfIds);
                    io.emit("newRideRequest", rideDetails, ArrayOfIds);
                }
                else {
                    console.log("grater tha 5 km");
                }
            }
            catch (error) {
                console.error("Error handling driver location:", error);
            }
        }));
        socket.on("acceptRide", (acceptedRideData) => __awaiter(void 0, void 0, void 0, function* () {
            acceptedRideData.status = "Pending";
            acceptedRideData.pin = (0, generatePIN_1.generatePIN)();
            if (acceptedRideData && acceptedRideData.driverCoordinates) {
                acceptedRideData.driverCoordinates.latitude = driverLatitude;
                acceptedRideData.driverCoordinates.longitude = driverLongitude;
            }
            console.log(acceptedRideData, "data sended");
            const routingKey = "rideData.create";
            yield connectToRabbitMq();
            yield channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify({ acceptedRideData })));
        }));
    });
};
exports.setUpSocketIO = setUpSocketIO;
