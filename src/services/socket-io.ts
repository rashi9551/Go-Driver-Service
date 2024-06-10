import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import driver, { RideDetails } from "../entities/driver";
import {generatePIN} from '../utilities/generatePIN'
import rideRabbitMqClient from './rabbitmq/client'
import driverRepository from "../repositories/driverRepo";

const driverRepo=new driverRepository()




const calculateDistance=(driverLatitude:number,driverLongitude:number,userLatitude:number,userLongitude:number)=>{
    const deg2rad = (deg: any) => deg * (Math.PI / 180);
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
}


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

    socket.on("getNearByDrivers", async(rideData: RideDetails) => {
      console.log("nearby drivers edukkunu");
      
      rideDetails = rideData;
      console.log(rideDetails,"ride details");
      
      io.emit("getNearByDrivers");
    });

    socket.on("driverLocation", async(latitude: number, longitude: number, driver_id: string) => {
        try {
          console.log("driver location kitty");

            driverLatitude=latitude
            driverLongitude=longitude
            const distance=calculateDistance(driverLatitude,driverLongitude,rideDetails.pickupCoordinates.latitude,rideDetails.pickupCoordinates.longitude)

            if(distance<=5){
                const driverIds=await driver.find({"vehicle_details.model": rideDetails.vehicleModel , account_status:{$in:["Good","Warning"]},isAvailable:true})
                .select("_id")
                .exec();

                const ArrayOfIds=driverIds.map((driver)=>driver._id)
                console.log(ArrayOfIds);
                
                io.emit("newRideRequest",rideDetails,ArrayOfIds)
            }else{
                console.log("grater tha 5 km");
            }
            
        } catch (error) {
            console.error("Error handling driver location:", error);
        }
    }
    );

    socket.on("acceptRide",async(acceptedRideData:RideDetails)=>{
      acceptedRideData.status="Pending";
      acceptedRideData.pin=generatePIN()
      
      acceptedRideData.driverCoordinates = {};
      acceptedRideData.driverCoordinates.latitude = driverLatitude;
      acceptedRideData.driverCoordinates.longitude = driverLongitude;
      
      console.log(acceptedRideData,"data sended");
      const response = await rideRabbitMqClient.produce(acceptedRideData,"ride-create")
      // await driverRepo.updateStatus(acceptedRideData.driver_id)
      console.log(response,"ithu ride response");
      io.emit("driverConfirmation",acceptedRideData.ride_id)
    })

    socket.on('forUser',async(ride_id:any)=>{
      io.emit("userConfirmation",ride_id)
    })

    socket.on("rideCancelled", async (ride_id)=>{
      try {
        console.log("ride called triggered");  
        const response = await rideRabbitMqClient.produce(ride_id,"update-ride-status")
        console.log(response,"ride data updated");
        
        // await driverRepo.updateStatus(response.driver_id)
          // await user.findByIdAndUpdate(rideData?.user_id,{
          //     $inc: {
          //         "RideDetails.cancelledRides": 1,
          //     },
          // })

          io.emit("rideCancelled")
      } catch (error) {
          console.log((error as Error).message);
      }
    })
  });
};
