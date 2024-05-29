import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

export interface RideDetails {
    formattedDate: string;
    _id: number;
    ride_id: string;
    userId: string;
    pickupCoordinates: PickupLocation;
    dropoffCoordinates: DropoffLocation;
    pickupLocation: string;
    dropoffLocation: string;
    distance: string;
    duration: string;
    model: string;
    price: number;
    status: string;
    date: number;
    feedback: string;
    rating: number;
    paymentMode: string;
    ratings: number;
}

interface PickupLocation {
    lat: number;
    lng: number;
}

interface DropoffLocation {
    lat: number;
    lng: number;
}

export const generatePIN = (): number => {
    let pin = "";
    for (let i = 0; i < 6; i++) {
        pin += Math.floor(Math.random() * 10);
    }
    return parseInt(pin);
};

export const setUpSocketIO = (server: HttpServer): void => {
    let driverLatitude: number;
    let driverLongitude: number;
    let rideDetails: RideDetails;
    const io: SocketIOServer = new SocketIOServer(server, {
        cors: {
            origin: process.env.SOCKET_FRONTEND_URL,
            credentials: true,
        },
    });

    io.on("connection", (socket: Socket) => {
        console.log("Client connected:", socket.id);

        socket.on('getNearByDrivers', (rideData: RideDetails) => {
            console.log("Received ride details:", rideData);
            rideDetails=rideData
            io.emit("getNearByDrivers", rideData); 
        });

        socket.on("driverLocation", (latitude: number, longitude: number, driver_id: string) => {
            console.log(`location: ${latitude}, ${longitude}`);
            io.emit("driverLocationUpdate", { latitude, longitude, driver_id });
        });
    });
};
