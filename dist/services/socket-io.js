"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpSocketIO = exports.generatePIN = void 0;
const socket_io_1 = require("socket.io");
const generatePIN = () => {
    let pin = "";
    for (let i = 0; i < 6; i++) {
        pin += Math.floor(Math.random() * 10);
    }
    return parseInt(pin);
};
exports.generatePIN = generatePIN;
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
        socket.on('getNearByDrivers', (rideData) => {
            console.log("Received ride details:", rideData);
            rideDetails = rideData;
            io.emit("getNearByDrivers", rideData);
        });
        socket.on("driverLocation", (latitude, longitude, driver_id) => {
            console.log(`location: ${latitude}, ${longitude}`);
            io.emit("driverLocationUpdate", { latitude, longitude, driver_id });
        });
    });
};
exports.setUpSocketIO = setUpSocketIO;
